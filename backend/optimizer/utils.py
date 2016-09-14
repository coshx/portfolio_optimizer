"""Given ticker symbols and dates, get stock data from Quandl."""

import Quandl
import os
import pandas as pd


def get_data(params):
    """Return a pandas data frame with adjusted close data.

    Args:
        params (dict): a portfolio of form:
            {'symbols': ['AAPL', 'FB', 'GOOG'],
             'start_date': '01/01/2012',
             'end_date': '03/20/2016',
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
    price = Quandl.get("YAHOO/{}.6".format(symbol), trim_start=start,
                       trim_end=end, authtoken=quandl_token)
    return price.rename(columns={'Adjusted Close': symbol})


def main():
    params = {'symbols': ['AAPL', 'FB', 'GOOG'],
              'start_date': '01/01/2012',
              'end_date': '03/20/2016',
              'principle': 1000.00}

if __name__ == "__main__":
    main()
