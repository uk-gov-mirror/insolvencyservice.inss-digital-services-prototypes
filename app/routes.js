//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const customerFormsV2Routes = require('./views/customer-forms/v2/routes')

router.use(customerFormsV2Routes)

// Add your routes here



// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v2/upload', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v2/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v2/form-validation-errors', function (req, res) {

  req.session.data['form-validation-errors'] = "yes"
  res.redirect('/ipservice/ip-upload/v2/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v2/upload-success', function (req, res) {
  res.redirect('/ipservice/ip-upload/v2/check-your-answers')
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v3/uploadV3', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v3/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v3/form-validation-errorsV3', function (req, res) { 
  req.session.data['form-validation-errorsV3'] = "yes"
  res.redirect('/ipservice/ip-upload/v3/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v3/upload-successV3', function (req, res) {
  res.redirect('/ipservice/ip-upload/v3/check-your-answers')
})



// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v4/uploadV4', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v4/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v4/form-validation-errorsV4', function (req, res) { 
  req.session.data['form-validation-errorsV4'] = "yes"
  res.redirect('/ipservice/ip-upload/v4/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v4/upload-successV4', function (req, res) {
  res.redirect('/ipservice/ip-upload/v4/check-your-answers')
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v5/uploadV5', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v5/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v5/form-validation-errorsV5', function (req, res) { 
  req.session.data['form-validation-errorsV5'] = "yes"
  res.redirect('/ipservice/ip-upload/v5/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v5/upload-successV5', function (req, res) {
  res.redirect('/ipservice/ip-upload/v5/employer-details')
})





router.post('/ipservice/ip-upload/v4/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v4/incorrect-employer")
    } else {
        response.redirect("/ipservice/ip-upload/v4/form-validation-errors")
    }
})



router.post('/ipservice/ip-upload/v5/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v5/incorrect-employer")
    } else {
        response.redirect("/ipservice/ip-upload/v5/check-your-answers")
    }
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v5b/uploadV5', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v5b/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v5b/form-validation-errorsV5', function (req, res) { 
  req.session.data['form-validation-errorsV5'] = "yes"
  res.redirect('/ipservice/ip-upload/v5b/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v5b/upload-successV5', function (req, res) {
  res.redirect('/ipservice/ip-upload/v5b/check-your-answers')
})


router.post('/ipservice/ip-upload/v5b/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v5b/case-reference-number")
    } else {
        response.redirect("/ipservice/ip-upload/v5b/upload")
    }
})


// Route from upload to form-validation-errors
router.post('/ipservice/ip-upload/v6/uploadV6', function (req, res) {
  // Simulate validation - for demo purposes, always show errors first
  // In a real app, you'd validate the uploaded file here
  res.redirect('/ipservice/ip-upload/v6/form-validation-errors')
})

// Route from form-validation-errors back to upload
router.post('/ipservice/ip-upload/v6/form-validation-errorsV6', function (req, res) { 
  req.session.data['form-validation-errorsV6'] = "yes"
  res.redirect('/ipservice/ip-upload/v6/upload')


})

// Route from upload to check-your-answers (when validation passes)
router.post('/ipservice/ip-upload/v6/upload-successV6', function (req, res) {
  res.redirect('/ipservice/ip-upload/v6/check-your-answers')
})


router.post('/ipservice/ip-upload/v6/employer',  function(request, response) {
  
    var employerName = request.session.data['employerName']
    if (employerName == "No"){
        response.redirect("/ipservice/ip-upload/v6/case-reference-number")
    } else {
        response.redirect("/ipservice/ip-upload/v6/upload")
    }
})











router.post('/customer-forms/v1/uploadDocumentsQuestion', function(request, response) {

    var uploadDocuments = request.session.data['uploadDocuments']
    if (uploadDocuments == "Yes"){
        response.redirect("/customer-forms/v1/upload")
    } else {
        response.redirect("/customer-forms/v1/check-your-answers")
        request.session.data['checkAnswers'] = 'true'
    }
})

router.post('/customer-forms/v1/uploadDocument', function(request, response) {

   
        response.redirect("/customer-forms/v1/check-your-answers")
        request.session.data['checkAnswers'] = 'true'
    
})

router.post('/customer-forms/v1/uploadAnotherDocument', function(request, response) {

    var addAnotherDoc = request.session.data['uploadAnotherDocument']
    if (addAnotherDoc == "yes"){
        response.redirect("/customer-forms/v1/upload")
    } else {
        response.redirect("/customer-forms/v1/check-your-answers")
    }
})

router.post('/customer-forms/v1/checkYourAnswers', function(request, response) {
    response.redirect('/customer-forms/v1/check-your-answers')
    request.session.data['checkAnswers'] = 'true'
})

router.post('/customer-forms/v1/ip-complaint/start-content-route', function(request, response) {

    var complainedBefore = request.session.data['complainedBefore']
    if (complainedBefore == "yes"){
        response.redirect("/customer-forms/v1/ip-complaint/already-reviewed")
    } else {
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    }
})


router.post('/customer-forms/v1/ip-complaint/already-reviewed', function(request, response) {

    var complaintConsidered = request.session.data['complaintConsidered']
    if (complaintConsidered == "yes"){
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    } else {
        response.redirect("/customer-forms/v1/name")
    }
})


router.post('/customer-forms/v1/ip-complaint/authorising-body', function(request, response) {

    var authorisingBody = request.session.data['authorisingBody']
    if (authorisingBody == "None of the above"){
        response.redirect("/customer-forms/v1/not-eligible-for-this-service")
    } else {
        response.redirect("/customer-forms/v1/ip-complaint/is-your-complaint-about-the-individual-or-a-company")
    }
})

router.post('/customer-forms/v1/ip-complaint/individual-or-company', function(request, response) {

    var individualOrCompany = request.session.data['individualOrCompany']
    if (individualOrCompany == "individual"){
        response.redirect("/customer-forms/v1/ip-complaint/what-type-of-individual-insolvency-procedure-was-it-about")
    } else {
        response.redirect("/customer-forms/v1/ip-complaint/what-type-of-insolvency-was-it-about")
    }
})

router.post('/customer-forms/v1/is-complaint/isComplaint', function(request, response) {

    var isComplaint = request.session.data['isComplaint']
    if (isComplaint == "none"){
        response.redirect("/customer-forms/v1/is-complaint/your-complaint-is-not-about-the-insolvency-service")
    } else {
         response.redirect("/customer-forms/v1/name")
    }
})


router.post('/customer-forms/v1/removeUpload', function(request, response) {

    var removeDocuments = request.session.data['removeDocuments']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/upload-list")
    } else {
        response.redirect("/customer-forms/v1/upload")
    }
})



router.post('/customer-forms/v1/company-complaint/activeDissolved', function(request, response) {

    var removeDocuments = request.session.data['activeOrDissolved']
    if (removeDocuments == "Dissolved"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-companies-house")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/about-you")
    }
})



router.post('/customer-forms/v1/company-complaint/companiesHouse', function(request, response) {

    var removeDocuments = request.session.data['companiesHouse']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-plc-ltd")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})

router.post('/customer-forms/v1/company-complaint/plcLtd', function(request, response) {

    var removeDocuments = request.session.data['plcLtd']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-after-3-years")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})


router.post('/customer-forms/v1/company-complaint/afterDissolved3', function(request, response) {

    var removeDocuments = request.session.data['afterDissolved3']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/active-dissolved-after")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})



router.post('/customer-forms/v1/company-complaint/afterDissolved', function(request, response) {

    var removeDocuments = request.session.data['afterDissolved']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/about-you")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/no-service")
    }
})


router.post('/customer-forms/v1/company-complaint/aboutYou', function(request, response) {

    var removeDocuments = request.session.data['aboutYou']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/name")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    }
})

router.post('/customer-forms/v1/company-complaint/financialLoss', function(request, response) {

    var removeDocuments = request.session.data['financialLoss']
    if (removeDocuments == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/financial-loss-amount")
    } else {
        response.redirect("/customer-forms/v1/company-complaint/question")
    }
})


router.post('/customer-forms/v1/company-complaint/addAnotherCompany', function(request, response) {

    var addCompany = request.session.data['anotherCompany']
    if (addCompany == "Yes"){
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    } else {
        response.redirect("/customer-forms/v1/upload-guard")
    }
})






router.post('/customer-forms/v1/general-enquiry/start', function(request, response) {

    request.session.data['contactReason'] = 'General enquiry'
    request.session.data['organisation'] = 'false'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/general-enquiry/start")

})

router.post('/customer-forms/v1/ip-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Complain about an insolvency practitioner'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'true'
    response.redirect("/customer-forms/v1/ip-complaint/start")

})


router.post('/customer-forms/v1/company-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Company complaints form'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'true'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/company-complaint/start")

})


router.post('/customer-forms/v1/is-complaint/start', function(request, response) {

    request.session.data['contactReason'] = 'Complain about the Insolvency Service'
    request.session.data['organisation'] = 'false'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'false'
    response.redirect("/customer-forms/v1/is-complaint/start")

})


router.post('/customer-forms/v1/ies-breach/start', function(request, response) {

    request.session.data['contactReason'] = 'Investigations and enforcement services breach questionnaire'
    request.session.data['organisation'] = 'true'
    request.session.data['address'] = 'false'
    request.session.data['dob'] = 'false'
    request.session.data['phone'] = 'false'
    request.session.data['upload'] = 'true'
    response.redirect("/customer-forms/v1/ies-breach/start")

})

router.post('/customer-forms/v1/contentStart', function(request, response) {

    var reason = request.session.data['contactReason']
     
    request.session.data['checkAnswers'] = 'false'

    if (reason == "General enquiry"){

       request.session.data['organisation'] = 'false'
       request.session.data['address'] = 'true'
       request.session.data['dob'] = 'true'
        request.session.data['phone'] = 'true'
       request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/general-enquiry/start")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
           
            request.session.data['organisation'] = 'true'
            request.session.data['address'] = 'true'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'true'

        response.redirect("/customer-forms/v1/ip-complaint/start")
    }

      else if (reason == "Investigations and Enforcement Services"){

            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
               request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'
        
        response.redirect("/customer-forms/v1/ies-complaint/start")
    }


        else if (reason == "Complain about the Insolvency Service"){
 
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/is-complaint/start")
    }

        else if (reason == "Investigations and Enforcement Services Breach Questionnaire"){
     
            request.session.data['organisation'] = 'false'
            request.session.data['address'] = 'false'
            request.session.data['dob'] = 'false'
            request.session.data['phone'] = 'false'
            request.session.data['upload'] = 'false'

        response.redirect("/customer-forms/v1/ies-breach/start")
    }
})



router.post('/customer-forms/v1/phoneRoute', function(request, response) {

    var reason = request.session.data['contactReason']
    if (reason == "General enquiry"){
        response.redirect("/customer-forms/v1/general-enquiry/question")
    } 
    
    else if (reason == "Complain about an insolvency practitioner"){
        response.redirect("/customer-forms/v1/ip-complaint/who-do-wish-to-complain-about")
    }

      else if (reason == "Company complaints form"){
        response.redirect("/customer-forms/v1/company-complaint/company-name")
    }

        else if (reason == "Complain about the insolvency service"){
        response.redirect("/customer-forms/v1/is-complaint/do-you-have-an-insolvency-reference-number")
    }

        else if (reason == "Investigations and enforcement services breach questionnaire"){
        response.redirect("/customer-forms/v1/ies-breach/question")
    }
})


function applyCaseResultFromQuery(req) {
  req.session.data = req.session.data || {}
  req.session.data['name'] = req.query.name || req.session.data['name'] || ''
  req.session.data['caseResult'] = req.session.data['caseResult'] || {}
  req.session.data['caseResult'].trading = req.query.trading || req.session.data['caseResult'].trading || 'No trading name found'
  req.session.data['caseResult'].postcode = req.query.postcode || req.session.data['caseResult'].postcode || 'B77 2ES'
  req.session.data['caseResult'].dob = req.query.dob || req.session.data['caseResult'].dob || '17/09/1981'
}

function applyCaseSessionData(req, insolvencyType, status, startDate, endDate, registerRemovalDate) {
  req.session.data = req.session.data || {}
  req.session.data['insolvencyType'] = insolvencyType
  req.session.data['startDate'] = startDate
  req.session.data['status'] = status
  req.session.data['endDate'] = endDate
  req.session.data['registerRemovalDate'] = registerRemovalDate
}

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, '/individual-insolvency-register/v2/search-the-individual-insolvency-register-results')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-2', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, '/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-2')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-3', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, '/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-3')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-4', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, '/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-4')
})

