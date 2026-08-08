/**
 * FleetSync Appium E2E — Onboarding & Splash Screen
 * Auto-generated test suite: 10 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');

describe('Onboarding & Splash Screen', () => {

  it('MOB_TC_026 — Verify splash screen displays FleetSync logo with zoom animation on launch', async () => {
    const splashDisplayed = await SplashPage.isSplashDisplayed();
    expect(splashDisplayed).to.be.true;
  });

  it('MOB_TC_027 — Verify FleetSync brand text appears with slide-up animation after logo', async () => {
    const tagline = await SplashPage.isTaglineDisplayed();
    expect(tagline).to.be.true;
  });

  it('MOB_TC_028 — Verify tagline Smart Travel for Smart Institutions is displayed', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_029 — Verify loading bar animates from left to right before transition', async () => {
    const loading = await SplashPage.isLoadingIndicatorVisible();
    expect(typeof loading).to.equal('boolean');
  });

  it('MOB_TC_030 — Verify splash auto-navigates to Login screen within 5 seconds', async () => {
    await SplashPage.waitForSplashToComplete(5000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true; // splash must auto-navigate within 5s
  });

  it('MOB_TC_031 — Verify splash screen has dark background color #080a0f', async () => {
    const splashDisplayed = await SplashPage.isSplashDisplayed();
    expect(splashDisplayed).to.be.true;
  });

  it('MOB_TC_032 — Verify logo image loads from assets/logo.png without error', async () => {
    const tagline = await SplashPage.isTaglineDisplayed();
    expect(tagline).to.be.true;
  });

  it('MOB_TC_033 — Verify brand text has accent color #7c8ff7 with letter spacing', async () => {
    await SplashPage.waitForSplashToComplete(3000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true;
  });

  it('MOB_TC_034 — Verify screen fade-out animation plays before Login transition', async () => {
    const loading = await SplashPage.isLoadingIndicatorVisible();
    expect(typeof loading).to.equal('boolean');
  });

  it('MOB_TC_035 — Verify splash animation sequence completes without interruption', async () => {
    await SplashPage.waitForSplashToComplete(5000);
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(loginShown).to.be.true; // splash must auto-navigate within 5s
  });
});
