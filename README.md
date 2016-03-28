# Portfolio Allocation Optimizer
##Disclaimer
This tool should be viewed as a statistical model of the stock market rather than investment advice. Use the Portfolio Allocation Optimizer completely at your own risk. None of the creators or hosts of this software assume any responsibility for financial loss or other damages resulting from its use.

##What is it?
This portfolio optimizer is an Angular 2.0 web application that takes a list of stocks in your portfolio (or a hypothetical portfolio) and returns the optimal allocations for each stock. A backend Python [SimpleHTTP server](https://docs.python.org/2/library/simplehttpserver.html) runs the data analysis and serves it up to the frontend Angular application.

###What does "optimal" mean?
We choose to optimize the portfolio's Sharpe ratio. [Sharpe ratio](https://en.wikipedia.org/wiki/Sharpe_ratio) is a metric for risk-adjusted returns, so it penalizes portfolios that contain stocks with high volatility. Other metrics could be used and may be added in the future.

###What pricing data are you using?
We use [Yahoo Finance data from Quandl](https://www.quandl.com/data/YAHOO). Admittedly, there are better data sources, but Quandl is a great compromise for its ease of use, price (free), and accuracy.

##Getting Started

1. Clone this repo using `git clone https://github.com/mwytock0812/portfolio_optimizer.git`.
2. Install [Python 3.5.1](https://docs.python.org/3/) or greater.
3. Build the Anaconda environment.
  * Install [Anaconda](http://conda.pydata.org/docs/installation.html). If you would like a lighter installation, follow the instructions to install [Miniconda](http://conda.pydata.org/docs/install/quick.html) instead.
  * `cd` into `./portfolio_optimizer/optimizer/`
  * Use `conda env create -f ./optimizer/environment.yml` to install the python dependencies for the backend.

##Testing

1. `cd` into the root directory, `./portfolio_optimizer`
2. Run `python -m tornado.testing optimizer.test.optimizer_test` to test the optimizer.
