# 🚌 FleetSync — PDD Project

A **React Native / Expo** mobile application for real-time fleet and student transport management.

---

## 📁 Project Structure

```
PDD-/
├── frontend/          # React Native / Expo app source code
│   ├── App.js
│   ├── index.js
│   ├── assets/        # Images, icons, splash screens
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context providers (Auth, Notification)
│   ├── navigation/    # React Navigation stack/tab navigators
│   └── screens/
│       ├── admin/     # Admin portal screens
│       ├── driver/    # Driver portal screens
│       └── student/   # Student portal screens
│
├── backend/           # Firebase configuration & data services
│   ├── firebase.js    # Firebase app initialization & Firestore
│   └── dummyData.js   # Seed/mock data for development
│
└── config/            # Project configuration files
    ├── app.json       # Expo app configuration
    ├── package.json   # Dependencies & scripts
    └── package-lock.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native + Expo |
| Navigation | React Navigation v7 |
| Backend | Firebase Firestore |
| Auth | Firebase Authentication |
| Maps | react-native-maps |
| Location | expo-location |
| Styling | React Native StyleSheet + Expo Linear Gradient |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo CLI
- Expo Go app on your mobile device

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Nithishs56/PDD-.git
cd PDD-

# Install dependencies (from the root or config/ folder)
npm install

# Start the Expo dev server
npm start
# or
expo start
```

Scan the QR code with **Expo Go** on your phone.

---

## 👥 User Roles

- **Admin** — Manage vehicles, routes, drivers, students, monitor live trips
- **Driver** — Start/end trips, manage OTP boarding, view student list
- **Student** — Board bus with OTP, track live location, view trip history

---

## 📱 Key Features

- 🔐 Role-based authentication (Admin / Driver / Student)
- 📍 Real-time GPS tracking via Firestore
- 🎫 OTP-based student boarding verification
- 🔔 Push notification system
- 📊 Admin analytics dashboard
- 🗺️ Live map with driver location updates
