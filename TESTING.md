# Testing Guide

The FleetSync project employs a comprehensive testing strategy utilizing Appium and WebdriverIO to guarantee application stability across Android, iOS, and Web platforms.

## CI/CD Integration

Automated tests are wired into GitHub Actions (`.github/workflows/appium-e2e-tests.yml`). 
The pipeline triggers automatically on:
- Pushes to main branches
- Pull Requests
- Manual dispatches

### Workflow Details
1. **Environment Setup**: Provisions a Node.js environment and installs Appium along with necessary UI drivers.
2. **Android Tests**: Boots a headless Android emulator using `reactivecircus/android-emulator-runner` and executes the Android E2E suite.
3. **Web Tests**: Builds the Expo web version and runs tests headless using ChromeDriver.
4. **Report Generation**: Consolidates results from both platforms and executes the `generateExcelReport.js` utility.
5. **Artifacts & Summary**: Uploads the `appium-test-report.xlsx` as a downloadable artifact and presents a summarized pass/fail matrix via `$GITHUB_STEP_SUMMARY`. The CI job will fail if the overall pass rate drops beneath 80% or any Priority 1 (P1) tests fail.

## How to Read the Test Report

The generated `appium-test-report.xlsx` (found under the `Vulnerability Test Results/` directory or as a CI artifact) contains multiple sheets:

- **Test Summary**: Provides a high-level overview of total tests, passed, failed, skipped, and overall percentage.
- **Test Case Details**: A granular breakdown containing Test IDs, module assignments, execution durations, platform details, pass/fail status, and stack traces/errors for failed scenarios.

For instructions on running tests locally, see the `appium-tests/README.md`.
