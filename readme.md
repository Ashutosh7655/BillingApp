# Billing App

A simple billing application built with **React Native**, **Expo Router**, and **AsyncStorage**.  
It helps manage buyers, products, generate bills, and store bill history with the ability to share as images.

---

## 🚀 Features

- Select a buyer from stored list.
- Add multiple products to a bill.
- Automatically calculate price, quantity, and total.
- Generate and share bill as an image (via WhatsApp).
- Persistent bill history stored in AsyncStorage.
- Edit buyer details and manage product list.
- Clean navigation flow using Expo Router.

---

## ⚡️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/billing-app.git
   ```
2. Install the Dependencies
  ```bash
   npm install
```
3. Run the project
  ```bash
   npm expo start
```

## 🎯 Usage
- On app start, select a buyer or add a new one.

- Add products by selecting from a searchable list with quantity input.

- Click Generate Bill to create a bill image and share it.

- View generated bills in the History screen.

- Edit buyer details or delete products if needed.


## Key Libraries

- Expo Router – Handles navigation with filesystem-based routing.

- AsyncStorage – Stores buyer & bill data persistently.

- react-native-view-shot – Captures bill as an image.

- expo-sharing – Share the captured image.

- react-native-element-dropdown – Dropdown for selecting buyers.
