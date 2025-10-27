# ===============================
# 🚲 RideWise: Bike-Sharing Demand Prediction (Streamlit UI)
# Author: Jyoshika Irlapati
# ===============================

import streamlit as st
import pandas as pd
import numpy as np
import joblib
from datetime import datetime
from xgboost import XGBRegressor
from sklearn.pipeline import Pipeline

# ===============================
# Load Tuned Model
# ===============================

@st.cache_resource
def load_model():
    try:
        model = joblib.load("xgb_tuned_model.pkl")  # Must match your uploaded file
        return model
    except Exception as e:
        st.error(f"❌ Error loading model: {e}")
        return None

model = load_model()

# ===============================
# Streamlit Page Configuration
# ===============================

st.set_page_config(
    page_title="RideWise: Bike Demand Prediction",
    page_icon="🚲",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown(
    """ 
    <style>
    .main {background-color: #f8fafc;}
    h1, h2, h3 {color: #1e293b;}
    .stButton>button {
        background-color: #2563eb;
        color: white;
        border-radius: 8px;
        padding: 10px 20px;
    }
    .stButton>button:hover {
        background-color: #1e40af;
        color: white;
    } 
    </style>
    """,
    unsafe_allow_html=True
)

# ===============================
# Sidebar: Dataset Selection
# ===============================

st.sidebar.image("https://cdn-icons-png.flaticon.com/512/3448/3448330.png", width=120)
st.sidebar.title("⚙️ RideWise Options")

dataset_choice = st.sidebar.radio(
    "Select Dataset Type:",
    ["Hourly Dataset", "Daily Dataset"]
)

st.sidebar.markdown("---")
st.sidebar.info("Enter details in the main section to predict the number of bike rentals.")

# ===============================
# Input Form
# ===============================

st.title("🚲 RideWise: Predict Bike Rentals")
st.markdown("### Enter weather and time details to predict bike-sharing demand.")

col1, col2, col3 = st.columns(3)

with col1:
    temp = st.slider("🌡️ Temperature (Normalized)", 0.0, 1.0, 0.5)
    hum = st.slider("💧 Humidity (Normalized)", 0.0, 1.0, 0.6)
    windspeed = st.slider("🌬️ Windspeed (Normalized)", 0.0, 1.0, 0.3)

with col2:
    season = st.selectbox("🗓️ Season", [1, 2, 3, 4], format_func=lambda x: ["Winter", "Spring", "Summer", "Fall"][x - 1])
    weathersit = st.selectbox("🌦️ Weather Situation", [1, 2, 3, 4], format_func=lambda x: ["Clear", "Mist", "Light Rain/Snow", "Heavy Rain/Snow"][x - 1])
    yr = st.selectbox("📅 Year", [2011, 2012])

with col3:
    mnth = st.slider("📆 Month", 1, 12, datetime.now().month)
    weekday = st.slider("📅 Day of Week (0=Mon, 6=Sun)", 0, 6, datetime.now().weekday())

if dataset_choice == "Hourly Dataset":
    hr = st.slider("⏰ Hour of Day (0-23)", 0, 23, datetime.now().hour)
else:
    hr = None  # Not used for daily dataset

holiday = st.selectbox("🎉 Is it a Holiday?", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
workingday = st.selectbox("🏢 Is it a Working Day?", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")

# ===============================
# Feature Engineering (Consistent with Training)
# ===============================

def create_features(data, dataset_type="hour"):
    df = data.copy()
    if dataset_type == "hour":
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
# Predict Button
# ===============================

if st.button("🔮 Predict Bike Rentals"):
    if model is None:
        st.error("Model not loaded. Please ensure 'xgb_tuned_model.pkl' exists in your directory.")
    else:
        # Prepare input dataframe
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
            "windspeed": [windspeed]
        }
        if dataset_choice == "Hourly Dataset":
            input_dict["hr"] = [hr]

        input_df = pd.DataFrame(input_dict)
        input_df = create_features(input_df, "hour" if dataset_choice == "Hourly Dataset" else "day")

        # Prediction
        prediction = model.predict(input_df)[0]
        st.success(f"✅ **Predicted Bike Rentals: {int(prediction)} rides**")

        # Visualization
        st.markdown("### 📊 Prediction Summary")
        st.progress(min(prediction / 1000, 1.0))
        st.metric(label="Predicted Rentals", value=f"{int(prediction)}")
        st.caption("Prediction based on weather, time, and event-related features using tuned XGBoost model.")
