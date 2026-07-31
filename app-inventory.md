# FleetSync PDD — App Inventory (Phase 1 Discovery)

## 1. Stack Detection

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | React Native + Expo (SDK 54) | `expo: ~54.0.35`, React 19.1.0, RN 0.81.5 |
| **Backend** | Firebase (BaaS) | Firestore, Auth, Realtime Database — no Express/Node server |
| **Navigation** | React Navigation v7 | Native Stack + Bottom Tabs |
| **Maps** | react-native-maps 1.20.1 | MapView, Marker, Polyline |
| **Location** | expo-location ~19.0.8 | watchPositionAsync, foreground tracking |
| **Auth** | Firebase Auth | signInWithEmailAndPassword, onAuthStateChanged |
| **State** | React Context | AuthContext, TripContext, NotificationContext, ToastContext |
| **Storage** | AsyncStorage 2.2.0 | Firebase auth persistence |

## 2. User Roles

| Role | Navigation Root | Tab Screens |
|------|----------------|-------------|
| **Driver** | `DriverRoot` → DriverNavigator | Home, Students, Profile |
| **Student** | `StudentRoot` → StudentNavigator | Home, Track, History, Profile |
| **Admin** | *(blocked from mobile app — web portal only)* | Home, Fleet, Routes, Students, More |

## 3. Screen Inventory

### Auth Flow (Unauthenticated)

| Screen | File | Nav Route | Key Components |
|--------|------|-----------|----------------|
| Splash Screen | `screens/SplashScreen.js` | `Splash` | AppLogo, auto-redirect to Login after 2s |
| Login Screen | `screens/LoginScreen.js` | `Login` | Email TextInput, Password TextInput, show/hide toggle, Login button, error display |

### Driver Portal

| Screen | File | Nav Route | Key Components |
|--------|------|-----------|----------------|
| Driver Home | `screens/driver/DriverHomeScreen.js` | `DriverHome` | Welcome greeting, assignment card, absent students (Firestore live), upcoming stops timeline, Start Trip button, notification bell |
| Driver OTP | `screens/driver/DriverOTPScreen.js` | `DriverOTP` | OTP display (4 digits), countdown timer, refresh OTP, MapView with GPS, boarded students list, End Trip button |
| Driver Route | `screens/driver/DriverRouteScreen.js` | `DriverRoute` | Route timeline with stop progression |
| Driver Trip Summary | `screens/driver/DriverTripSummaryScreen.js` | `DriverTripSummary` | Trip info card, boarded/absent student lists, Submit & Close |
| Driver Student List | `screens/driver/DriverStudentListScreen.js` | `Students` (tab) | Search TextInput, student FlatList with status badges, count strip |
| Driver Profile | `screens/driver/DriverProfileScreen.js` | `Profile` (tab) | Avatar, info rows, Logout button |
| Notifications | `screens/NotificationsScreen.js` | `Notifications` | Notification list with unread badges |

### Student Portal

| Screen | File | Nav Route | Key Components |
|--------|------|-----------|----------------|
| Student Home | `screens/student/StudentHomeScreen.js` | `StudentHome` | Welcome, bus info card, mini MapView (RTDB live bus), Mark Absent button, Board Bus button, absent confirmation modal, notification bell |
| Student Board | `screens/student/StudentBoardScreen.js` | `StudentBoard` | Multi-screen flow: home→checking→OTP input→verifying→success/error/blocked/no_trip/already_boarded |
| Student Track | `screens/student/StudentTrackScreen.js` | `Track` (tab) | Full MapView with live bus marker, route polyline, stop markers, GPS signal indicator |
| Student History | `screens/student/StudentHistoryScreen.js` | `History` (tab) | Trip history FlatList, detail bottom sheet modal, absence history |
| Student Profile | `screens/student/StudentProfileScreen.js` | `Profile` (tab) | Avatar, info rows (roll, college, route, bus, stop, parent phone), Logout |
| Notifications | `screens/NotificationsScreen.js` | `Notifications` | Shared with driver |

### Admin Portal (defined in AdminNavigator but blocked by AuthContext for mobile)

