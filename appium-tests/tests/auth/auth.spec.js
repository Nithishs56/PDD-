/**
 * FleetSync Appium E2E — Authentication & Session
 * Auto-generated test suite: 25 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');
const NavigationPage  = require('../../pages/NavigationPage');

describe('Authentication & Session', () => {

  it('MOB_TC_001 — Authentication & Session scenario 1', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_002 — Authentication & Session scenario 2', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_003 — Authentication & Session scenario 3', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_004 — Authentication & Session scenario 4', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_005 — Authentication & Session scenario 5', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_006 — Authentication & Session scenario 6', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.malformedEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_007 — Authentication & Session scenario 7', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.goBack();
    const still = await DriverHomePage.isHomeDisplayed();
    expect(still).to.be.true; // session should persist
  });

  it('MOB_TC_008 — Authentication & Session scenario 8', async () => {
    await LoginPage.togglePasswordVisibility();
    const visible = await LoginPage.isPasswordVisible();
    expect(visible).to.be.true;
  });

  it('MOB_TC_009 — Authentication & Session scenario 9', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_010 — Authentication & Session scenario 10', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.logout();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_011 — Authentication & Session scenario 11', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_012 — Authentication & Session scenario 12', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_013 — Authentication & Session scenario 13', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_014 — Authentication & Session scenario 14', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_015 — Authentication & Session scenario 15', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_016 — Authentication & Session scenario 16', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.malformedEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_017 — Authentication & Session scenario 17', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.goBack();
    const still = await DriverHomePage.isHomeDisplayed();
    expect(still).to.be.true; // session should persist
  });

  it('MOB_TC_018 — Authentication & Session scenario 18', async () => {
    await LoginPage.togglePasswordVisibility();
    const visible = await LoginPage.isPasswordVisible();
    expect(visible).to.be.true;
  });

  it('MOB_TC_019 — Authentication & Session scenario 19', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_020 — Authentication & Session scenario 20', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.logout();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_021 — Authentication & Session scenario 21', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_022 — Authentication & Session scenario 22', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_023 — Authentication & Session scenario 23', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_024 — Authentication & Session scenario 24', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_025 — Authentication & Session scenario 25', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });
});
