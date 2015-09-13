/**
 * Created by ryanki10 on 12/09/15.
 */

class BidSellCtrl {
  constructor ($scope) {
    $scope.currencyPairs = ['EUR/USD'];
    $scope.currencyPairSelection = 'EUR/USD';
    $scope.qBox = {};
    $scope.qBox.ask = "13.3";
    $scope.qBox.sell = "16.0";
    $scope.qBox["trading-size"] = 100;
  }
}

BidSellCtrl.$inject = ['$scope'];
export default BidSellCtrl;
