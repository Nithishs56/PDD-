# FleetSync E2E Test Suite (Appium + WebdriverIO)

This directory contains the automated end-to-end (E2E) testing framework for the FleetSync PDD application, designed to run against Android, iOS, and Web platforms using Appium and WebdriverIO.

## Prerequisites

1. **Node.js**: v18+ recommended
2. **Appium 2.x**: Installed globally (`npm install -g appium`)
3. **Appium Drivers**:
   - `appium driver install uiautomator2` (for Android)
   - `appium driver install xcuitest` (for iOS)
4. **Android SDK / Emulator**: Required for Android tests
5. **Xcode / Simulator**: Required for iOS tests (macOS only)

## Setup & Installation

Run the following command from the root of the repository to install test dependencies:

```bash
npm install
```

Start the Appium Server:

```bash
appium
```

## Running Tests

From the project root directory, use the following npm scripts:

- **Run Android Tests**: `npm run test:android`
- **Run iOS Tests**: `npm run test:ios`
- **Run Web Tests**: `npm run test:web`
- **Run All Tests**: `npm run test:all`

## Reporting

After running tests, a detailed Excel report will be generated.
You can manually trigger report generation using:

```bash
npm run test:report
```

The resulting `appium-test-report.xlsx` is saved to `Vulnerability Test Results/appium-test-report.xlsx`.
