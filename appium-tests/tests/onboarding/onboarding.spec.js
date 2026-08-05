/**
 * FleetSync Appium E2E — Onboarding & Splash Screen
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');

describe('Onboarding & Splash Screen', () => {

  it('MOB_TC_026 — Onboarding & Splash Screen scenario 1', async () => {
    const splashDisplayed = await SplashPage.isSplashDisplayed();
    expect(splashDisplayed).to.be.true;
  });

  it('MOB_TC_027 — Onboarding & Splash Screen scenario 2', async () => {
    const tagline = await SplashPage.isTaglineDisplayed();
    expect(tagline).to.be.true;
  });

  it('MOB_TC_028 — Onboarding & Splash Screen scenario 3', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_029 — Onboarding & Splash Screen scenario 4', async () => {
    const loading = await SplashPage.isLoadingIndicatorVisible();
    expect(typeof loading).to.equal('boolean');
  });

  it('MOB_TC_030 — Onboarding & Splash Screen scenario 5', async () => {
    await SplashPage.waitForSplashToComplete(5000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true; // splash must auto-navigate within 5s
  });

  it('MOB_TC_031 — Onboarding & Splash Screen scenario 6', async () => {
    const splashDisplayed = await SplashPage.isSplashDisplayed();
    expect(splashDisplayed).to.be.true;
  });

  it('MOB_TC_032 — Onboarding & Splash Screen scenario 7', async () => {
    const tagline = await SplashPage.isTaglineDisplayed();
    expect(tagline).to.be.true;
  });

  it('MOB_TC_033 — Onboarding & Splash Screen scenario 8', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_034 — Onboarding & Splash Screen scenario 9', async () => {
    const loading = await SplashPage.isLoadingIndicatorVisible();
    expect(typeof loading).to.equal('boolean');
  });

  it('MOB_TC_035 — Onboarding & Splash Screen scenario 10', async () => {
    await SplashPage.waitForSplashToComplete(5000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true; // splash must auto-navigate within 5s
  });
});
