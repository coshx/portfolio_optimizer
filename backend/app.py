import json

import tornado.ioloop
import tornado.httpserver
import tornado.web

from backend.optimizer.utils import get_data
from backend.optimizer.optimize import optimize_allocations

from tornado.options import define, options, parse_command_line

# Add command line flags
define("port", default=8000, help="run on the given port", type=int)
define("debug", default=False, help="run in debug mode")


class MainHandler(tornado.web.RequestHandler):
    """Handles post requests by responding with a JSON file."""
    @tornado.web.asynchronous
    def get(self):
        """Respond to GET requests for debugging purposes."""
        self.write("Success!")
        self.finish()

    @tornado.web.asynchronous
    def post(self):
        """Respond to POST requests with optimal allocations."""
        data = json.loads(self.request.body.decode('utf-8'))
        stock_params = dict(data)
        allocations = optimize_portfolio(stock_params)
        self.write(allocations)
        self.finish()


def make_app():
    tornado.options.parse_command_line()
    return tornado.web.Application([
        (r"/", MainHandler),
    ])


def optimize_portfolio(stock_params):
    """Call methods to get stock data and find optimal allocations."""
    prices = get_data(stock_params)
    print(prices)
    allocs = optimize_allocations(prices)
    return stock_params  # want to return allocs


def main():
    """Runs application on httpserver with handler for '/'."""
    app = make_app()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()
