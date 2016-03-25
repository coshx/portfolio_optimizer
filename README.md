# Portfolio Allocation Optimizer
## What is it?
This portfolio optimizer is an Angular 2.0 web application that takes a list of stocks in your portfolio (or a hypothetical portfolio) and returns the optimal allocations for each stock. A backend Python [SimpleHTTP server](https://docs.python.org/2/library/simplehttpserver.html) runs the data analysis and serves it up to the frontend Angular application.

### What does "optimal" mean?
We choose to optimize the portfolio's Sharpe ratio. [Sharpe ratio](https://en.wikipedia.org/wiki/Sharpe_ratio) is a metric for risk-adjusted returns, so it penalizes portfolios that contain stocks with high volatility. Other metrics could be used and may be added in the future.


