from flask import Flask, request, jsonify
import joblib
import numpy as np
import json

app = Flask(__name__)

model = joblib.load("model.pkl")

with open("model_info.json", "r") as f:
    model_info = json.load(f)

feature_names = [
    "internalMarks",
    "attendance",
    "assignmentMarks",
    "studyHours",
    "previousGpa"
]

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    features = np.array([[
        data["internalMarks"],
        data["attendance"],
        data["assignmentMarks"],
        data["studyHours"],
        data["previousGpa"]
    ]])

    prediction = model.predict(features)[0]
    prediction = min(prediction, 100)

    importance_data = {}

    try:
        # Extract actual model from pipeline
        actual_model = model.named_steps["model"]

        if hasattr(actual_model, "feature_importances_"):
            importances = actual_model.feature_importances_

        elif hasattr(actual_model, "coef_"):
            importances = np.abs(actual_model.coef_)

        else:
            importances = [0] * len(feature_names)

        total = sum(importances)

        if total == 0:
            percentages = [0] * len(importances)
        else:
            percentages = [(i / total) * 100 for i in importances]

        for name, value in zip(feature_names, percentages):
            importance_data[name] = round(float(value), 2)

    except Exception as e:
        importance_data = {}

    return jsonify({
        "predictedScore": round(float(prediction), 2),
        "selectedModel": model_info["selected_model"],
        "r2Score": model_info["r2_score"],
        "featureImportance": importance_data,
        "allModels": model_info
    })

@app.route("/")
def home():
    return "Advanced ML Service Running 🚀"

if __name__ == "__main__":
    app.run(port=5000)