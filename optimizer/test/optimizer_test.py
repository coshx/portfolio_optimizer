from optimizer import app

from tornado.testing import AsyncHTTPTestCase, AsyncTestCase
from tornado.httpclient import AsyncHTTPClient


class GetRequestTestCase(AsyncHTTPTestCase):
    """Tests response to get requests."""
    def get_app(self):
        return app.make_app()

    def test_homepage(self):
        response = self.fetch('/')
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body, b'Success!')

    # def handle_request(response):
    #     if response.error:
    #         print("Error:", response.error)
    #     else:
    #         print(response.body)

    # @tornado.testing.gen_test
    # def test_http_fetch(self):
    #     client = AsyncHTTPClient(self.io_loop)
    #     response = yield client.fetch("http://localhost:8001/",
    #                                   self.handle_request)
    #     self.assertEqual(response.code, 200)
    #     self.assertEqual(response.body, 'Success!')
