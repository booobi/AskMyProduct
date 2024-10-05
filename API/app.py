from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os

load_dotenv()

CHAT = os.getenv("LLAMA_API") + "/chat"

app = Flask(__name__)


# Home route
@app.route('/')
def home():
    return jsonify(message="Flask API works!")


# Example GET route
@app.route('/api/question', methods=['GET'])
def get_prompt():
    prompt = request.args.get('prompt')
    if not prompt:
        return jsonify(response="Missing prompt"), 500



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5152)
