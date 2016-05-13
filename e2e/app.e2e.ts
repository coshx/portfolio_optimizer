import { PortfolioOptimizerPage } from './app.po';

describe('The portfolio optimizer app', function() {
  let page: PortfolioOptimizerPage;

  beforeEach(() => {
    page = new PortfolioOptimizerPage();
  });

  it('should have the correct title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Coshx Portfolio Optimizer');
  });

  it('should have three panels with correct titles', () => {
    page.navigateTo();
    expect(page.getPanelTitles()).toEqual(['Add Stocks', 'Optimal Allocations Chart', 'Results Table']);
  });

  /*
  it('should have the correct default form text', () => {
    page.navigateTo();
    expect(page.getTickerSymbols()).toEqual('AAPL, GOOG, FB');
    expect(page.getStartDate()).toEqual('01/01/2012');
    expect(page.getEndDate()).toEqual('03/20/2016');
    expect(page.getInitialInvestment()).toEqual('1000');
  });
*/
});
