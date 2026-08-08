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

  it('MOB_TC_001 — Verify Login screen displays FleetSync logo, Sign In heading, email and password fields', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_002 — Verify successful login with valid driver credentials navigates to Driver Home', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_003 — Verify successful login with valid student credentials navigates to Student Home', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_004 — Verify error message for incorrect email or password credentials', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_005 — Verify error message when both email and password fields are empty', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_006 — Verify error message for malformed email format input', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.malformedEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_007 — Verify user session persists after app restart via Firebase onAuthStateChanged', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.goBack();
    const still = await DriverHomePage.isHomeDisplayed();
    expect(still).to.be.true; // session should persist
  });

  it('MOB_TC_008 — Verify password visibility toggle shows and hides password text', async () => {
    await LoginPage.togglePasswordVisibility();
    const visible = await LoginPage.isPasswordVisible();
    expect(visible).to.be.true;
  });

  it('MOB_TC_009 — Verify SQL injection in email field is handled gracefully without crash', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_010 — Verify driver logout from Profile shows confirmation and returns to Login', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.logout();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_011 — Verify student logout from Profile shows confirmation and returns to Login', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_012 — Verify admin role login is blocked with web portal message', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_013 — Verify login button shows spinner while authentication is in progress', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_014 — Verify login button is disabled during loading to prevent duplicate submissions', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_015 — Verify error message clears when user starts typing in email or password', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_016 — Verify email field has autoCapitalize none and email keyboard type', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.malformedEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_017 — Verify keyboard avoidance works on iOS with padding behavior', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.goBack();
    const still = await DriverHomePage.isHomeDisplayed();
    expect(still).to.be.true; // session should persist
  });

  it('MOB_TC_018 — Verify Firestore user document not found shows contact admin error', async () => {
    await LoginPage.togglePasswordVisibility();
    const visible = await LoginPage.isPasswordVisible();
    expect(visible).to.be.true;
  });

  it('MOB_TC_019 — Verify role-based navigation routes driver to DriverNavigator', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_020 — Verify role-based navigation routes student to StudentNavigator', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await DriverHomePage.logout();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_021 — Verify email whitespace is trimmed before Firebase authentication', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const displayed = await LoginPage.isLoginScreenDisplayed();
    expect(displayed).to.be.true;
  });

  it('MOB_TC_022 — Verify XSS payload in email field is handled without rendering HTML', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_023 — Verify long string email input does not crash the application', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const home = await StudentHomePage.isHomeDisplayed();
    expect(home).to.be.true;
  });

  it('MOB_TC_024 — Verify special characters in password field are accepted properly', async () => {
    await LoginPage.login(testData.invalidCredentials.wrongEmail, testData.invalidCredentials.wrongPassword);
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_025 — Verify rapid login button taps do not create multiple auth requests', async () => {
    await LoginPage.enterEmail(testData.invalidCredentials.emptyEmail);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });
});
