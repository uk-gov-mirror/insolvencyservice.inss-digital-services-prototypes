// Routes for individual-insolvency-register v4

const fs = require('fs')
const path = require('path')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const routeBase = '/individual-insolvency-register/v4'
const resultsPath = routeBase + '/search-the-individual-insolvency-register-results'
const restrictedResultsPath = routeBase + '/dro-bank-restrictions-results'
const resultsView = 'individual-insolvency-register/v4/search-the-individual-insolvency-register-results'
const searchPath = routeBase + '/search'
const restrictedTypes = ['Debt relief restrictions order', 'Bankruptcy restrictions order']
const dataFile = path.join(__dirname, 'data', 'data.json')

function loadRecords() {
	const json = fs.readFileSync(dataFile, 'utf8')

	try {
        
		return JSON.parse(json)
	} catch (error) {
		// The current prototype data file contains the same JSON array twice,
		// joined together. Read its first complete array until the file is fixed.
		const secondArrayStart = json.indexOf('][')
		if (secondArrayStart === -1) {
			throw error
		}

		return JSON.parse(json.slice(0, secondArrayStart + 1))
	}
}

const records = loadRecords()
const allTypes = Array.from(new Set(records.map(function (record) {
	return record.type
}))).sort()

router.get(searchPath, function (request, response) {
	response.render('individual-insolvency-register/v4/search')
})

router.get(searchPath + '.html', function (request, response) {
	response.render('individual-insolvency-register/v4/search')
})

router.post(searchPath, function (request, response) {
	request.session.data.searchTerm = (request.body.searchTerm || '').trim()
	response.redirect(resultsPath)
})

function formatDate(dateString) {
	const parts = dateString.split('-')
	const date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])))

	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	})
}

function recordSearchText(record) {
	return [
		record.fullName,
		record.dateOfBirth,
		record.gender,
		record.type,
		record.ukAddress && record.ukAddress.addressLine1,
		record.ukAddress && record.ukAddress.addressLine2,
		record.ukAddress && record.ukAddress.townOrCity,
		record.ukAddress && record.ukAddress.postcode,
		record.ukPreviousAddress && record.ukPreviousAddress.addressLine1,
		record.ukPreviousAddress && record.ukPreviousAddress.addressLine2,
		record.ukPreviousAddress && record.ukPreviousAddress.townOrCity,
		record.ukPreviousAddress && record.ukPreviousAddress.postcode
	].filter(Boolean).join(' ').toLowerCase()
}

function renderResults(request, response, pageNumber) {
	const resultPath = request.path.indexOf(restrictedResultsPath) === 0 ? restrictedResultsPath : resultsPath
	const restrictedOnly = resultPath === restrictedResultsPath || request.session.data.searchType === 'Debt relief order and bankruptcy restrictions orders'
	const filtersApplied = restrictedOnly
		? request.session.data.restrictionTypeFiltersApplied === true
		: request.session.data.allTypeFiltersApplied === true
	const activeTypeFilters = restrictedOnly
		? request.session.data.restrictionTypeFilters
		: request.session.data.allTypeFilters
	const selectedTypes = filtersApplied && Array.isArray(activeTypeFilters)
		? activeTypeFilters
		: []
	const searchTerm = (request.session.data.searchTerm || '').trim()
	const sortOrder = request.session.data.sortOrder === 'name' ? 'name' : 'startDate'
	const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean)
	const matchingRecords = records
		.map(function (record, index) {
			return { record: record, recordId: index }
		})
		.filter(function (entry) {
			if (restrictedOnly && restrictedTypes.indexOf(entry.record.type) === -1) {
				return false
			}
			if (filtersApplied && selectedTypes.indexOf(entry.record.type) === -1) {
				return false
			}

			const searchableText = recordSearchText(entry.record)
			return searchWords.every(function (word) {
				return searchableText.indexOf(word) !== -1
			})
		})
		.sort(function (a, b) {
			if (sortOrder === 'name') {
				return a.record.fullName.localeCompare(b.record.fullName)
			}

			return (b.record.startDate || '').localeCompare(a.record.startDate || '')
		})

	const pageSize = 10
	const totalResults = matchingRecords.length
	const totalPages = Math.ceil(totalResults / pageSize)
	const firstVisiblePage = Math.max(1, pageNumber - 2)
	const lastVisiblePage = Math.min(totalPages, pageNumber + 2)
	const paginationPages = []
	for (let page = firstVisiblePage; page <= lastVisiblePage; page++) {
		paginationPages.push(page)
	}
	const startIndex = (pageNumber - 1) * pageSize
	const caseResults = matchingRecords.slice(startIndex, startIndex + pageSize).map(function (entry) {
		return {
			recordId: entry.recordId,
			name: entry.record.fullName,
			dob: formatDate(entry.record.dateOfBirth),
			companyName: entry.record.companyName || 'No trading name found',
			postcode: entry.record.ukAddress ? entry.record.ukAddress.postcode : '',
			insolvencyType: entry.record.type,
		    startDate: entry.record.startDate ? formatDate(entry.record.startDate) : ''
		}
	})

	response.render(restrictedOnly ? 'individual-insolvency-register/v4/dro-bank-restrictions-results' : resultsView, {
		searchTerm: searchTerm,
		caseResults: caseResults,
		pageNumber: pageNumber,
		totalResults: totalResults,
		totalPages: totalPages,
		paginationPages: paginationPages,
		showingFrom: totalResults ? startIndex + 1 : 0,
		showingTo: Math.min(startIndex + pageSize, totalResults),
		resultsPath: resultPath,
		typeOptions: restrictedOnly ? restrictedTypes : allTypes,
		selectedTypes: selectedTypes,
		sortOrder: sortOrder
	})
}

