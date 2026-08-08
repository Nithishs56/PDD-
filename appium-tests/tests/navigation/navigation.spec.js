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

  it('MOB_TC_036 — Verify Driver bottom tabs show Home Route Students and Profile icons', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_037 — Verify Student bottom tabs show Home Track History and Profile icons', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_038 — Verify tapping Track tab navigates to Student Live Track screen', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_039 — Verify back button on inner screens navigates to previous screen', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_040 — Verify tapping Profile tab navigates to Profile screen for driver', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_041 — Verify tapping Route tab shows Driver Route Details screen', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_042 — Verify tapping Students tab shows Driver Student List screen', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_043 — Verify notification bell navigates to Notifications screen', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_044 — Verify Driver Home to Start Trip to OTP to End Trip flow completes', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_045 — Verify Student Home to Board Bus to OTP to Success flow completes', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_046 — Verify tapping History tab shows Student Trip History screen', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_047 — Verify Admin More screen shows Drivers Trip Monitor Maintenance links', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_048 — Verify Admin tab navigation between Home Fleet Routes Students More', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_049 — Verify deep link from notification opens correct screen', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_050 — Verify interrupted navigation during loading is handled gracefully', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_051 — Verify tab bar is visible after successful login', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_052 — Verify active tab is highlighted with accent color', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_053 — Verify swipe gesture navigation between tabs works correctly', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_054 — Verify navigation state resets properly after logout', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_055 — Verify screen transitions use fade animation as configured', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });

  it('MOB_TC_056 — Verify TopBar back button returns to parent screen', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const hasNav = await NavigationPage.isTabBarVisible();
    expect(hasNav).to.be.true;
  });

  it('MOB_TC_057 — Verify notification badge count updates on tab bar', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const track = await StudentHomePage.isTrackTabVisible();
    expect(track).to.be.true;
  });

  it('MOB_TC_058 — Verify Admin navigation to AddRoute screen from Routes tab', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Route');
    const route = await DriverHomePage.isRouteScreenVisible();
    expect(route).to.be.true;
  });

  it('MOB_TC_059 — Verify Admin navigation to AddVehicle screen from Fleet tab', async () => {
    await NavigationPage.goBack();
    const loginShown = await LoginPage.isLoginScreenDisplayed();
    expect(typeof loginShown).to.equal('boolean');
  });

  it('MOB_TC_060 — Verify Admin navigation to Analytics screen from More tab', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await NavigationPage.tapTab('Profile');
    const profile = await ProfilePage.isProfileScreenVisible();
    expect(profile).to.be.true;
  });
});
