from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# In-memory storage for user data
users = {}

@app.route('/')
@cross_origin()
def home():
    return "Welcome to the backend server!"

# Registration route (POST only)
@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.json  # Assuming data is sent as JSON from the frontend
    username = data.get('username')
    password = data.get('password')
    interests = data.get('interests')

    # Check if the user already exists
    # success, user, message
    if username in users:
        return jsonify({"success": False,"message": "User already exists. Please try another username."}), 400

    # Store the user data (interests stored as a list)
    users[username] = {
        'password': password,
        'interests': interests
        # 'interests': [interest.strip() for interest in interests.split(',')]  # Parse interests
    }

    # return jsonify({"message": "Registration successful!", "user_data": users[username]}), 201
    return jsonify({"success": True, "message": "Registration successful!", "user": username,"interests": users[username]['interests']}), 201

# Login route (POST only)
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json  # Assuming data is sent as JSON from the frontend
    username = data.get('username')
    password = data.get('password')

    # Validate the login credentials
    if username in users and users[username]['password'] == password:
        return jsonify({"success": True, "message": "Login successful!", "user": username,"interests": users[username]['interests']}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

if __name__ == '__main__':
    app.run(debug=True)