router.post('/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-5', function (req, res) {
  req.session.data = req.session.data || {}
  req.session.data['searchTerm'] = req.body.searchTerm || ''
  res.redirect(303, '/individual-insolvency-register/v2/search-the-individual-insolvency-register-results-5')
})

router.get([
  '/individual-insolvency-register/v2/case-details-bankruptcy',
  '/individual-insolvency-register/v2/case-details-bankruptcy.html'
], function (req, res) {
  applyCaseSessionData(req, 'Bankruptcy', 'Current', '12 September 2025', '12 September 2026', '12 December 2026')
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/v2/case-details-bankruptcy')
})


router.get([
  '/individual-insolvency-register/v2/case-details-bankruptcy-restrictions-undertaking',
  '/individual-insolvency-register/v2/case-details-bankruptcy-restrictions-undertaking.html'
], function (req, res) {
  applyCaseSessionData(req, 'Bankruptcy Restrictions Undertaking', 'Current', '21 May 2026', '21 May 2036', '22 May 2036')
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/v2/case-details-bankruptcy-restrictions-undertaking')
})


router.get([
  '/individual-insolvency-register/v2/case-details-debt-relief-restrictions-undertaking',
  '/individual-insolvency-register/v2/case-details-debt-relief-restrictions-undertaking.html'

], function (req, res) {
  applyCaseSessionData(req, 'Debt Relief Restrictions Undertaking', 'Current', '12 June 2022', '12 June 2027', '13 June 2027')
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/v2/case-details-debt-relief-restrictions-undertaking')
})

