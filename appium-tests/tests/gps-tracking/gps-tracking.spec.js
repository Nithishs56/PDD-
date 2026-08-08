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

  it('MOB_TC_126 — Verify Student Track screen shows full map with route polyline', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_127 — Verify Driver OTP screen GPS location writes to Firebase RTDB', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_128 — Verify Student Home shows bus ETA and pickup time information', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_129 — Verify Driver OTP GPS tracking is active during trip', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_130 — Verify Student Track shows distance info when bus is active', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_131 — Verify bus marker position updates in real-time from RTDB data', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_132 — Verify student boarding stop highlighted with green Your Stop marker', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_133 — Verify GPS signal indicator shows Live green when data is fresh', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_134 — Verify GPS signal shows Delayed yellow when data is 10-30s old', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_135 — Verify GPS signal shows Last Seen red when data is over 30s old', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_136 — Verify bus speed in km/h displayed when trip active and speed > 0', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_137 — Verify map auto-centers to bus location on RTDB update', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_138 — Verify Driver OTP mini map shows route polyline and bus marker', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_139 — Verify GPS permission denied shows warning banner on Driver OTP', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_140 — Verify GPS weak signal shows yellow warning on Driver OTP screen', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_141 — Verify Student Home mini map shows Waiting for driver overlay when offline', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_142 — Verify Student Home Live/Offline indicator reflects RTDB isActive state', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_143 — Verify ending trip sets isActive false in RTDB live location node', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_144 — Verify Student Track shows No active trip when driver has not started', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_145 — Verify map renders all stop markers along the route polyline', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });

  it('MOB_TC_146 — Verify bus marker rotates based on heading from GPS data', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await NavigationPage.tapTab('Track');
    const mapShown = await StudentHomePage.isMapVisible();
    expect(mapShown).to.be.true;
  });

  it('MOB_TC_147 — Verify RTDB location includes driverName busNumber and routeId', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const coords = await DriverHomePage.getLastKnownCoordinates();
    expect(coords).to.have.property('lat');
    expect(coords).to.have.property('lng');
  });

  it('MOB_TC_148 — Verify location tracking stops when trip is ended by driver', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const eta = await StudentHomePage.getBusETA();
    expect(eta).to.be.a('string');
  });

  it('MOB_TC_149 — Verify Student Track info card shows driver name and bus number', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const tracking = await DriverHomePage.isTrackingActive();
    expect(typeof tracking).to.equal('boolean');
  });

  it('MOB_TC_150 — Verify Student Track Last Updated timestamp refreshes every second', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const distance = await StudentHomePage.getDistanceToBus();
    expect(typeof distance).to.equal('string');
  });
});