| Screen | File | Nav Route | Key Components |
|--------|------|-----------|----------------|
| Admin Home | `screens/admin/AdminHomeScreen.js` | `Home` (tab) | Stats grid, today's trips, maintenance alerts |
| Admin Fleet | `screens/admin/AdminFleetScreen.js` | `Fleet` (tab) | Bus FlatList with status badges |
| Admin Routes | `screens/admin/AdminRouteScreen.js` | `Routes` (tab) | Route listing |
| Admin Students | `screens/admin/AdminStudentScreen.js` | `Students` (tab) | Student listing |
| Admin More | `screens/admin/AdminMoreScreen.js` | `AdminMore` | Menu grid → Drivers, Trips, Maintenance, Analytics, Settings |
| Admin Drivers | `screens/admin/AdminDriverScreen.js` | `AdminDrivers` | Driver listing |
| Admin Trip Monitor | `screens/admin/AdminTripMonitorScreen.js` | `AdminTripMonitor` | Live trip monitoring |
| Admin Maintenance | `screens/admin/AdminMaintenanceScreen.js` | `AdminMaintenance` | Maintenance alerts |
| Admin Analytics | `screens/admin/AdminAnalyticsScreen.js` | `AdminAnalytics` | Analytics dashboard |
| Admin Settings | `screens/admin/AdminSettingsScreen.js` | `AdminSettings` | App settings |
| Add Vehicle | `screens/admin/AddVehicleScreen.js` | `AddVehicle` | Form: plate, capacity, driver picker, dates, active toggle |
| Add Route | `screens/admin/AddRouteScreen.js` | `AddRoute` | Form: route name, bus picker, dynamic stops list |

## 4. Reusable Components

| Component | File | Usage |
|-----------|------|-------|
| AppLogo | `components/AppLogo.js` | SVG-based logo icon |
| AvatarCircle | `components/AvatarCircle.js` | Initials avatar with configurable colors |
| Badge | `components/Badge.js` | Status badges (success/warning/danger/muted) |
| EmptyState | `components/EmptyState.js` | Empty list placeholder |
| GradientButton | `components/GradientButton.js` | Gradient-styled button |
| SectionTitle | `components/SectionTitle.js` | Section header text |
| StatCard | `components/StatCard.js` | Stats display card |
| Toast | `components/Toast.js` | Toast notification popup |
| TopBar | `components/TopBar.js` | Navigation top bar with back button |

## 5. Firebase/API Endpoints (Backend)

No REST API — all data flows through Firebase SDK:

| Service | Collection/Path | Operations | Used By |
|---------|----------------|------------|---------|
| **Firestore** | `users/{uid}` | `getDoc`, `updateDoc` (absentToday) | AuthContext, StudentHomeScreen |
| **Firestore** | `trips` | `addDoc`, `getDocs`, `updateDoc`, `onSnapshot` | DriverHome, DriverOTP, StudentBoard |
| **Firestore** | `boardings` | `addDoc` | StudentBoardScreen |
| **Firebase Auth** | — | `signInWithEmailAndPassword`, `onAuthStateChanged`, `signOut` | AuthContext |
| **Realtime DB** | `liveLocation/{institutionId}/{route}` | `set`, `onValue` | DriverOTP (write), StudentHome/Track (read) |

## 6. Key User Flows

1. **Login Flow**: Splash → Login → Firebase Auth → Firestore user doc → Role routing (Driver/Student)
2. **Driver Trip Flow**: DriverHome → Start Trip (Firestore write) → DriverOTP (GPS tracking + OTP display) → End Trip → DriverTripSummary → Submit
3. **Student Boarding Flow**: StudentHome → Board Bus → Check Firestore trip → Enter OTP → Verify against live Firestore OTP → Write boarding doc → Success
4. **Student Tracking**: StudentHome (mini map) / Track tab → RTDB live bus location listener
5. **Absence Flow**: StudentHome → Mark Absent → Confirm modal → Firestore write (absentToday=true)
6. **Logout Flow**: Profile → Logout alert → Firebase signOut → Redirect to Splash/Login
7. **Admin Fleet Management**: Fleet tab → Bus list → Add/Edit Vehicle form
8. **Admin Route Management**: Routes tab → Route list → Add/Edit Route form with dynamic stops

## 7. Test Data (from dummyData.js)

| Data Type | Count | Key Fields |
|-----------|-------|------------|
| Driver Accounts | 3 | email, password, bus, route |
| Student Accounts | 4 | email, password, route, stop, roll |
| Routes | 4 | name, label, bus, driver, stops[] with lat/lng |
| Route Students | 3 routes | name, stop, roll, status |
| Maintenance Alerts | 3 | bus, type, severity |
| Trip History | 7 | date, route, stop, status |
| Absent History | 3 | date, day |
| Design Colors | 14 | COLORS object |
