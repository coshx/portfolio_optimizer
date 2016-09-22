"""Given ticker symbols and dates, get stock data from Quandl."""

import quandl
import os
import pandas as pd


def get_data(params):
    """Return a pandas data frame with adjusted close data.

    Args:
        params (dict): a portfolio of form:
            {'symbols': ['AAPL', 'FB', 'GOOG'],
             'start_date': '2012-01-01',
             'end_date': '2016-03-20',
             'principle': 1000.00}

    Returns:
        prices_df (dataframe): adjusted close of each stock in porfolio
        SPY_df (dataframe): adjusted close of SPY
    """
    symbols = params['symbols']
    start = params['start_date']
    end = params['end_date']

    prices = {s: hit_quandl(s, start, end) for s in symbols}
    prices_df = pd.concat([prices[s] for s in prices], axis=1, join='inner')

    SPY_df = hit_quandl('INDEX_SPY', start, end)
    return prices_df, SPY_df


def hit_quandl(symbol, start, end):
    """Gets adjusted close data for a stock."""
    quandl_token = os.environ['QUANDL_TOKEN']
    quandl.ApiConfig.api_key = quandl_token
    price = quandl.get("YAHOO/{}.6".format(symbol), start_date=start,
                       end_date=end)
    return price.rename(columns={'Adjusted Close': symbol})


def main():
    params = {'symbols': ['AAPL', 'FB', 'GOOG'],
              'start_date': '2012-01-01',
              'end_date': '2016-03-20',
              'principle': 1000.00}

if __name__ == "__main__":
    main()
