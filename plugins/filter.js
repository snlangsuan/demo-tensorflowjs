import numeral from 'numeral'
import Vue from 'vue'

Vue.filter('number_format', (val, decimal = 0, na = 'N/A') => {
  if (typeof val !== 'number') val = Number(val)
  if (Number.isNaN(val)) return na
  const format = decimal === 0 ? '0,0' : '0,0.' + '0'.repeat(decimal)
  return numeral(val).format(format)
})

Vue.filter('percent_format', (val, decimal = 2, na = 'N/A') => {
  if (typeof val !== 'number') val = Number(val)
  if (Number.isNaN(val)) return na
  const format = '0.' + '0'.repeat(decimal) + '%'
  return numeral(val).format(format)
})
