/**
 * Student Board Page — StudentBoardScreen.js Page Object
 */
const BasePage = require('./BasePage');

class StudentBoardPage extends BasePage {
  get readyToBoardTitle() { return $('//*[@text="Ready to Board?"]'); }
  get boardBusButton() { return $('//*[@text="Board Bus"]'); }
  get goBackLink() { return $('//*[@text="← Go Back"]'); }
  get otpInput() { return $('//android.widget.EditText'); } // TODO: confirm selector — hidden input
  get verifyButton() { return $('//*[@text="Verify and Board"]'); }
  get enterOTPTitle() { return $('//*[@text="Enter OTP"]'); }
  get otpSubText() { return $('//*[contains(@text,"4-digit OTP")]'); }
  get verifyingText() { return $('//*[@text="Verifying OTP…"]'); }
  get checkingText() { return $('//*[@text="Checking trip status…"]'); }
  get noActiveTripTitle() { return $('//*[@text="No Active Trip"]'); }
  get alreadyBoardedTitle() { return $('//*[@text="Already Boarded"]'); }
  get boardingConfirmedTitle() { return $('//*[@text="Boarding Confirmed"]'); }
  get tooManyAttemptsTitle() { return $('//*[@text="Too Many Attempts"]'); }
  get somethingWentWrongTitle() { return $('//*[@text="Something Went Wrong"]'); }
  get backButton() { return $('//*[@text="Back"]'); }
  get tryAgainButton() { return $('//*[@text="Try Again"]'); }
  get backToHomeButton() { return $('//*[@text="Back to Home"]'); }
  get otpErrorText() { return $('//*[contains(@text,"Wrong OTP") or contains(@text,"expired")]'); }
  get attemptsText() { return $('//*[contains(@text,"attempt")]'); }
  get tripActiveText() { return $('//*[@text="Trip Active"]'); }
  get verifyBackButton() { return $('//android.view.ViewGroup/android.widget.TextView[@text="arrow-back"]'); } // TODO: confirm selector

  async isReadyToBoardDisplayed() {
    return this.isTextDisplayed('Ready to Board?', 10000);
  }

  async tapBoardBus() {
    const el = await this.boardBusButton;
    await el.click();
  }

  async enterOTP(otp) {
    const el = await this.otpInput;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.setValue(otp);
  }

  async tapVerify() {
    const el = await this.verifyButton;
    await el.click();
  }

  async enterAndVerifyOTP(otp) {
    await this.enterOTP(otp);
    await this.tapVerify();
  }

  async tapGoBack() {
    const el = await this.goBackLink;
    await el.click();
  }

  async isOTPScreenDisplayed() {
    return this.isTextDisplayed('Enter OTP', 10000);
  }

  async isNoActiveTripDisplayed() {
    return this.isTextDisplayed('No Active Trip', 5000);
  }

  async isAlreadyBoardedDisplayed() {
    return this.isTextDisplayed('Already Boarded', 5000);
  }

  async isBoardingConfirmedDisplayed() {
    return this.isTextDisplayed('Boarding Confirmed', 10000);
  }

  async isBlockedDisplayed() {
    return this.isTextDisplayed('Too Many Attempts', 5000);
  }

  async isErrorDisplayed() {
    return this.isTextDisplayed('Something Went Wrong', 5000);
  }

  async getOTPError() {
    try {
      const el = await this.otpErrorText;
      return await el.getText();
    } catch { return null; }
  }

  async getRemainingAttempts() {
    try {
      const el = await this.attemptsText;
      const text = await el.getText();
      const match = text.match(/(\d+)\s+attempt/);
      return match ? parseInt(match[1]) : null;
    } catch { return null; }
  }

  async isTripInfoCardVisible() {
    return this.isTextDisplayed('Trip Active', 5000);
  }

  async isVerifyButtonEnabled() {
    try {
      const el = await this.verifyButton;
      return await el.isEnabled();
    } catch { return false; }
  }
}

module.exports = new StudentBoardPage();
