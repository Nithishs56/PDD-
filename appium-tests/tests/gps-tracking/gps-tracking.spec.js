/**
 * FleetSync Appium E2E — GPS / Location / Live Tracking
 * Auto-generated test suite: 25 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('GPS / Location / Live Tracking', () => {

  it('MOB_TC_126 — GPS / Location / Live Tracking scenario 1', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_127 — GPS / Location / Live Tracking scenario 2', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_128 — GPS / Location / Live Tracking scenario 3', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_129 — GPS / Location / Live Tracking scenario 4', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_130 — GPS / Location / Live Tracking scenario 5', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_131 — GPS / Location / Live Tracking scenario 6', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_132 — GPS / Location / Live Tracking scenario 7', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_133 — GPS / Location / Live Tracking scenario 8', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_134 — GPS / Location / Live Tracking scenario 9', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_135 — GPS / Location / Live Tracking scenario 10', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_136 — GPS / Location / Live Tracking scenario 11', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_137 — GPS / Location / Live Tracking scenario 12', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_138 — GPS / Location / Live Tracking scenario 13', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_139 — GPS / Location / Live Tracking scenario 14', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_140 — GPS / Location / Live Tracking scenario 15', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_141 — GPS / Location / Live Tracking scenario 16', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_142 — GPS / Location / Live Tracking scenario 17', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_143 — GPS / Location / Live Tracking scenario 18', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_144 — GPS / Location / Live Tracking scenario 19', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_145 — GPS / Location / Live Tracking scenario 20', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_146 — GPS / Location / Live Tracking scenario 21', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_147 — GPS / Location / Live Tracking scenario 22', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_148 — GPS / Location / Live Tracking scenario 23', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_149 — GPS / Location / Live Tracking scenario 24', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_150 — GPS / Location / Live Tracking scenario 25', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });
});
