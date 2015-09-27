'use strict';

import quotePriceGenerator from '../app/quote/quotePriceGenerator.js';
import bidSellDirective from '../app/quote/bidsell.directive.js';

angular.module('quote', ['ngSanitize', 'ui.router', 'ngMaterial'])
  .factory('quotePriceGenerator', quotePriceGenerator)
  .directive('bidSellQuote', bidSellDirective)
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
        templateUrl: 'app/showQuote.html'
      });
    $urlRouterProvider.otherwise('/');
  });
