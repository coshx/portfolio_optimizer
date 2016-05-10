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
  * `cd` into the application root, `./portfolio_optimizer/`
  * Use `conda env create -f ./backend/environment.yml` to install the Python dependencies for the backend. This will create a `conda` environment called `stocks`.
  * Activate the `stocks` environment using `source activate stocks` on Linux/OS X or `activate stocks` on Windows. You can deactivate the conda environment using `source deactivate` on Linux/OS X or `deactivate` on Windows.
4. With the `stocks` environment activated, run `python -m backend.app` from the application root, `./portfolio_optimizer/`
5. You now have the portfolio optimizing Python backend up and running!

##Testing

1. `cd` into the root directory, `./portfolio_optimizer`, and make sure the Python backend is up and running. See [Getting Started](portfolio_optimizer#getting-started).
2. Open a new shell session and activate the `conda` environment: `source activate stocks` (Linux/OS X) or `activate stocks` (Windows).
3. Run `python -m tornado.testing backend.test.optimizer_test` to test the optimizer module.
4. Run `python -m tornado.testing backend.test.app_test` to test the backend app.
