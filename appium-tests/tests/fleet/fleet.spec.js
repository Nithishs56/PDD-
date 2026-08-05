/**
 * FleetSync Appium E2E — Fleet / Vehicle Core Features
 * Auto-generated test suite: 35 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('Fleet / Vehicle Core Features', () => {

  it('MOB_TC_091 — Fleet / Vehicle Core Features scenario 1', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_092 — Fleet / Vehicle Core Features scenario 2', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_093 — Fleet / Vehicle Core Features scenario 3', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_094 — Fleet / Vehicle Core Features scenario 4', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_095 — Fleet / Vehicle Core Features scenario 5', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_096 — Fleet / Vehicle Core Features scenario 6', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_097 — Fleet / Vehicle Core Features scenario 7', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_098 — Fleet / Vehicle Core Features scenario 8', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_099 — Fleet / Vehicle Core Features scenario 9', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_100 — Fleet / Vehicle Core Features scenario 10', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_101 — Fleet / Vehicle Core Features scenario 11', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_102 — Fleet / Vehicle Core Features scenario 12', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_103 — Fleet / Vehicle Core Features scenario 13', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_104 — Fleet / Vehicle Core Features scenario 14', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_105 — Fleet / Vehicle Core Features scenario 15', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_106 — Fleet / Vehicle Core Features scenario 16', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_107 — Fleet / Vehicle Core Features scenario 17', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_108 — Fleet / Vehicle Core Features scenario 18', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_109 — Fleet / Vehicle Core Features scenario 19', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_110 — Fleet / Vehicle Core Features scenario 20', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_111 — Fleet / Vehicle Core Features scenario 21', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_112 — Fleet / Vehicle Core Features scenario 22', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_113 — Fleet / Vehicle Core Features scenario 23', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_114 — Fleet / Vehicle Core Features scenario 24', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_115 — Fleet / Vehicle Core Features scenario 25', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_116 — Fleet / Vehicle Core Features scenario 26', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_117 — Fleet / Vehicle Core Features scenario 27', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_118 — Fleet / Vehicle Core Features scenario 28', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_119 — Fleet / Vehicle Core Features scenario 29', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_120 — Fleet / Vehicle Core Features scenario 30', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_121 — Fleet / Vehicle Core Features scenario 31', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_122 — Fleet / Vehicle Core Features scenario 32', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_123 — Fleet / Vehicle Core Features scenario 33', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_124 — Fleet / Vehicle Core Features scenario 34', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_125 — Fleet / Vehicle Core Features scenario 35', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });
});
