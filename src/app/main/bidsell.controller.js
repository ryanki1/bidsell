/**
 * Created by ryanki10 on 12/09/15.
 */

'use strict';

class BidSellCtrl {
  constructor ($scope, quotePriceGenerator) {

    // Attributes
    $scope.currencyPairs = ['EUR/USD'];
    $scope.currencyPairSelection = 'EUR/USD';

    // Methods
    $scope.getPrice = function() {
      quotePriceGenerator.getPrice()
        .then(function(quotePrice){
          $scope.qBox = quotePrice.qBox;
        });
    }
  }
}

BidSellCtrl.$inject = ['$scope', 'quotePriceGenerator'];
export default BidSellCtrl;
