# Metals Price App

A React Native application that fetches and displays **live prices** of Gold, Silver, Platinum, and Palladium.  
This project was created as part of an assignment to emulate the **gold purchase flow** from the Simplify Money app.

---

## ✨ Features

- 📊 Live metal prices (24k) with **time-stamped updates**
- 🟨 Gold • 🟦 Silver • 🟩 Platinum • 🟥 Palladium
- ⚡ Each metal fetched with a separate loader
- 📱 Landing page with tiles for all metals
- 🔎 Details page with:
  - Current Price  
  - Today's Open  
  - Previous Open  
  - Previous Close  
  - Day High / Day Low  
  - Date & Time  
- 🔄 Supports **mock data** (for offline/demo) and **live data** (via [goldapi.io](https://www.goldapi.io/))
- ✅ Error handling and loading states
- 🧭 Navigation handled with **React Navigation**

---

## 📂 Project Structure

metals-price-app/
│
├── App.tsx # Entry point
├── src/
│ ├── components/ # UI components
│ ├── constants/ # Config, API keys, metal symbols
│ ├── navigation/ # React Navigation setup
│ ├── screens/ # Landing + Details screens
│ └── services/ # API service (mock + live)


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ksamrat083/metals-price-app.git
cd metals-price-app
```

2️⃣ Install dependencies
```
npm install
```

3️⃣ Configure API
Edit src/constants/config.ts:

export const GOLDAPI_KEY = "goldapi-a4tosmeu8m1bh-io"; // from goldapi.io
export const USE_MOCK = false; // set true to use mock prices

4️⃣ Run the app
```
npx expo start
```

🛠 Tech Stack

React Native
 (Expo)

TypeScript

React Navigation

goldapi.io
 (Live market data)

Custom mock API for testing

📸 Screenshots

Landing Page 
(./assets/Metals-Prices-Dashboard.png)

Metal Details 
– Gold 
(./assets/Metal-Details-Gold.png)

- Silver 
(./assets/Metal-Details-Silver.png)

- Platinum 
(./assets/Metal-Details-Platinum.png)

- Palladium 
(./assets/Metal-Details-Palladium.png)

👨‍💻 Author
SAMRAT KAVIDE
GitHub: @ksamrat083
