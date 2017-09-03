const { Builder, By, until } = require('selenium-webdriver');

module.exports = function(driver) {
  const elements = {
    queueNumber: By.className('odometer-value')
  };
  return {
    url: 'http://34.252.63.57/',
    holdingPage: 'TrafficDefender Holding Page',
    navigateToTestPage: function() {
      return driver.get(this.url);
    },
    checkPageTitle: function() {
      return driver.getTitle(title => {
        return title;
      });
    },
    createHoldingPage: function() {
      return driver.executeScript(`window.open("${this.url}");`);
    }
  }

}