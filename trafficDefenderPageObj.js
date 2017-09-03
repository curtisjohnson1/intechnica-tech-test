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
    },
    waitForHoldingPage: function() {
      return driver.wait(until.titleIs(this.holdingPage));
    },
    isQueueNumberVisible: function() {
      return driver.wait(until.elementLocated(elements.queueNumber))
    },
    queueNumber: function() {
      let element = driver.findElement(elements.queueNumber);
      return element.getText().then(text => {
        if(text === '0') {
          driver.sleep(500)
          return element.getText().then(res => {
            return res;
          });
        } else { return text };
      });
    },
    wait: function() {
      driver.sleep(1000);
      return;
    }
  }

}