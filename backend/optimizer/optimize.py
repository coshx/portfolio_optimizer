"""Find allocations that maximize Sharpe ratio and return them."""

import numpy as np
import pandas as pd
import scipy.optimize as spo


def get_portfolio_value(prices, allocs, start_val=1):
    """Compute daily portfolio value.

    Parameters
    ----------
        prices: daily prices for each stock in portfolio
        allocs: initial allocations, as fractions that sum to 1
        start_val: total starting value invested in portfolio (default: 1)

    Returns
    -------
        port_val: daily portfolio value
    """
    normed = prices/prices.ix[0]
    alloced = normed * allocs
    pos_vals = alloced * start_val
    port_val = pos_vals.sum(axis=1)

    return port_val


def get_portfolio_stats(port_val, daily_rf=0.0005752, samples_per_year=252):
    """Calculate statistics on given portfolio values.

    Parameters
    ----------
        port_val: daily portfolio value
        daily_rf: daily risk-free rate of return = ((1+yearly_percent)^(1/360) - 1)/100%
        samples_per_year: frequency of sampling (default: 252 trading days)

    Returns
    -------
        cum_ret: cumulative return
        avg_daily_ret: average of daily returns
        std_daily_ret: standard deviation of daily returns
        sharpe_ratio: annualized Sharpe ratio
    """
    cum_ret = (port_val[-1]/port_val[0])-1

    # Calculate daily returns
    daily_ret = port_val.copy()
    daily_ret[1:] = (port_val[1:] / port_val[:-1].values)-1
    daily_ret = daily_ret.ix[1:]

    # Continue calculating stats
    avg_daily_ret = daily_ret.mean()
    std_daily_ret = daily_ret.std()
    sharpe_ratio = np.sqrt(samples_per_year) * (daily_ret-daily_rf).mean()/daily_ret.std()
    return cum_ret, avg_daily_ret, std_daily_ret, sharpe_ratio


def optimize_allocations(prices):
    """Find optimal allocations for a stock portfolio, optimizing for Sharpe ratio.

    Keyword arguments:
    data -- dictionary of the following form:
        {'symbols': ['AAPL', 'FB', 'GOOG'],
         'start_date': '01/01/2012',
         'end_date': '03/20/2016',
         'principle': 1000.00}

    Returns
    allocs -- dictionary of the following form:
        {'AAPL', 0.5,
         'GOOG', 0.3,
         'FB', 0.2}
    """
    # 1. Define 'error' function
    def sharpe(weights):
        return get_portfolio_stats(get_portfolio_value(prices, weights))[3] * -1

    # 2. Set bounds
    num_stocks = prices.shape[1]
    bnds = tuple([(0, 1)])*num_stocks
    cons = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})

    # 3. Run optimizer
    ## Get optimizer notes by setting 'disp' to True
    result = spo.minimize(sharpe, num_stocks * [1. / num_stocks],
                          method='SLSQP', bounds=bnds,
                          constraints=cons, options={'disp': False})

    return result['x']


def optimize_portfolio(prices, prices_SPY):
    """Simulate and optimize portfolio allocations."""
    # Get optimal allocations
    prices = prices.reindex_axis(sorted(prices.columns), axis=1)
    symbols = list(prices.columns.values)
    allocs = optimize_allocations(prices)
    allocs = allocs / np.sum(allocs)

    # Get daily portfolio value (already normalized since we use default start_val=1.0)
    port_val = get_portfolio_value(prices, allocs).rename("Portfolio")

    # Get portfolio statistics (note: std_daily_ret = volatility)
    cum_ret, avg_daily_ret, std_daily_ret, sharpe_ratio = get_portfolio_stats(port_val)

    ## To compare daily portfolio value with normalized SPY:
    normed_SPY = prices_SPY / prices_SPY.ix[0, :]
    normed_SPY.rename(columns={'INDEX_SPY': 'SPY'}, inplace=True)
    compare_SPY = pd.concat([port_val, normed_SPY], axis=1, join='inner')

    return {'optimal_allocations': {k: v for (k, v) in zip(symbols, allocs)},
            'sharpe_ratio': sharpe_ratio,
            'cumulative_returns': cum_ret,
            'performance': compare_SPY}


def main():
    """Driver function."""
    from utils import get_data
    params = {'symbols': ['XOM', 'ABBV', 'MMM', 'GOOG', 'FB', 'SPLV'],
              'start_date': '01/01/2015',
              'end_date': '03/20/2015',
              'principle': 1000.00}
    prices, prices_SPY = get_data(params)
    allocs = optimize_portfolio(prices, prices_SPY)
    print(allocs)


if __name__ == "__main__":
    main()
