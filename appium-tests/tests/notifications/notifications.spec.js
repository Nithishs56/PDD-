/**
 * FleetSync Appium E2E — Push Notifications
 * Auto-generated test suite: 15 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('Push Notifications', () => {

  it('MOB_TC_151 — Push Notifications scenario 1', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_152 — Push Notifications scenario 2', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_153 — Push Notifications scenario 3', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_154 — Push Notifications scenario 4', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_155 — Push Notifications scenario 5', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_156 — Push Notifications scenario 6', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_157 — Push Notifications scenario 7', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_158 — Push Notifications scenario 8', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_159 — Push Notifications scenario 9', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_160 — Push Notifications scenario 10', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_161 — Push Notifications scenario 11', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_162 — Push Notifications scenario 12', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_163 — Push Notifications scenario 13', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_164 — Push Notifications scenario 14', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_165 — Push Notifications scenario 15', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });
});
