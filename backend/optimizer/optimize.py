"""Find allocations that maximize Sharpe ratio and return them."""

import numpy as np
import pandas as pd
import scipy.optimize as spo


def get_portfolio_value(prices, allocs, start_val=1.):
    """Compute daily portfolio value.

    Args:
        prices (dataframe): daily prices for each stock in portfolio
        allocs (list): initial allocations, as fractions that sum to 1
        start_val: total starting value invested in portfolio (default: 1.)

    Returns:
        portfolio_value (dataframe): daily portfolio value
    """
    normed = prices/prices.ix[0]
    position_values = normed * allocs * start_val
    portfolio_value = position_values.sum(axis=1)

    return portfolio_value


def get_cumulative_returns(port_val):
    """Get cumulative returns of a portfolio value dataframe.

    Args:
        port_val (dataframe): daily portfolio value

    Returns:
        cum_ret (float): cumulative return
    """
    port_val = (port_val[-1]/port_val[0])-1
    return port_val


def get_daily_returns(port_val):
    """Get daily returns of a portfolio value dataframe.

    Args:
        port_val (dataframe): daily portfolio value

    Returns:
        daily_ret (dataframe): daily returns
    """
    daily_ret = port_val.copy()
    daily_ret[1:] = (port_val[1:] / port_val[:-1].values)-1
    daily_ret = daily_ret.ix[1:]
    return daily_ret


def get_sharpe_ratio(port_val, SPY_val, daily_rf=5.752e-4, yearly_samples=252):
    """Calculate statistics on given portfolio values.

    Args:
        port_val (dataframe): daily portfolio value
        SPY_val (dataframe): daily value of SPY portfolio
        *daily_rf: daily risk-free rate of return (default: 5.752e-4)
            rf = ((1+yearly_percent)^(1/360) - 1)/100%
            * currently unused
        yearly_samples: frequency of sampling (default: 252)
            There are 252 trading days in a year.

    Returns:
        sharpe_ratio (float): annualized Sharpe ratio
    """
    port_daily_ret = get_daily_returns(port_val)
    SPY_daily_ret = get_daily_returns(SPY_val)

    sharpe_ratio = np.sqrt(yearly_samples) * ((port_daily_ret-SPY_daily_ret).mean() /
                                              (port_daily_ret-SPY_daily_ret).std())
    return sharpe_ratio


def optimize_allocations(prices, prices_SPY):
    """Find optimal allocations for a stock portfolio, optimizing for Sharpe ratio.

    Args:
        prices (dataframe): prices for stocks in our portfolio
        prices_SPY (dataframe): prices for SPY

    Returns:
        sharpe_ratio (float): Sharpe ratio for optimally allocated portfolio
    """
    # 1. Define 'error' function
    def sharpe(weights):
        port_val = get_portfolio_value(prices, weights)
        SPY_val = get_portfolio_value(prices_SPY, [1])
        return get_sharpe_ratio(port_val, SPY_val) * -1

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
    """Simulate and optimize portfolio allocations.

    Args:
        prices (dataframe): prices for stocks in our portfolio
        prices_SPY (dataframe): prices for SPY

    Returns:
        optimal_portfolio (dict): dict containing optimal portfolio stats
    """
    # Get optimal allocations
    prices = prices.reindex_axis(sorted(prices.columns), axis=1)
    allocs = optimize_allocations(prices, prices_SPY)
    allocs = allocs / np.sum(allocs)

    # Get daily portfolio value (normalized to 1.0)
    port_val = get_portfolio_value(prices, allocs)
    SPY_val = get_portfolio_value(prices_SPY, [1])
    compare_SPY = pd.concat([port_val, SPY_val], keys=['Optimized', 'SPY'],
                            axis=1, join='inner')

    symbols = list(prices.columns.values)
    return {'optimal_allocations': {k: v for (k, v) in zip(symbols, allocs)},
            'sharpe_ratio': get_sharpe_ratio(port_val, SPY_val),
            'cumulative_returns': get_cumulative_returns(port_val),
            'performance': compare_SPY.to_json()}


def main():
    """Driver function."""
    from utils import get_data
    params = {'symbols': ['XOM', 'ABBV', 'MMM', 'GOOG', 'FB'],
              'start_date': '01/01/2014',
              'end_date': '03/20/2016',
              'principle': 1000.00}
    prices, prices_SPY = get_data(params)
    allocs = optimize_portfolio(prices, prices_SPY)
    print(allocs)


if __name__ == "__main__":
    main()
