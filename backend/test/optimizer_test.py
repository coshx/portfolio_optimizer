import numpy as np
import pandas as pd
import datetime

from unittest import TestCase
from optimizer import utils

class GetDataFromQuandl(TestCase):
    def setUp(self):
        params = {'symbols': ['AAPL', 'GOOG', 'FB'],
                  'start_date': '01-01-12',
                  'end_date': '03-20-16',
                  'principle': 1000.00}
        self.data = utils.get_data(params)

    def test_array_size(self):
        shape = self.data.shape
        self.assertEqual(shape, (964, 3))

    def test_correct_start_date(self):
        start = self.data.index[0].to_datetime()
        may_18 = datetime.datetime(2012, 5, 18)
        self.assertEqual(start, may_18)

    def test_correct_end_date(self):
        end = self.data.index[-1].to_datetime()
        march_18 = datetime.datetime(2016, 3, 18)
        self.assertEqual(end, march_18)
