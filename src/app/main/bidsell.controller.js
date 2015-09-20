/**
 * Created by ryanki10 on 12/09/15.
 */

'use strict';

class BidSellCtrl {
  constructor($scope, quotePriceGenerator, $interval, $sce) {
    var midPriceDB = [];
    function midPriceAvgDirection (min, max) {
      var midPrice = Math.round((min*100000 + max*100000)/2);
      var currentAvg;
      var direction;
      midPriceDB.push(midPrice);
      currentAvg = _.sum(midPriceDB)/(midPriceDB.length);
      direction = midPrice > currentAvg ? 1: midPrice < currentAvg ? -1: 0;
      return direction;
    }
    $scope.currencyPairs = ['EUR/USD'];
    $scope.currencyPairSelection = 'EUR/USD';

    $scope.triggerIgnition = function(interval) {
      var stopIgnition = !parseInt(interval);
      $interval.cancel($scope.intervalPromise);
      if (stopIgnition) {
        return;
      }
      $scope.intervalPromise = $interval(function() {
          quotePriceGenerator
            .getPrice()
            .then(function(data) {
              showQuote(data);
            })
        },
        interval * 1000);
    };
    function showQuote(data) {
      var date = new Date();
      const quoteZoom = 100000;
      const quotePipsWindow = -4;
      const quotePipsFinder = 10;

      var quote = data.data;
      var time = [date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
      var paddedTime = _.map(time,
        function(term) {
          var ret = ('00'.concat(term)).substr(-2);
          return ret;
        });

      var qBox = {};
      qBox.direction = midPriceAvgDirection(quote.price_min, quote.price_max);
      qBox['quote-date-time'] = paddedTime.join(':');
      qBox['price-min'] = quote.price_min;
      qBox['price-min-string'] = qBox['price-min'].toFixed(5);
      qBox['price-max'] = quote.price_max;
      qBox['price-max-string'] = qBox['price-max'].toFixed(5);
      qBox['price-range'] = Math.round((qBox['price-max'] - qBox['price-min']) * quoteZoom / quotePipsFinder);
      qBox['ask-price'] = quote.ask_price;
      qBox['sell-price'] = quote.sell_price;
      qBox['ask-start'] = Math.round((quote.ask_price * quoteZoom / quotePipsFinder) - (quote.price_min * quoteZoom / quotePipsFinder));
      qBox['sell-start'] = Math.round((quote.sell_price * quoteZoom / quotePipsFinder) - (quote.price_min * quoteZoom / quotePipsFinder));
      qBox.ask = (qBox['ask-price'] * quoteZoom).toString().substr(quotePipsWindow) / quotePipsFinder;
      qBox['ask-string'] = qBox.ask.toFixed(1);
      qBox.sell = (qBox['sell-price'] * quoteZoom).toString().substr(quotePipsWindow) / quotePipsFinder;
      qBox['sell-string'] = qBox.sell.toFixed(1);
      qBox['current-spread-string'] = (qBox.sell - qBox.ask).toFixed(1);
      qBox['trading-size-string'] = quote.trading_size;
      $scope.qBox = qBox;
    }
    $scope.getAskPrice = function(){
      var tooltip = 'Asking Price: ' +
                    $scope.qBox['ask-price'].toString().substr(0,3) + '<b class="yellow">' +
                    $scope.qBox['ask-price'].toString().substr(3,3) + '</b>' +
                    $scope.qBox['ask-price'].toString().substr(6,1);
      return $sce.trustAsHtml(tooltip);
    };
    $scope.getSellingPrice = function(){
      var tooltip = 'Selling Price: ' +
        $scope.qBox['sell-price'].toString().substr(0,3) + '<b class="yellow">' +
        $scope.qBox['sell-price'].toString().substr(3,3) + '</b>' +
        $scope.qBox['sell-price'].toString().substr(6,1);
      return $sce.trustAsHtml(tooltip);
    };
  }
}

BidSellCtrl.$inject = ['$scope', 'quotePriceGenerator', '$interval', '$sce'];
export default BidSellCtrl;
