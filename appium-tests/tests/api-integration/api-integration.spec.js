/**
 * FleetSync Appium E2E — Backend API Integration
 * Auto-generated test suite: 25 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage   = require('../../pages/DriverHomePage');
const StudentHomePage  = require('../../pages/StudentHomePage');
const ProfilePage      = require('../../pages/ProfilePage');
const StudentHistoryPage = require('../../pages/StudentHistoryPage');

describe('Backend API Integration', () => {

  it('MOB_TC_186 — Backend API Integration scenario 1', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    // API data should have loaded
    const routeLoaded = await DriverHomePage.isRouteLoaded();
    expect(routeLoaded).to.be.true;
  });

  it('MOB_TC_187 — Backend API Integration scenario 2', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busLoaded = await StudentHomePage.isBusDataLoaded();
    expect(busLoaded).to.be.true;
  });

  it('MOB_TC_188 — Backend API Integration scenario 3', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tripData = await DriverHomePage.getTripData();
    expect(tripData).to.not.be.null;
  });

  it('MOB_TC_189 — Backend API Integration scenario 4', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const history = await StudentHistoryPage.getTripHistory();
    expect(Array.isArray(history)).to.be.true;
  });

  it('MOB_TC_190 — Backend API Integration scenario 5', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const profile = await ProfilePage.getProfileData();
    expect(profile).to.have.property('email');
  });

  it('MOB_TC_191 — Backend API Integration scenario 6', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    // API data should have loaded
    const routeLoaded = await DriverHomePage.isRouteLoaded();
    expect(routeLoaded).to.be.true;
  });

  it('MOB_TC_192 — Backend API Integration scenario 7', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busLoaded = await StudentHomePage.isBusDataLoaded();
    expect(busLoaded).to.be.true;
  });

  it('MOB_TC_193 — Backend API Integration scenario 8', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tripData = await DriverHomePage.getTripData();
    expect(tripData).to.not.be.null;
  });

  it('MOB_TC_194 — Backend API Integration scenario 9', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const history = await StudentHistoryPage.getTripHistory();
    expect(Array.isArray(history)).to.be.true;
  });

  it('MOB_TC_195 — Backend API Integration scenario 10', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const profile = await ProfilePage.getProfileData();
    expect(profile).to.have.property('email');
  });

  it('MOB_TC_196 — Backend API Integration scenario 11', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    // API data should have loaded
    const routeLoaded = await DriverHomePage.isRouteLoaded();
    expect(routeLoaded).to.be.true;
  });

  it('MOB_TC_197 — Backend API Integration scenario 12', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busLoaded = await StudentHomePage.isBusDataLoaded();
    expect(busLoaded).to.be.true;
  });

  it('MOB_TC_198 — Backend API Integration scenario 13', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tripData = await DriverHomePage.getTripData();
    expect(tripData).to.not.be.null;
  });

  it('MOB_TC_199 — Backend API Integration scenario 14', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const history = await StudentHistoryPage.getTripHistory();
    expect(Array.isArray(history)).to.be.true;
  });

  it('MOB_TC_200 — Backend API Integration scenario 15', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const profile = await ProfilePage.getProfileData();
    expect(profile).to.have.property('email');
  });

  it('MOB_TC_201 — Backend API Integration scenario 16', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    // API data should have loaded
    const routeLoaded = await DriverHomePage.isRouteLoaded();
    expect(routeLoaded).to.be.true;
  });

  it('MOB_TC_202 — Backend API Integration scenario 17', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busLoaded = await StudentHomePage.isBusDataLoaded();
    expect(busLoaded).to.be.true;
  });

  it('MOB_TC_203 — Backend API Integration scenario 18', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tripData = await DriverHomePage.getTripData();
    expect(tripData).to.not.be.null;
  });

  it('MOB_TC_204 — Backend API Integration scenario 19', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const history = await StudentHistoryPage.getTripHistory();
    expect(Array.isArray(history)).to.be.true;
  });

  it('MOB_TC_205 — Backend API Integration scenario 20', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const profile = await ProfilePage.getProfileData();
    expect(profile).to.have.property('email');
  });

  it('MOB_TC_206 — Backend API Integration scenario 21', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    // API data should have loaded
    const routeLoaded = await DriverHomePage.isRouteLoaded();
    expect(routeLoaded).to.be.true;
  });

  it('MOB_TC_207 — Backend API Integration scenario 22', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busLoaded = await StudentHomePage.isBusDataLoaded();
    expect(busLoaded).to.be.true;
  });

  it('MOB_TC_208 — Backend API Integration scenario 23', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tripData = await DriverHomePage.getTripData();
    expect(tripData).to.not.be.null;
  });

  it('MOB_TC_209 — Backend API Integration scenario 24', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const history = await StudentHistoryPage.getTripHistory();
    expect(Array.isArray(history)).to.be.true;
  });

  it('MOB_TC_210 — Backend API Integration scenario 25', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const profile = await ProfilePage.getProfileData();
    expect(profile).to.have.property('email');
  });
});
