import json

import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    """Handles post requests by responding with a JSON file."""
    @tornado.web.asynchronous
    def post(self):
        data = json.loads(self.request.body.decode('utf-8'))
        self.optimize_portfolio(data)
        self.finish()

    def optimize_portfolio(self, data):
        Info = {'key': 'value'}
        self.write(json.dumps(data))

def make_app():
    """Returns an application with a handler for only '/'."""
    return tornado.web.Application([
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
    """
    Responds to this curl

    curl -H "Content-Type: application
/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:8000
    """
