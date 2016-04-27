"""Given ticker symbols and dates, get stock data from Quandl."""

import Quandl
import pandas as pd


def get_data(params):
    """Return a pandas data frame with adjusted close data.

    Keyword arguments:
    data -- dictionary of the following form:
        {'symbols': ['AAPL', 'FB', 'GOOG'],
         'start_date': '01/01/2012',
         'end_date': '03/20/2016',
         'principle': 1000.00}

    Returns:
    stocks -- Pandas DataFrame with adjusted close of each stock in
              data['symbols'] as columns and the date range from start_date
              to end_date as row indices
    """
    symbols = params['symbols']
    start = params['start_date']
    end = params['end_date']

    prices = {s: hit_quandl(s, start, end) for s in symbols}
    stocks = pd.concat([prices[s] for s in prices], axis=1, join='inner')
    return stocks


def hit_quandl(symbol, start, end):
    """Gets adjusted close data for a stock."""
    price = Quandl.get("YAHOO/{}.6".format(symbol), trim_start=start,
                       trim_end=end, authtoken='26J-ZYBKTwxxap4xy1-T')
    return price.rename(columns={'Adjusted Close': symbol})


def main():
    params = {'symbols': ['AAPL', 'FB', 'GOOG'],
              'start_date': '01/01/2012',
              'end_date': '03/20/2016',
              'principle': 1000.00}
    print(get_data(params))

if __name__ == "__main__":
    main()
