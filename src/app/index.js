'use strict';

import MainCtrl from './main/main.controller';
import NavbarCtrl from '../app/components/navbar/navbar.controller';
import DemoCtrl from '../app/main/demo.controller.js';
import BidSellCtrl from '../app/main/bidsell.controller.js';

angular.module('git', ['ui.router', 'ngMaterial'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .controller('DemoCtrl', DemoCtrl)
  .controller('BidSellCtrl', BidSellCtrl)

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/bidsell.html',
        controller: 'BidSellCtrl'
      })
      .state('demo', {
        url: '/demo',
        templateUrl: 'app/main/demo.html',
        controller: 'DemoCtrl'
      });
    $urlRouterProvider.otherwise('/');
  })
;
