/**
 * Login Page — FleetSync login screen
 * Based on screens/LoginScreen.js analysis
 */
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  // Selectors derived from LoginScreen.js
  get emailInput() { return $('//android.widget.EditText[@hint="you@cit.edu" or @text="you@cit.edu"]'); } // TODO: confirm selector
  get passwordInput() { return $('//android.widget.EditText[@hint="••••••••" or @password="true"]'); } // TODO: confirm selector
  get loginButton() { return $('//*[@text="Login"]'); } // TODO: confirm selector
  get showPasswordToggle() { return $('//android.view.ViewGroup[contains(@content-desc,"eye")]'); } // TODO: confirm selector
  get brandText() { return $('//*[@text="FleetSync"]'); } // TODO: confirm selector
  get brandSubText() { return $('//*[@text="Smart Fleet Management System"]'); } // TODO: confirm selector
  get signInTitle() { return $('//*[@text="Sign In"]'); } // TODO: confirm selector
  get signInSubtitle() { return $('//*[@text="Sign in to your account"]'); } // TODO: confirm selector
  get emailLabel() { return $('//*[@text="Email Address"]'); } // TODO: confirm selector
  get passwordLabel() { return $('//*[@text="Password"]'); } // TODO: confirm selector
  get errorMessage() { return $('//*[contains(@text,"Invalid") or contains(@text,"Please enter") or contains(@text,"failed")]'); } // TODO: confirm selector
  get loadingSpinner() { return $('//android.widget.ProgressBar'); } // TODO: confirm selector

  async enterEmail(email) {
    const el = await this.emailInput;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.clearValue();
    await el.setValue(email);
  }

  async enterPassword(password) {
    const el = await this.passwordInput;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.clearValue();
    await el.setValue(password);
  }

  async tapLogin() {
    const el = await this.loginButton;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.click();
  }

  async togglePasswordVisibility() {
    const el = await this.showPasswordToggle;
    await el.click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.tapLogin();
  }

  async getErrorText() {
    try {
      const el = await this.errorMessage;
      await el.waitForDisplayed({ timeout: 5000 });
      return await el.getText();
    } catch {
      return null;
    }
  }

  async isLoginScreenDisplayed() {
    return this.isTextDisplayed('Sign In', 10000);
  }

  async isLoading() {
    try {
      const el = await this.loadingSpinner;
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  async isErrorDisplayed() {
    try {
      const el = await this.errorMessage;
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  async clearEmailField() {
    const el = await this.emailInput;
    await el.clearValue();
  }

  async clearPasswordField() {
    const el = await this.passwordInput;
    await el.clearValue();
  }
}

module.exports = new LoginPage();
