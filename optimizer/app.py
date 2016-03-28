import json

import tornado.ioloop
import tornado.httpserver
import tornado.web

from tornado.options import define, options, parse_command_line

# Add command line flags
define("port", default=8000, help="run on the given port", type=int)
define("debug", default=False, help="run in debug mode")

class MainHandler(tornado.web.RequestHandler):
    """Handles post requests by responding with a JSON file."""
    @tornado.web.asynchronous
    def get(self):
        self.write("Success!")
        self.finish()

    @tornado.web.asynchronous
    def post(self):
        data = json.loads(self.request.body.decode('utf-8'))
        self.optimize_portfolio(data)
        self.finish()

def make_app():
    tornado.options.parse_command_line()
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

def optimize_portfolio(self, data):
    Info = {'key': 'value'}
    self.write(json.dumps(data))

def main():
    """Runs application on httpserver with handler for '/'."""
    app = make_app()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    """
    Responds to this curl

    curl -H "Content-Type: application /json" -X POST -d '{"username":"xyz", "password":"xyz"}' http://localhost:8000
    """
    main()
