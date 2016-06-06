import json

import app

from tornado.testing import AsyncHTTPTestCase, AsyncTestCase
from tornado.httpclient import AsyncHTTPClient


class HandleRequestsTestCase(AsyncHTTPTestCase):
    def get_app(self):
        return app.make_app()

    def test_handle_get_request(self):
        """Tests response to get requests (smoke test)."""
        response = self.fetch('/')
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body, b'Success!')

    def test_handle_post_request(self):
        """Tests proper response to POST request."""
        params = {'symbols': ['AAPL', 'GOOG', 'FB'],
                  'start_date': '01-01-12',
                  'end_date': '03-20-16',
                  'principle': 1000.00}
        response = self.fetch('/', method="POST", body=json.dumps(params))
        self.assertEqual(response.code, 200)

        res_json = json.loads(response.body.decode('utf-8'))
        res_keys = list(dict(res_json).keys())
        self.assertEqual(sorted(res_keys), ['cumulative_returns',
                                            'optimal_allocations',
                                            'sharpe_ratio'])

        res_symbols = list(dict(res_json['optimal_allocations']).keys())
        self.assertEqual(sorted(res_symbols), sorted(params['symbols']))

        res_allocs = list(dict(res_json['optimal_allocations']).values())
        self.assertEqual(sum(res_allocs), 1.0)
