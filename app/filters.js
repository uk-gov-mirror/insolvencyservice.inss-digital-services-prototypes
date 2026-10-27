//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// Preserve line breaks in text
addFilter('preserveLineBreaks', function(text) {
  if (!text) return ''
  return text.replace(/\n/g, '<br>')
})

// Format date input fields as "12 September 2026"
addFilter('formatDate', function(day, month, year) {
  const dateParts = [day, month, year].map(value => String(value || '').trim())

  if (dateParts.some(value => !/^\d+$/.test(value))) return 'Not provided'

  const [dayNumber, monthNumber, yearNumber] = dateParts.map(Number)
  const date = new Date(0)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(yearNumber, monthNumber - 1, dayNumber)

  if (
    date.getUTCFullYear() !== yearNumber ||
    date.getUTCMonth() !== monthNumber - 1 ||
    date.getUTCDate() !== dayNumber
  ) return 'Not provided'

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date)
})

