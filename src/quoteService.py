from __future__ import division
import tornado.ioloop
import pyrestful.rest
import random

from pyrestful import mediatypes
from pyrestful.rest import get

class Quote(object):
  quote_date_time = float
  price_min = float
  price_max = float
  ask_price = float
  sell_price = float
  trading_size = int

class QuoteResource(pyrestful.rest.RestHandler):
  @get(_path="/quote", _produces=mediatypes.APPLICATION_JSON)
  def getQuoteJson(self):
    price_min = random.randint(145000,146000)
    price_max = random.randint(146000,147000)
    ask_price = random.randint(price_min,146000)
    sell_price = random.randint(ask_price,price_max)
    trading_size = random.randint(50,150)
    quote = Quote()
    quote.price_min = price_min/100000
    quote.price_max = price_max/100000
    quote.ask_price = ask_price/100000
    quote.sell_price = sell_price/100000
    quote.trading_size = trading_size
    return quote

if __name__ == "__main__":
  try:
    print("Start the service")
    app = pyrestful.rest.RestService([QuoteResource])
    app.listen(8080)
    tornado.ioloop.IOLoop.instance().start()
  except KeyboardInterrupt:
    print("\nStop the service")



