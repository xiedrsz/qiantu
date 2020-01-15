import Vue from 'vue'
import _ from 'lodash'

Vue.filter('mapDict', (value, dictionaries, key = 'code', name = 'name') => {
  let item = _.find(dictionaries, {
    [key]: value
  }) || {}
  return item[name] || value
})
