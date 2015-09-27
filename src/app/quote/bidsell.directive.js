/**
 * Created by ryanki10 on 27/09/15.
 */


//import BidSellCtrl from 'bidsell.controller.js';
import BidSellCtrl from '../quote/bidsell.controller.js';

class BidSellDirective {
  constructor(){
    this.restrict = 'E';
    this.templateUrl = '../app/quote/bidsell.html';
    this.controller = BidSellCtrl;
  };
  static directiveFactory(){
    BidSellDirective.instance = new BidSellDirective();
    return BidSellDirective.instance;
  }
}

BidSellDirective.directiveFactory.$inject = [];

export default BidSellDirective.directiveFactory;