/**
 * Created by ryanki10 on 13/09/15.
 */

'use strict';

function quotePriceGenerator($http) {
  var service = {};
  service.getPrice = function() {
    return $http({
      url: '/quote',
      method: 'GET'
    });
  };
  return service;
}

quotePriceGenerator.$inject = ['$http'];
export default quotePriceGenerator;