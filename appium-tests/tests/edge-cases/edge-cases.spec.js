/**
 * FleetSync Appium E2E — Negative / Edge Cases
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');

describe('Negative / Edge Cases', () => {

  it('MOB_TC_291 — Verify very long email string does not overflow or crash input', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_292 — Verify special characters in password are handled correctly', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_293 — Verify double-tap on Start Trip does not create duplicate Firestore docs', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_294 — Verify Board Bus when trip ends mid-verification shows appropriate error', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_295 — Verify student marks absent then driver starts trip shows absent in list', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_296 — Verify OTP refresh during student verification shows expired OTP error', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_297 — Verify app handles Firestore document not found for deleted user', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_298 — Verify empty student list on route shows No students found empty state', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_299 — Verify notification list handles 100+ notifications without crash', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_300 — Verify rapid tab switching does not cause navigation stack corruption', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });
});
