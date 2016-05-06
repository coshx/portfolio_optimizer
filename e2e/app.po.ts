export class PortfolioOptimizerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('portfolio-optimizer-app h1')).getText();
  }
}
