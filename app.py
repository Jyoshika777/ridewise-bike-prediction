# ===============================
# 🚲 RideWise: Bike-Sharing Demand Prediction
# Author: Jyoshika Irlapati
# ===============================

import streamlit as st
import pandas as pd
import numpy as np
import joblib
from datetime import datetime
from xgboost import XGBRegressor

# ===============================
# Streamlit Page Configuration
# ===============================
st.set_page_config(
    page_title="RideWise: Predict Bike Rentals",
    page_icon="🚲",
    layout="wide",
)

# ===============================
# Custom Styling (Modern UI)
# ===============================
st.markdown("""
    <style>
    body {
        background-color: #f4f7fa;
    }
    .main {
        background: #ffffff;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    }
    h1, h2, h3 {
        color: #0f172a;
        text-align: center;
    }
    .big-font {
        font-size: 28px !important;
        color: #1d4ed8;
        font-weight: bold;
    }
    .stButton>button {
        background-color: #2563eb;
        color: white;
        font-weight: 600;
        border-radius: 10px;
        padding: 12px 30px;
        transition: 0.3s;
    }
    .stButton>button:hover {
        background-color: #1e40af;
        color: white;
        transform: scale(1.03);
    }
    .metric-container {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .footer {
        text-align: center;
        color: #64748b;
        font-size: 13px;
        margin-top: 40px;
    }
    </style>
""", unsafe_allow_html=True)

# ===============================
# Header Section
# ===============================
st.markdown("<h1>🚲 RideWise: Predict Bike-Sharing Demand</h1>", unsafe_allow_html=True)
st.markdown("""
<p style='text-align:center; font-size:17px; color:#475569;'>
RideWise helps forecast bike-sharing demand based on weather, time, and urban conditions.<br>
This model uses machine learning to help plan smarter bike availability across the city.
</p>
""", unsafe_allow_html=True)

# ===============================
# Load Tuned Model
# ===============================
@st.cache_resource
def load_model():
    try:
        return joblib.load("xgb_tuned_model.pkl")
    except Exception as e:
        st.error(f"❌ Error loading model: {e}")
        return None

model = load_model()

# ===============================
# Sidebar Configuration
# ===============================
st.sidebar.image("https://cdn-icons-png.flaticon.com/512/3448/3448330.png", width=120)
st.sidebar.title("⚙️ Configuration Panel")

dataset_choice = st.sidebar.radio("Select Dataset Type:", ["Hourly Dataset", "Daily Dataset"])
st.sidebar.markdown("---")
st.sidebar.info("Adjust the settings below to simulate different conditions and predict bike demand.")

# ===============================
# Input Section
# ===============================
st.markdown("<h3 class='big-font'>📋 Enter Environmental & Temporal Details</h3>", unsafe_allow_html=True)
col1, col2, col3 = st.columns(3)

with col1:
    temp = st.slider("🌡️ Temperature (Normalized)", 0.0, 1.0, 0.5)
    hum = st.slider("💧 Humidity (Normalized)", 0.0, 1.0, 0.6)
    windspeed = st.slider("🌬️ Windspeed (Normalized)", 0.0, 1.0, 0.3)

with col2:
    season = st.selectbox("🗓️ Season", [1, 2, 3, 4],
        format_func=lambda x: ["Winter", "Spring", "Summer", "Fall"][x - 1])
    weathersit = st.selectbox("🌦️ Weather Situation", [1, 2, 3, 4],
        format_func=lambda x: ["Clear", "Mist", "Light Rain/Snow", "Heavy Rain/Snow"][x - 1])
    yr = st.selectbox("📅 Year", [2011, 2012])

with col3:
    mnth = st.slider("📆 Month", 1, 12, datetime.now().month)
    weekday = st.slider("📅 Day of Week (0=Mon, 6=Sun)", 0, 6, datetime.now().weekday())

if dataset_choice == "Hourly Dataset":
    hr = st.slider("⏰ Hour of Day (0-23)", 0, 23, datetime.now().hour)
else:
    hr = None

holiday = st.selectbox("🎉 Is it a Holiday?", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
workingday = st.selectbox("🏢 Is it a Working Day?", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")

# ===============================
# Feature Engineering
# ===============================
def create_features(data, dataset_type="hour"):
    df = data.copy()
    if dataset_type == "hour" and "hr" in df.columns:
        df["hour_sin"] = np.sin(2 * np.pi * df["hr"] / 24)
        df["hour_cos"] = np.cos(2 * np.pi * df["hr"] / 24)
    df["dayofweek_sin"] = np.sin(2 * np.pi * df["weekday"] / 7)
    df["dayofweek_cos"] = np.cos(2 * np.pi * df["weekday"] / 7)
    df["month_sin"] = np.sin(2 * np.pi * df["mnth"] / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["mnth"] / 12)
    df["temp_hum_interaction"] = df["temp"] * df["hum"]
    df["windspeed_temp_interaction"] = df["windspeed"] * df["temp"]
    return df

# ===============================
# Prediction Section
# ===============================
st.markdown("<hr>", unsafe_allow_html=True)
st.markdown("<h3 class='big-font'>🔮 Predict Bike Rentals</h3>", unsafe_allow_html=True)

if st.button("🚴‍♀️ Generate Prediction"):
    if model is None:
        st.error("⚠️ Model not found. Please ensure 'xgb_tuned_model.pkl' is in this directory.")
    else:
        input_dict = {
            "season": [season],
            "yr": [yr - 2011],
            "mnth": [mnth],
            "holiday": [holiday],
            "weekday": [weekday],
            "workingday": [workingday],
            "weathersit": [weathersit],
            "temp": [temp],
            "hum": [hum],
            "windspeed": [windspeed],
        }
        if dataset_choice == "Hourly Dataset":
            input_dict["hr"] = [hr]

        input_df = pd.DataFrame(input_dict)
        input_df["year"] = yr
        input_df["month"] = mnth
        input_df["day"] = datetime.now().day
        input_df["dayofweek"] = weekday
        input_df["is_weekend"] = 1 if weekday in [5, 6] else 0
        input_df = create_features(input_df, "hour" if dataset_choice == "Hourly Dataset" else "day")

        # Align columns with model schema
        expected_cols = getattr(model, "feature_names_in_", None)
        if expected_cols is not None:
            for col in expected_cols:
                if col not in input_df.columns:
                    input_df[col] = 0
            input_df = input_df[expected_cols]

        # Predict
        prediction = model.predict(input_df)[0]
        prediction = float(prediction)

        # --- Display ---
        st.success(f"✅ Predicted Bike Rentals: **{int(prediction):,} rides**")

        # --- Dashboard-Style Visualization ---
        st.markdown("<br>", unsafe_allow_html=True)
        colA, colB = st.columns([2, 1])
        with colA:
            st.progress(float(min(prediction / 1000, 1.0)))
            st.caption("Demand intensity scaled between 0 and 1000 rides")

        with colB:
            if prediction < 200:
                level = "🟢 Low Demand"
                desc = "Ideal time for maintenance or redistribution."
            elif prediction < 600:
                level = "🟡 Medium Demand"
                desc = "Average ridership expected. Maintain stock levels."
            else:
                level = "🔴 High Demand"
                desc = "Ensure bikes are available at key stations!"
            st.metric(label="Demand Level", value=level)
            st.caption(desc)

# ===============================
# Footer
# ===============================
st.markdown("""
<div class='footer'>
🚲 Built with ❤️ by <b>Jyoshika Irlapati</b> | Powered by XGBoost & Streamlit  
</div>
""", unsafe_allow_html=True)
