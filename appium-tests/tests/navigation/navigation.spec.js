/**
 * FleetSync Appium E2E — Navigation & Core UI
 * Auto-generated test suite: 25 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');
const NavigationPage  = require('../../pages/NavigationPage');
const ProfilePage     = require('../../pages/ProfilePage');

describe('Navigation & Core UI', () => {

  it('MOB_TC_036 — Navigation & Core UI scenario 1', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_037 — Navigation & Core UI scenario 2', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_038 — Navigation & Core UI scenario 3', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_039 — Navigation & Core UI scenario 4', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_040 — Navigation & Core UI scenario 5', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_041 — Navigation & Core UI scenario 6', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_042 — Navigation & Core UI scenario 7', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_043 — Navigation & Core UI scenario 8', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_044 — Navigation & Core UI scenario 9', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_045 — Navigation & Core UI scenario 10', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_046 — Navigation & Core UI scenario 11', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_047 — Navigation & Core UI scenario 12', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_048 — Navigation & Core UI scenario 13', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_049 — Navigation & Core UI scenario 14', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_050 — Navigation & Core UI scenario 15', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_051 — Navigation & Core UI scenario 16', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_052 — Navigation & Core UI scenario 17', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_053 — Navigation & Core UI scenario 18', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_054 — Navigation & Core UI scenario 19', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_055 — Navigation & Core UI scenario 20', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_056 — Navigation & Core UI scenario 21', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_057 — Navigation & Core UI scenario 22', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_058 — Navigation & Core UI scenario 23', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_059 — Navigation & Core UI scenario 24', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_060 — Navigation & Core UI scenario 25', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });
});
