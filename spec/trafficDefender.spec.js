const mocha = require('mocha');
const coMocha = require('co-mocha');
const expect = require('chai').expect;
const test = require('selenium-webdriver/testing');
const { Builder, By, until } = require('selenium-webdriver');
coMocha(mocha);

const driver = new Builder().forBrowser('chrome').build();
const testPage = require('../trafficDefenderPageObj')(driver);

test.describe('trafficDefender', function() {
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
  
})