# Funnel Trend Radar

FunnelTrendRadar is a visual, interactive trend visualization web app designed for Vanderlande. It helps users explore technological and social trends based on their impact, timeframe, and relevance to key strategic areas. Users can filter, compare, and interact with trend elements within a dynamic, animated funnel interface.

## Features

- **Interactive Funnel View:** Visualize trends categorized by different timeframes and impact levels.
- **Filter & Compare:** Use dropdowns to filter trends by type (social/tech), impact, timeframe, and more. Enter compare mode to compare two trends side-by-side.
- **Custom Trend Animations:** Trends animate into view based on selected filters, enhancing engagement.
- **Onboarding Experience:** A 5-step onboarding popup appears on first use and after every 5th app start (unless disabled).
- **History & Detail View:** View detailed information about selected trends and explore previously viewed items.

## Tech Stack

- **Client:** React Native
- **API Server:** Entity Framework
- **Database Server:** SQL

## Repositories

- **Frontend:** [https://github.com/karlijn76x/FunnelTrendRadar.git](https://github.com/karlijn76x/FunnelTrendRadar.git)
- **Backend:** [https://github.com/karlijn76x/TrendGuideAPI.git](https://github.com/karlijn76x/TrendGuideAPI.git)

## Prerequisites

Before running the FunnelTrendRadar app locally, ensure you have the following installed:

1. **Node.js** (latest LTS version recommended)
    - Download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)

2. **Expo CLI**
    - Install Expo CLI globally using the following command:
      
        ```bash
        npm install -g expo-cli
        ```

3. **Expo Go App** (optional, for testing on physical devices)
    - Available on [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

### 1. **Clone the Repositories**
- Backend Repository:
  
    ```bash
    git clone https://github.com/karlijn76x/TrendGuideAPI.git
    ```
- Frontend Repository:
  
    ```bash
    git clone https://github.com/karlijn76x/FunnelTrendRadar.git
    ```

### 2. **Backend Setup**
1. Navigate to the backend directory:
   
    ```bash
    cd TrendGuideAPI
    ```
3. Open the project in Visual Studio.
4. Ensure SQL Server is running and update the connection string in `appsettings.json` if needed.
5. Run database migrations:
    - Open the Package Manager Console in Visual Studio
    - Run:
      
        ```bash
        Update-Database
        ```
6. Start the backend server:
    - Click Start Debugging or press `Ctrl + F5`.

### 3. **Frontend Setup**
1. Navigate to the frontend directory:
   
    ```bash
    cd FunnelTrendRadar
    ```
3. Install dependencies:
   
    ```bash
    npm install
    ```
5. Start the frontend server:
   
    ```bash
    npm start
    ```
    This will open the Expo Developer Tools and display a QR code in the terminal.

## Running the Application

**Option 1: On Web Browser**
1. In the terminal where Expo is running, press `S` to switch to Expo Go mode.
2. Then press `W` to launch the app in your browser.

**Option 2: On Physical Device**
1. Install the Expo Go app from the App Store or Google Play.
2. Make sure your phone and computer are on the same Wi-Fi network.
3. Scan the QR code displayed in the terminal or Expo Developer Tools.
4. The app will load and launch on your device automatically.

**Option 3: On Emulator**
1. Launch an emulator via Android Studio or iOS Simulator
2. In the Expo Developer Tools, select your emulator device.
3. The app will install and start on the emulator.

## Demo
![demo](./assets/images/trend_radar_final_product.gif)

## Authors
- [@briahnaaztria19](https://github.com/briahnaaztria19)
- [@LuukSteusfij](https://github.com/LuukSteusfij)
- [@elitsa1819](https://github.com/elitsa1819)
- [@JasminHachmane](https://github.com/JasminHachmane)
