'use strict';

import BidSellCtrl from '../app/quote/bidsell.controller.js';
import quotePriceGenerator from '../app/quote/quotePriceGenerator.js';

angular.module('git', ['ngSanitize', 'ui.router', 'ngMaterial'])
  .controller('BidSellCtrl', BidSellCtrl)
  .factory('quotePriceGenerator', quotePriceGenerator)
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('purple', {
        'default': '100',
        'hue-1': '200',
        'hue-2': '300',
        'hue-3': '500'
      })
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/quote/bidsell.html',
        controller: 'BidSellCtrl'
      });
    $urlRouterProvider.otherwise('/');
  });