router.get([
  '/individual-insolvency-register/v2/case-details-debt-relief-order',
  '/individual-insolvency-register/v2/case-details-debt-relief-order.html'
], function (req, res) {
  applyCaseSessionData(req, 'Debt Relief Order', 'Completed', '27 July 2025', '27 July 2026', '27 October 2026')
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/v2/case-details-debt-relief-order')
})


router.get([
  '/individual-insolvency-register/v2/case-details-individual-voluntary-arrangement',
  '/individual-insolvency-register/v2/case-details-individual-voluntary-arrangement.html'
], function (req, res) {
  applyCaseSessionData(req, 'Individual Voluntary Arrangement', 'Current', '12 June 2022', '12 June 2027', '12 June 2022')
  applyCaseResultFromQuery(req)
  res.render('individual-insolvency-register/v2/case-details-individual-voluntary-arrangement')
})



router.post('/individual-insolvency-register/v2/errorIssueGuard', function(request, response) {

    var errorIssue = request.session.data['typeOfErrorOrIssue']
    var insolvencyType = request.session.data['insolvencyType']

  if (errorIssue == "Still on register after the insolvency has ended" && insolvencyType == "Individual Voluntary Arrangement"){
        response.redirect("/individual-insolvency-register/v2/when-was-the-insolvency-completed")
    }

    else if (errorIssue == "Still on register after the insolvency has ended"){
        response.redirect("/individual-insolvency-register/v2/knockout-status-completed")
    }

    else {
        response.redirect("/individual-insolvency-register/v2/name")
    }
})

