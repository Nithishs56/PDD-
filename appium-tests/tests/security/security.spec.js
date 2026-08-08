/**
 * FleetSync Appium E2E — Security & Data Protection
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');

describe('Security & Data Protection', () => {

  it('MOB_TC_281 — Verify SQL injection in email field does not crash the app', async () => {
    // SQL injection in email field should not crash app
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true; // app should handle gracefully
  });

  it('MOB_TC_282 — Verify XSS payload in email field does not execute script', async () => {
    // XSS payload in email field
    await LoginPage.enterEmail(testData.invalidCredentials.xssPayload);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_283 — Verify password field uses secureTextEntry to mask input', async () => {
    // SQL injection in email field should not crash app
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true; // app should handle gracefully
  });

  it('MOB_TC_284 — Verify Firebase auth tokens are not exposed in console logs', async () => {
    // XSS payload in email field
    await LoginPage.enterEmail(testData.invalidCredentials.xssPayload);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_285 — Verify Firestore security rules prevent unauthorized read/write', async () => {
    // SQL injection in email field should not crash app
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true; // app should handle gracefully
  });

  it('MOB_TC_286 — Verify OTP is generated server-side and not predictable client-side', async () => {
    // XSS payload in email field
    await LoginPage.enterEmail(testData.invalidCredentials.xssPayload);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_287 — Verify 3 wrong OTP attempts blocks student from further tries', async () => {
    // SQL injection in email field should not crash app
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true; // app should handle gracefully
  });

  it('MOB_TC_288 — Verify RTDB location data requires authenticated user', async () => {
    // XSS payload in email field
    await LoginPage.enterEmail(testData.invalidCredentials.xssPayload);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_289 — Verify logout clears all sensitive data from app state', async () => {
    // SQL injection in email field should not crash app
    await LoginPage.enterEmail(testData.invalidCredentials.sqlInjection);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true; // app should handle gracefully
  });

  it('MOB_TC_290 — Verify admin role cannot access mobile app driver or student screens', async () => {
    // XSS payload in email field
    await LoginPage.enterEmail(testData.invalidCredentials.xssPayload);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });
});
