/**
 * Created by ryanki10 on 12/09/15.
 */

'use strict';

class BidSellCtrl {
  constructor($scope, quotePriceGenerator, $interval) {
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
      const quotePipsWindow = -3;
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
      qBox['price-range'] = Math.trunc((qBox['price-max'] - qBox['price-min']) * 10000);
      qBox.up = false;
      qBox['ask-price'] = quote.ask_price;
      qBox['sell-price'] = quote.sell_price;
      qBox['ask-start'] = Math.trunc(qBox['ask-price'] * 10000 - qBox['price-min'] * 10000);
      qBox['sell-start'] = Math.trunc(qBox['sell-price'] * 10000 - qBox['price-min'] * 10000);
      qBox.ask = (qBox['ask-price'] * 100000).toString().substr(-3) / 10;
      qBox['ask-string'] = qBox.ask.toFixed(1);
      qBox.sell = (qBox['sell-price'] * 100000).toString().substr(-3) / 10;
      qBox['sell-string'] = qBox.sell.toFixed(1);
      qBox['current-spread'] = Math.trunc((quote['sell_price'] - quote['ask_price']) * 100000) / 10;
      qBox['current-spread-string'] = qBox['current-spread'].toFixed(1);
      qBox['trading-size'] = quote.trading_size;
      qBox['trading-size-string'] = qBox['trading-size'].toString();
      $scope.qBox = qBox;
    }
  }
}

BidSellCtrl.$inject = ['$scope', 'quotePriceGenerator', '$interval'];
export default BidSellCtrl;
