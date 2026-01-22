# LEME - Life Events Mobile Engine (Demo Build)

A production-ready React Native application demonstrating the "Baby Passport & Visa" flow for the Life Events Mobile Engine. This version is a standalone demo featuring Glassmorphism UI, biometric animations, and fully populated mock data.

## 🚀 Quick Start (Demo)

This project is currently configured as a **Standalone Demo**. You strictly only need the **Frontend** to run the app. The backend and database are preserved for future integration but are **NOT required** to run this demo.

### 1. Prerequisites
- **Node.js** (v18 or newer)
- **Expo Go** app installed on your physical mobile device (Android/iOS) or a Simulator.

### 2. Run the App
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start -c
   ```
   *(The `-c` flag clears the cache to ensure a clean start)*

4. Scan the QR code with your **Expo Go** app (Android) or **Camera** (iOS).

---

## 📱 Features Included
*   **Floating Navigation Bar**: Custom glassmorphism bottom tab bar.
*   **Home Tab**: "Baby Passport & Visa" journey with FaceID animation and Gold Seal Visa page.
*   **Documents Tab:** Smart Vault with pulsing expiry alerts and interactive folders.
*   **Search Tab:** Pulsing microphone and "Predicted Actions".
*   **Activity Tab:** Full timeline of user history and events.
*   **Profile Tab:** Sponsorship dashboard and financial breakdown.

## 📂 Project Structure
*   `frontend/App.js` - Contains the complete source code for the demo (Navigation, Screens, Components, Theme, and Mock Data).
*   `backend/` - (Optional) Express/PostgreSQL backend for future API integration.

---

## ⚠️ Note on Backend
The `backend` folder contains a starter Express server and PostgreSQL schema. These are **not** connected to the current `frontend/App.js` demo build, which uses embedded high-fidelity mock data for presentation purposes. You can skip the backend setup for this specific release.
