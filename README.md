# Portfolio Allocation Optimizer
## Disclaimer
This tool should be viewed as a statistical model of the stock market rather than investment advice. Use the Portfolio Allocation Optimizer completely at your own risk. None of the creators or hosts of this software assume any responsibility for financial loss or other damages resulting from its use.

## What is it?
This portfolio optimizer is an Angular 2.0 web application that takes a list of stocks in your portfolio (or a hypothetical portfolio) and returns the optimal allocations for each stock. A backend Python [SimpleHTTP server](https://docs.python.org/2/library/simplehttpserver.html) runs the data analysis and serves it up to the frontend Angular application.

### What does "optimal" mean?
We choose to optimize the portfolio's Sharpe ratio. [Sharpe ratio](https://en.wikipedia.org/wiki/Sharpe_ratio) is a metric for risk-adjusted returns, so it penalizes portfolios that contain stocks with high volatility. Other metrics could be used and may be added in the future.

### What pricing data are you using?
We use [Yahoo Finance data from Quandl](https://www.quandl.com/data/YAHOO). Admittedly, there are better data sources, but Quandl is a great compromise for its ease of use, price (free), and accuracy.

## Getting Started
### Setup the Backend Data Service

1. Clone this repo using `git clone https://github.com/mwytock0812/portfolio_optimizer.git`.
1. Build the Anaconda environment.
  * Install [Anaconda](http://conda.pydata.org/docs/installation.html). If you would like a lighter installation, follow the instructions to install [Miniconda](http://conda.pydata.org/docs/install/quick.html) instead.
  * `cd` into the application root, `./portfolio_optimizer/`
  * Use `conda env create -f ./backend/environment.yml` to install the Python dependencies for the backend. This will create a `conda` environment called `stocks`.
  * Activate the `stocks` environment using `source activate stocks` on Linux/OS X or `activate stocks` on Windows. You can deactivate the conda environment using `source deactivate` on Linux/OS X or `deactivate` on Windows.
1. With the `stocks` environment activated, run `python app.py` from `./portfolio_optimizer/backend`.
1. Navigate to [http://localhost:8000](http://localhost:8000) to verify that you see the "Success!" message.
  * By default, the server runs on port 8000, you can specify the port by including a command line flag: `python app.py --port=5678`.

### Setup The Frontend Application

1. Assuming you've already cloned the repo, navigate to its root, `./portfolio_optiizer`.
1. Install [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node).
1. Run `npm install` to install `angular-cli` and other dependencies.
1. Run `ng server` to begin serving the application on [http://localhost:4200](http://localhost:4200)

## Testing
## Testing the Backend Data Service

1. `cd` into `./portfolio_optimizer/backend`, activate the conda environment, and finally run `python app.py` . See [Setup The Backend Data Service](#setup-the-backend-data-service) for more details on these steps.
2. Open a new shell session, `cd` into `./portfolio_optimizer/backend`, and activate the conda environment.
3. Run `python -m tornado.testing test.optimizer_test` to test the optimizer module.
4. Run `python -m tornado.testing test.app_test` to test the backend app itself.
