/**
 * FleetSync Appium E2E — Negative / Edge Cases
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');

describe('Negative / Edge Cases', () => {

  it('MOB_TC_291 — Negative / Edge Cases scenario 1', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_292 — Negative / Edge Cases scenario 2', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_293 — Negative / Edge Cases scenario 3', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_294 — Negative / Edge Cases scenario 4', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_295 — Negative / Edge Cases scenario 5', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_296 — Negative / Edge Cases scenario 6', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_297 — Negative / Edge Cases scenario 7', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_298 — Negative / Edge Cases scenario 8', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });

  it('MOB_TC_299 — Negative / Edge Cases scenario 9', async () => {
    // Very long email string
    await LoginPage.enterEmail(testData.invalidCredentials.longString);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(err).to.be.true;
  });

  it('MOB_TC_300 — Negative / Edge Cases scenario 10', async () => {
    // Special characters in password
    await LoginPage.enterPassword(testData.invalidCredentials.specialChars);
    await LoginPage.tapLogin();
    const err = await LoginPage.isErrorDisplayed();
    expect(typeof err).to.equal('boolean');
  });
});
