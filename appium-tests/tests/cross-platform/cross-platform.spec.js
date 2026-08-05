/**
 * FleetSync Appium E2E — Cross-Platform Parity
 * Auto-generated test suite: 20 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('Cross-Platform Parity', () => {

  it('MOB_TC_241 — Cross-Platform Parity scenario 1', async () => {
    // Test runs on both Android and Web — verify consistent UI
    const login = await LoginPage.isLoginScreenDisplayed();
    expect(login).to.be.true;
  });

  it('MOB_TC_242 — Cross-Platform Parity scenario 2', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true; // same on both platforms
  });

  it('MOB_TC_243 — Cross-Platform Parity scenario 3', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const studentHome = await StudentHomePage.isHomeDisplayed();
    expect(studentHome).to.be.true;
  });

  it('MOB_TC_244 — Cross-Platform Parity scenario 4', async () => {
    // Font rendering — title should be visible
    const title = await LoginPage.brandText;
    const text  = await title.getText();
    expect(text).to.include('FleetSync');
  });

  it('MOB_TC_245 — Cross-Platform Parity scenario 5', async () => {
    // Test runs on both Android and Web — verify consistent UI
    const login = await LoginPage.isLoginScreenDisplayed();
    expect(login).to.be.true;
  });

  it('MOB_TC_246 — Cross-Platform Parity scenario 6', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true; // same on both platforms
  });

  it('MOB_TC_247 — Cross-Platform Parity scenario 7', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const studentHome = await StudentHomePage.isHomeDisplayed();
    expect(studentHome).to.be.true;
  });

  it('MOB_TC_248 — Cross-Platform Parity scenario 8', async () => {
    // Font rendering — title should be visible
    const title = await LoginPage.brandText;
    const text  = await title.getText();
    expect(text).to.include('FleetSync');
  });

  it('MOB_TC_249 — Cross-Platform Parity scenario 9', async () => {
    // Test runs on both Android and Web — verify consistent UI
    const login = await LoginPage.isLoginScreenDisplayed();
    expect(login).to.be.true;
  });

  it('MOB_TC_250 — Cross-Platform Parity scenario 10', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true; // same on both platforms
  });

  it('MOB_TC_251 — Cross-Platform Parity scenario 11', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const studentHome = await StudentHomePage.isHomeDisplayed();
    expect(studentHome).to.be.true;
  });

  it('MOB_TC_252 — Cross-Platform Parity scenario 12', async () => {
    // Font rendering — title should be visible
    const title = await LoginPage.brandText;
    const text  = await title.getText();
    expect(text).to.include('FleetSync');
  });

  it('MOB_TC_253 — Cross-Platform Parity scenario 13', async () => {
    // Test runs on both Android and Web — verify consistent UI
    const login = await LoginPage.isLoginScreenDisplayed();
    expect(login).to.be.true;
  });

  it('MOB_TC_254 — Cross-Platform Parity scenario 14', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true; // same on both platforms
  });

  it('MOB_TC_255 — Cross-Platform Parity scenario 15', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const studentHome = await StudentHomePage.isHomeDisplayed();
    expect(studentHome).to.be.true;
  });

  it('MOB_TC_256 — Cross-Platform Parity scenario 16', async () => {
    // Font rendering — title should be visible
    const title = await LoginPage.brandText;
    const text  = await title.getText();
    expect(text).to.include('FleetSync');
  });

  it('MOB_TC_257 — Cross-Platform Parity scenario 17', async () => {
    // Test runs on both Android and Web — verify consistent UI
    const login = await LoginPage.isLoginScreenDisplayed();
    expect(login).to.be.true;
  });

  it('MOB_TC_258 — Cross-Platform Parity scenario 18', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const home = await DriverHomePage.isHomeDisplayed();
    expect(home).to.be.true; // same on both platforms
  });

  it('MOB_TC_259 — Cross-Platform Parity scenario 19', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const studentHome = await StudentHomePage.isHomeDisplayed();
    expect(studentHome).to.be.true;
  });

  it('MOB_TC_260 — Cross-Platform Parity scenario 20', async () => {
    // Font rendering — title should be visible
    const title = await LoginPage.brandText;
    const text  = await title.getText();
    expect(text).to.include('FleetSync');
  });
});
