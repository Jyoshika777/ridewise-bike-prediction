# 🚴‍♂️ RideWise -- Smart Bike Rental & Demand Prediction System

RideWise is a futuristic bike-rental web application with **user
authentication, bike booking, demand prediction (hourly + daily),
interactive dashboards, and real-time contact messaging.**

It integrates **machine learning models**, beautiful **neon UI**, and a
full session-based login system to deliver a complete bike-sharing
digital platform.

## 🚀 Live Demo

🔗 Try the app here:
👉 **https://cyber-cycle-grid.lovable.app/auth**

## 📌 Features

### 🔐 1. Secure Multi-User Authentication

-   Login & Create Account pages
-   Username/email login
-   Session-based authentication
-   User dropdown showing:
    -   Profile
    -   Logged-in username
    -   Logout button

### 🔮 2. Bike Demand Prediction (ML Model)

RideWise predicts bike rentals using *two datasets*:

#### Hourly Prediction

-   Uses `hour.csv`
-   Inputs: temperature, humidity, weather, windspeed, season, etc.

#### Daily Prediction

-   Uses `day.csv`
-   Inputs: daily weather, working day, holiday, season, etc.

### 🚴‍♂️ 3. Bike Reservation System

-   Book any ride
-   Total bookings counter
-   Booking history with:
    -   User
    -   Bike type
    -   Date & time
    -   Duration
    -   Estimated fare
    -   Confirmation ID
-   Confetti animation on booking

### 📩 4. Contact Page → Sends Email

Emails are sent directly to **jyoshikajyoshika3@gmail.com** with: -
Sender name
- Sender email
- Message
- Timestamp

### 🔗 5. Social Icons

-   LinkedIn → https://www.linkedin.com/in/jyoshika777
-   GitHub → https://github.com/Jyoshika777
-   Email → mailto:jyoshikajyoshika3@gmail.com

### 🗺 6. Dashboard & Insights

-   Clean neon UI
-   Weather-based analytics
-   Mobile responsive

## 🛠 Tech Stack

### Frontend

-   React (Lovable)
-   TailwindCSS
-   Lottie animations

### Backend & ML

-   Python
-   TensorFlow/Keras
-   NumPy
-   Pandas
-   Scikit-Learn
-   EmailJS / Lovable email API

## 🧠 Machine Learning Model

### Datasets

-   hour.csv
-   day.csv

### Preprocessing

-   Handle missing values
-   Encode categories
-   Feature scaling
-   Train/test split

### Model

-   ANN
-   ReLU
-   Adam optimizer

## 📂 Project Structure

    RideWise/
    │
    ├── frontend/     
    ├── model/        
    ├── datasets/     
    └── README.md

## 🧪 Running Locally

### 1️⃣ Clone Repository

    git clone https://github.com/your-username/RideWise.git
    cd RideWise

### 2️⃣ Install Backend Dependencies

    pip install -r requirements.txt

### 3️⃣ Run ML Server

    python app.py

### 4️⃣ Start Frontend

    npm install
    npm start

## 📬 Contact

👤 **Jyoshika Irlapati**

📧 Email: jyoshikajyoshika3@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/jyoshika777
💻 GitHub: https://github.com/Jyoshika777

## ⭐ Support

If you found RideWise helpful, please 🌟 star the repo!
