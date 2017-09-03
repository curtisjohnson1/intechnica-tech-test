const mocha = require('mocha');
const coMocha = require('co-mocha');
const expect = require('chai').expect;
const test = require('selenium-webdriver/testing');
const { Builder, By, until } = require('selenium-webdriver');
coMocha(mocha);

const driver = new Builder().forBrowser('chrome').build();
const testPage = require('../trafficDefenderPageObj')(driver);

test.describe('trafficDefender', function() {
  
  // extend mocha timeout
  this.timeout(65000);

  before(() => testPage.navigateToTestPage());
  after(() => driver.quit());

  test.it('navigates to test page', function*() {
    expect(yield testPage.checkPageTitle()).to.equal('Perf test server 1');
  });

  test.it('hits the queue page', function*() {
    testPage.createHoldingPage();
    testPage.navigateToTestPage();
    testPage.waitForHoldingPage();
    expect(yield testPage.checkPageTitle()).to.equal('TrafficDefender Holding Page');
  });

  test.it('returns the queue number as a string', function*() {
    testPage.wait();
    testPage.isQueueNumberVisible();
    expect(yield testPage.queueNumber()).to.be.a('string')
  });

  test.it('returns the queue number position', function*() {
    testPage.wait();
    testPage.isQueueNumberVisible();
    expect(yield testPage.queueNumber()).to.equal('1');
  })

  test.it('waits for entry to the webpage', function*() {
    expect(yield testPage.enterWebPage()).to.equal('Perf test server 1')  
  });

})