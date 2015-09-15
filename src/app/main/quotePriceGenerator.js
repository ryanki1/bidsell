/**
 * Created by ryanki10 on 13/09/15.
 */

'use strict';

function quotePriceGenerator($q, $timeout) {
  var lowPrice = 1.45000, highPrice = 1.47000;
  var askPrice, sellPrice;
  var service = {};
  service.getPrice = function() {
    var deferred = $q.defer();
    var doIt = function() {
      var date = new Date();
      const quoteZoom = 100000;
      const quotePipsWindow = -3;
      const quotePipsFinder = 10;
      var time = [date.getHours().toString(), date.getMinutes().toString(), date.getSeconds().toString()];
      var paddedTime = _.map( time,
                              function(term){
                                var ret = ('00'.concat(term)).substr(-2);
                                return ret;
                              });
      var qBox = {};
      qBox['quote-date-time'] = paddedTime.join(':');
      qBox['price-min'] = 1.45325;
      qBox['price-min-string'] = qBox['price-min'].toFixed(5);
      qBox['price-max'] = 1.46381;
      qBox['price-max-string'] = qBox['price-max'].toFixed(5);
      qBox['price-range'] = Math.trunc((qBox['price-max'] - qBox['price-min']) * 10000);
      qBox.up = false;
      qBox['ask-price'] = 1.46133;
      qBox['sell-price'] = 1.46160;
      qBox['ask-start'] = Math.trunc((qBox['ask-price'] - qBox['price-min']) * 10000);
      qBox['sell-start'] = Math.trunc((qBox['sell-price'] - qBox['price-min']) * 10000);
      qBox.ask = (qBox['ask-price'] * 100000).toString().substr(-3)/10;
      qBox['ask-string'] = qBox.ask.toFixed(1);
      qBox.sell = (qBox['sell-price'] * 100000).toString().substr(-3)/10;
      qBox['sell-string'] = qBox.sell.toFixed(1);
      qBox['current-spread'] = 2.7;
      qBox['current-spread-string'] = qBox['current-spread'].toFixed(1);
      qBox['trading-size'] = 100;
      qBox['trading-size-string'] = qBox['trading-size'].toString();
      service.qBox = qBox;
      return deferred.resolve(service);
    };
    $timeout(doIt, 5000);
    return deferred.promise;
  };
  return service;


  function randomizeLowHigh(lowPrice, highPrice){

  }
  function randomizeAskSell(low, high){

  }
}



quotePriceGenerator.$inject = ['$q', '$timeout'];
export default quotePriceGenerator;