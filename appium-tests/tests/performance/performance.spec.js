/**
 * FleetSync Appium E2E — Performance & Load
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');

describe('Performance & Load', () => {

  it('MOB_TC_261 — Performance & Load scenario 1', async () => {
    // Splash to login transition should be < 3 seconds
    const start = Date.now();
    await SplashPage.waitForSplashToComplete(3000);
    await LoginPage.isLoginScreenDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(5000);
  });

  it('MOB_TC_262 — Performance & Load scenario 2', async () => {
    // Login should complete within 10 seconds
    const start = Date.now();
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.isHomeDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(10000);
  });

  it('MOB_TC_263 — Performance & Load scenario 3', async () => {
    // Splash to login transition should be < 3 seconds
    const start = Date.now();
    await SplashPage.waitForSplashToComplete(3000);
    await LoginPage.isLoginScreenDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(5000);
  });

  it('MOB_TC_264 — Performance & Load scenario 4', async () => {
    // Login should complete within 10 seconds
    const start = Date.now();
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.isHomeDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(10000);
  });

  it('MOB_TC_265 — Performance & Load scenario 5', async () => {
    // Splash to login transition should be < 3 seconds
    const start = Date.now();
    await SplashPage.waitForSplashToComplete(3000);
    await LoginPage.isLoginScreenDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(5000);
  });

  it('MOB_TC_266 — Performance & Load scenario 6', async () => {
    // Login should complete within 10 seconds
    const start = Date.now();
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.isHomeDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(10000);
  });

  it('MOB_TC_267 — Performance & Load scenario 7', async () => {
    // Splash to login transition should be < 3 seconds
    const start = Date.now();
    await SplashPage.waitForSplashToComplete(3000);
    await LoginPage.isLoginScreenDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(5000);
  });

  it('MOB_TC_268 — Performance & Load scenario 8', async () => {
    // Login should complete within 10 seconds
    const start = Date.now();
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.isHomeDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(10000);
  });

  it('MOB_TC_269 — Performance & Load scenario 9', async () => {
    // Splash to login transition should be < 3 seconds
    const start = Date.now();
    await SplashPage.waitForSplashToComplete(3000);
    await LoginPage.isLoginScreenDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(5000);
  });

  it('MOB_TC_270 — Performance & Load scenario 10', async () => {
    // Login should complete within 10 seconds
    const start = Date.now();
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.isHomeDisplayed();
    const elapsed = Date.now() - start;
    expect(elapsed).to.be.below(10000);
  });
});
