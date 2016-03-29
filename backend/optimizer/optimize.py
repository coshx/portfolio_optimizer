"""Find allocations that maximize Sharpe ratio and return them."""

import pandas as pd
import numpy as np
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


def get_portfolio_stats(port_val, daily_rf=0.0014, samples_per_year=252):
    """Calculate statistics on given portfolio values.

    Parameters
    ----------
        port_val: daily portfolio value
        daily_rf: daily risk-free rate of return = (1+yearlyrate)^(1/360) - 1
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
        {'symbols': ['AAPL', 'GOOG', 'FB'],
         'start_date': '01-01-12',
         'end_date': '03-20-16',
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
    ## Output optimizer notes by setting 'disp' to True
    result = spo.minimize(sharpe, num_stocks * [1. / num_stocks],
                          method='SLSQP', bounds=bnds,
                          constraints=cons, options={'disp': False})

    return result['x']


def optimize_portfolio(prices):
    """Simulate and optimize portfolio allocations."""
    # Get optimal allocations
    prices = prices.reindex_axis(sorted(prices.columns), axis=1)
    symbols = list(prices.columns.values)
    allocs = optimize_allocations(prices)
    allocs = allocs / np.sum(allocs)  # normalize allocations, if they don't sum to 1.0

    # Get daily portfolio value (already normalized since we use default start_val=1.0)
    port_val = get_portfolio_value(prices, allocs)

    # Get portfolio statistics (note: std_daily_ret = volatility)
    cum_ret, avg_daily_ret, std_daily_ret, sharpe_ratio = get_portfolio_stats(port_val)

    # # May want to compare daily portfolio value with normalized SPY
    # # Could break this out and may another async call
    # normed_SPY = prices_SPY / prices_SPY.ix[0, :]
    # df_temp = pd.concat([port_val, normed_SPY], keys=['Portfolio', 'SPY'], axis=1)
    return {k: v for (k, v) in zip(symbols, allocs)}


def test_run():
    """Driver function."""
    # Define input parameters
    start_date = '2004-01-01'
    end_date = '2008-01-31'
    symbols = ['YHOO', 'HPQ', 'GLD', 'HNZ']  # list of symbols
    
    # Optimize portfolio
    optimize_portfolio(start_date, end_date, symbols)


if __name__ == "__main__":
    test_run()