router.post('/individual-insolvency-register/v2/insolvencyCompleted', function(request, response) {
  var day = request.body['insolvencyCompletedDate-day']
  var month = request.body['insolvencyCompletedDate-month']
  var year = request.body['insolvencyCompletedDate-year']

  if (!day || !month || !year) {
    response.redirect('/individual-insolvency-register/v2/name')
    return
  }

  var completedDate = new Date(Number(year), Number(month) - 1, Number(day))
  var today = new Date()
  today.setHours(0, 0, 0, 0)

  var diffInDays = Math.round((today - completedDate) / 86400000)

  if (completedDate <= today && diffInDays >= 0 && diffInDays <= 28) {
    response.redirect('/individual-insolvency-register/v2/knockout-status-current-under28')
  } else {
    response.redirect('/individual-insolvency-register/v2/provide-evidence-guard')
  }
})

router.post('/individual-insolvency-register/v2/provideEvidenceGuard', function(request, response) {
  var provideEvidence = request.session.data['provideEvidence']

  if (provideEvidence == 'No') {
    response.redirect('/individual-insolvency-register/v2/knockout-status-current-no-evidence')
  } else {
    response.redirect('/individual-insolvency-register/v2/name')
  }
})


router.post('/individual-insolvency-register/v2/uploadGuard', function(request, response) {
  var uploadDocument = request.session.data['uploadDocument']

  if (uploadDocument == 'Yes') {
    response.redirect('/individual-insolvency-register/v2/upload')
  } else {
    response.redirect('/individual-insolvency-register/v2/check-your-answers')
  }
})
        
           