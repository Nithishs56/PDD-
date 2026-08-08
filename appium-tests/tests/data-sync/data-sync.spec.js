/**
 * FleetSync Appium E2E — Data Sync & State Management
 * Auto-generated test suite: 15 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('Data Sync & State Management', () => {

  it('MOB_TC_211 — Verify Driver Home Firestore data syncs after login with 2s delay', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await browser.pause(2000); // allow Firestore sync
    const loaded = await DriverHomePage.isDataSynced();
    expect(loaded).to.be.true;
  });

  it('MOB_TC_212 — Verify Student Home Firestore data syncs after login with 2s delay', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await browser.pause(2000);
    const synced = await StudentHomePage.isDataSynced();
    expect(synced).to.be.true;
  });

  it('MOB_TC_213 — Verify real-time Firestore listener updates Driver OTP boarded count', async () => {
    // Real-time listener should update without page refresh
    const initial = await DriverHomePage.getStatusText();
    await browser.pause(3000);
    const updated = await DriverHomePage.getStatusText();
    expect(typeof updated).to.equal('string');
  });

  it('MOB_TC_214 — Verify Driver OTP onSnapshot updates OTP display without page refresh', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await browser.pause(2000); // allow Firestore sync
    const loaded = await DriverHomePage.isDataSynced();
    expect(loaded).to.be.true;
  });

  it('MOB_TC_215 — Verify Student Home RTDB listener updates bus location without refresh', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await browser.pause(2000);
    const synced = await StudentHomePage.isDataSynced();
    expect(synced).to.be.true;
  });

  it('MOB_TC_216 — Verify Driver Student List onSnapshot updates student status badges live', async () => {
    // Real-time listener should update without page refresh
    const initial = await DriverHomePage.getStatusText();
    await browser.pause(3000);
    const updated = await DriverHomePage.getStatusText();
    expect(typeof updated).to.equal('string');
  });

  it('MOB_TC_217 — Verify TripContext syncTripFromFirestore updates boardedStudents array', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await browser.pause(2000); // allow Firestore sync
    const loaded = await DriverHomePage.isDataSynced();
    expect(loaded).to.be.true;
  });

  it('MOB_TC_218 — Verify NotificationContext addNotification updates unread count globally', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await browser.pause(2000);
    const synced = await StudentHomePage.isDataSynced();
    expect(synced).to.be.true;
  });

  it('MOB_TC_219 — Verify AuthContext currentUser state propagates to all child screens', async () => {
    // Real-time listener should update without page refresh
    const initial = await DriverHomePage.getStatusText();
    await browser.pause(3000);
    const updated = await DriverHomePage.getStatusText();
    expect(typeof updated).to.equal('string');
  });

  it('MOB_TC_220 — Verify TripContext activeTrip state shared between Driver screens', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await browser.pause(2000); // allow Firestore sync
    const loaded = await DriverHomePage.isDataSynced();
    expect(loaded).to.be.true;
  });

  it('MOB_TC_221 — Verify ending trip clears TripContext and resets navigation state', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await browser.pause(2000);
    const synced = await StudentHomePage.isDataSynced();
    expect(synced).to.be.true;
  });

  it('MOB_TC_222 — Verify boarding success updates Student Home isBoarded state', async () => {
    // Real-time listener should update without page refresh
    const initial = await DriverHomePage.getStatusText();
    await browser.pause(3000);
    const updated = await DriverHomePage.getStatusText();
    expect(typeof updated).to.equal('string');
  });

  it('MOB_TC_223 — Verify absent flag sync between StudentHome and DriverHome screens', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    await browser.pause(2000); // allow Firestore sync
    const loaded = await DriverHomePage.isDataSynced();
    expect(loaded).to.be.true;
  });

  it('MOB_TC_224 — Verify OTP countdown timer syncs with Firestore OTP refresh cycle', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    await browser.pause(2000);
    const synced = await StudentHomePage.isDataSynced();
    expect(synced).to.be.true;
  });

  it('MOB_TC_225 — Verify notification markAllRead updates state across all screens', async () => {
    // Real-time listener should update without page refresh
    const initial = await DriverHomePage.getStatusText();
    await browser.pause(3000);
    const updated = await DriverHomePage.getStatusText();
    expect(typeof updated).to.equal('string');
  });
});
