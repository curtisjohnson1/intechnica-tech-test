const { Builder, By, until } = require('selenium-webdriver');

module.exports = function(driver) {
  const elements = {
    queueNumber: By.id('queueLength')
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
      this.wait();
      let element = driver.findElement(elements.queueNumber);
      return element.getText().then(text => {
        if(text === '0') {
          this.wait();
          return element.getText().then(res => {
            console.log(`your queue number position is ${res}`);
            return res;
          });
        } else { 
          console.log(`your queue number position is ${text}`);
          return text };
      });
    },
    wait: function() {
      return driver.sleep(1000);
    },
    enterWebPage: function() {
      driver.sleep(60000);
      return driver.getTitle(title => {
        if(title === this.webPageTitle) {
          return title;
        } else {
          driver.sleep(20000);
          return driver.getTitle(title => {
            return title;
          });
        };
      });
    }
  }

}