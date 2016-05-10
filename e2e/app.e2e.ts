import { PortfolioOptimizerPage } from './app.po';

describe('portfolio-optimizer App', function() {
  let page: PortfolioOptimizerPage;

  beforeEach(() => {
    page = new PortfolioOptimizerPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('portfolio-optimizer works!');
  });
});
