from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
import re

app = Flask(__name__)
CORS(app)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use a stable model that supports generateContent
model = genai.GenerativeModel("models/gemini-2.5-flash")

def clean_response(text):
    """
    Remove unwanted Markdown/special characters and extra spaces
    """
    if not text:
        return ""
    # Remove *, _, ~, ` characters
    text = re.sub(r"[*_~`]", "", text)
    # Remove multiple spaces or newlines
    text = re.sub(r"\s+", " ", text).strip()
    return text

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    try:
        response = model.generate_content(user_message)
        raw_reply = response.text if response.text else "Sorry, I didn’t get that. Contact Admin."
        reply = clean_response(raw_reply)  # sanitize the response
    except Exception as e:
        reply = f"Error: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
