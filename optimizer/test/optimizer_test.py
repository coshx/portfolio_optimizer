import json

from optimizer import app

from tornado.testing import AsyncHTTPTestCase, AsyncTestCase
from tornado.httpclient import AsyncHTTPClient


class HandleRequestsTestCase(AsyncHTTPTestCase):
    """Tests response to get requests."""
    def get_app(self):
        return app.make_app()

    def test_handle_get_request(self):
        """Smoke tests the application."""
        response = self.fetch('/')
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body, b'Success!')

    def test_handle_post_request(self):
        """Tests ability to parse JSON."""
        response = self.fetch('/',
                              method="POST",
                              body=json.dumps({"key1": "value1",
                                               "key2": "value2"}))
        self.assertEqual(response.code, 200)

        res_json = json.loads(response.body.decode('utf-8'))
        res_dict = dict(res_json)
        expected = {"key1": "value1", "key2": "value2"}
        self.assertEqual(res_dict, expected)