function submitSearch(request, response) {
	request.session.data.searchTerm = (request.body.searchTerm || '').trim()
	const targetPath = request.path.indexOf(restrictedResultsPath) === 0 ? restrictedResultsPath : resultsPath
	response.redirect(targetPath)
}

function applyTypeFilters(request, response) {
	request.session.data.searchTerm = (request.body.searchTerm || '').trim()
	request.session.data.sortOrder = request.body.sortOrder === 'name' ? 'name' : 'startDate'
	let selectedTypes = request.body.typeFilter || []
	if (!Array.isArray(selectedTypes)) {
		selectedTypes = [selectedTypes]
	}
	request.session.data.restrictionTypeFilters = selectedTypes.filter(function (type) {
		return restrictedTypes.indexOf(type) !== -1
	})
	request.session.data.restrictionTypeFiltersApplied = request.session.data.restrictionTypeFilters.length > 0
	response.redirect(restrictedResultsPath)
}

function applyAllTypeFilters(request, response) {
	request.session.data.searchTerm = (request.body.searchTerm || '').trim()
	request.session.data.sortOrder = request.body.sortOrder === 'name' ? 'name' : 'startDate'
	let selectedTypes = request.body.typeFilter || []
	if (!Array.isArray(selectedTypes)) {
		selectedTypes = [selectedTypes]
	}
	request.session.data.allTypeFilters = selectedTypes.filter(function (type) {
		return allTypes.indexOf(type) !== -1
	})
	request.session.data.allTypeFiltersApplied = request.session.data.allTypeFilters.length > 0
	response.redirect(resultsPath)
}

function clearTypeFilters(request, response) {
	const restrictedOnly = request.path.indexOf(restrictedResultsPath) === 0
	request.session.data.searchTerm = ''
	if (restrictedOnly) {
		delete request.session.data.restrictionTypeFilters
		delete request.session.data.restrictionTypeFiltersApplied
		return response.redirect(restrictedResultsPath)
	}

	delete request.session.data.allTypeFilters
	delete request.session.data.allTypeFiltersApplied
	response.redirect(resultsPath)
}

function applySort(request, response) {
	const sortOrder = request.body.sortOrder
	request.session.data.sortOrder = sortOrder === 'name' ? 'name' : 'startDate'
	const targetPath = request.path.indexOf(restrictedResultsPath) === 0 ? restrictedResultsPath : resultsPath
	response.redirect(targetPath)
}

router.get(resultsPath, function (request, response) {
	renderResults(request, response, 1)
})
router.get(resultsPath + '.html', function (request, response) {
	renderResults(request, response, 1)
})
router.get(resultsPath + '-:pageNumber', function (request, response) {
	renderResults(request, response, Math.max(1, Number.parseInt(request.params.pageNumber, 10) || 1))
})
router.get(resultsPath + '-:pageNumber.html', function (request, response) {
	renderResults(request, response, Math.max(1, Number.parseInt(request.params.pageNumber, 10) || 1))
})
router.post(resultsPath, submitSearch)
router.post(resultsPath + '/filter', applyAllTypeFilters)
router.post(resultsPath + '/sort', applySort)
router.get(resultsPath + '/clear-filters', clearTypeFilters)

router.post(routeBase + '/searchTypeGuard', function (request, response) {
	request.session.data.searchType = request.body.searchType || ''
	request.session.data.searchTerm = ''
	delete request.session.data.restrictionTypeFilters
	delete request.session.data.restrictionTypeFiltersApplied
	delete request.session.data.allTypeFilters
	delete request.session.data.allTypeFiltersApplied
	if (request.session.data.searchType === 'Debt relief order and bankruptcy restrictions orders') {
		request.session.data.restrictionTypeFilters = restrictedTypes.slice()
		request.session.data.restrictionTypeFiltersApplied = true
		return response.redirect(restrictedResultsPath)
	}
	if (request.session.data.searchType === 'Director disqualification') {
		request.session.data.allTypeFilters = ['Director disqualification']
		request.session.data.allTypeFiltersApplied = true
	}
	response.redirect(resultsPath)
})

router.get(restrictedResultsPath, function (request, response) {
	renderResults(request, response, 1)
})
router.get(restrictedResultsPath + '.html', function (request, response) {
	renderResults(request, response, 1)
})
router.get(restrictedResultsPath + '-:pageNumber', function (request, response) {
	renderResults(request, response, Math.max(1, Number.parseInt(request.params.pageNumber, 10) || 1))
})
router.get(restrictedResultsPath + '-:pageNumber.html', function (request, response) {
	renderResults(request, response, Math.max(1, Number.parseInt(request.params.pageNumber, 10) || 1))
})
router.post(restrictedResultsPath, submitSearch)
router.post(restrictedResultsPath + '/filter', applyTypeFilters)
router.post(restrictedResultsPath + '/sort', applySort)
router.get(restrictedResultsPath + '/clear-filters', clearTypeFilters)

router.get(routeBase + '/data-case-details', function (request, response) {
	const recordIndex = Number.parseInt(request.query.recordId, 10)
	const record = Number.isInteger(recordIndex) && recordIndex >= 0 ? records[recordIndex] : null

	if (!record) {
		return response.redirect(resultsPath)
	}

	response.render('individual-insolvency-register/v4/data-case-details', {
		caseResult: Object.assign({}, record, {
			formattedDateOfBirth: formatDate(record.dateOfBirth)
		})
	})
})





module.exports = router
