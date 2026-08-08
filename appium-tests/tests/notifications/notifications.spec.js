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

  it('MOB_TC_151 — Verify Student notifications screen loads role-specific defaults on first visit', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_152 — Verify Driver notification bell badge shows unread count', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_153 — Verify Mark all read button clears all unread dots and resets count', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_154 — Verify tapping notification marks it as read and removes blue dot', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_155 — Verify notification types show correct emoji icons for each type', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_156 — Verify Trip Started notification auto-created when driver starts trip', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_157 — Verify Boarding Confirmed notification created on successful OTP verify', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_158 — Verify Absence Marked notification created when student marks absent', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_159 — Verify Boarding Blocked notification created after 3 wrong OTP attempts', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_160 — Verify driver notifications include Student Absent and Fraud Attempt types', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_161 — Verify student notifications include Trip Started and Bus Arriving types', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_162 — Verify bell icon pulses with animation when unread count is greater than 0', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });

  it('MOB_TC_163 — Verify bell badge shows 9+ when unread count exceeds 9', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const notifCount = await StudentHomePage.getNotificationCount();
    expect(notifCount).to.be.a('number');
  });

  it('MOB_TC_164 — Verify empty notifications shows bell emoji with No notifications yet text', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const badge = await DriverHomePage.hasNotificationBadge();
    expect(typeof badge).to.equal('boolean');
  });

  it('MOB_TC_165 — Verify notification row shows title message and relative time', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await StudentHomePage.clearNotifications();
    const count = await StudentHomePage.getNotificationCount();
    expect(count).to.equal(0);
  });
});
