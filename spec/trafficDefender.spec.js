const mocha = require('mocha');
const coMocha = require('co-mocha');
const expect = require('chai').expect;
const test = require('selenium-webdriver/testing');
const browser = require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
coMocha(mocha);

const driver = new Builder().forBrowser('chrome').build();
const testPage = require('../trafficDefenderPageObj')(driver);

test.describe('trafficDefender', function() {
  
  // extend mocha timeout
  this.timeout(65000); 

  before(() => testPage.navigateToTestPage());
  after(() => driver.quit());

  test.it(`That a user can make a request to the website and receive an expected response`, function*() {
    expect(yield testPage.checkPageTitle()).to.equal('Perf test server 1');
  });

  test.it(`That a user that makes a request when the number of allowed users has been exceeded then a queue page is returned`, function*() {
    testPage.createHoldingPage();
    testPage.navigateToTestPage();
    testPage.waitForHoldingPage();
    expect(yield testPage.checkPageTitle()).to.equal('TrafficDefender Holding Page');
  });

  test.it(`The queue page will return the queue number as a string`, function*() {
    testPage.wait();
    testPage.isQueueNumberVisible();
    expect(yield testPage.queueNumber()).to.be.a('string')
  });

  test.it(`That when requested the queue page returns a valid queue position`, function*() {
    testPage.wait();
    testPage.isQueueNumberVisible();
    expect(yield testPage.queueNumber()).to.equal('1');
  });

  test.it(`That when space becomes available in the system the user in the queue gains access to the website`, function*() {
    testPage.waitForHoldingPage();
    expect(yield testPage.enterWebPage()).to.equal('Perf test server 1')  
  });

})