import pandas as pd
import numpy as np
import joblib
import json

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score

np.random.seed(42)

# ------------------------------
# 1️⃣ Generate Synthetic Dataset
# ------------------------------

data_size = 500

data = pd.DataFrame({
    "internalMarks": np.random.uniform(30, 100, data_size),
    "attendance": np.random.uniform(40, 100, data_size),
    "assignmentMarks": np.random.uniform(30, 100, data_size),
    "studyHours": np.random.uniform(1, 10, data_size),
    "previousGpa": np.random.uniform(4, 10, data_size)
})

# Balanced realistic formula
data["finalScore"] = (
    data["internalMarks"] * 0.30 +
    data["assignmentMarks"] * 0.25 +
    data["attendance"] * 0.20 +
    data["studyHours"] * 2 +
    data["previousGpa"] * 5
)

data["finalScore"] = data["finalScore"].clip(0, 100)

# ------------------------------
# 2️⃣ Prepare Data
# ------------------------------

X = data[[
    "internalMarks",
    "attendance",
    "assignmentMarks",
    "studyHours",
    "previousGpa"
]]

y = data["finalScore"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ------------------------------
# 3️⃣ Build Pipelines (Scaling + Model)
# ------------------------------

lr_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LinearRegression())
])

rf_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestRegressor(n_estimators=100, random_state=42))
])

# ------------------------------
# 4️⃣ Train Models
# ------------------------------

lr_pipeline.fit(X_train, y_train)
lr_pred = lr_pipeline.predict(X_test)
lr_score = r2_score(y_test, lr_pred)

rf_pipeline.fit(X_train, y_train)
rf_pred = rf_pipeline.predict(X_test)
rf_score = r2_score(y_test, rf_pred)

# ------------------------------
# 5️⃣ Select Best Model
# ------------------------------

if rf_score > lr_score:
    best_model = rf_pipeline
    best_model_name = "RANDOM_FOREST"
    best_score = rf_score
else:
    best_model = lr_pipeline
    best_model_name = "LINEAR_REGRESSION"
    best_score = lr_score

# ------------------------------
# 6️⃣ Save Model
# ------------------------------

joblib.dump(best_model, "model.pkl")

model_info = {
    "selected_model": best_model_name,
    "r2_score": round(best_score, 4),
    "linear_regression_r2": round(lr_score, 4),
    "random_forest_r2": round(rf_score, 4)
}

with open("model_info.json", "w") as f:
    json.dump(model_info, f, indent=4)

print("✅ Advanced ML training complete!")
print("Selected Model:", best_model_name)
print("R² Score:", round(best_score, 4))