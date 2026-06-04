import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "internalMarks": 85,
    "attendance": 90,
    "assignmentMarks": 80,
    "studyHours": 6,
    "previousGpa": 8.2
}

response = requests.post(url, json=data)

print(response.json())