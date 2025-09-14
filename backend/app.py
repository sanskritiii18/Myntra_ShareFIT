from flask import Flask,jsonify,request,Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/signup",methods=['POST'])
def singup():
    data = request.json

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirmPassword = data.get('confirmPassword')

    if password != confirmPassword:
        return jsonify({"error": "Passwords do not match"}), 400

    # Store user in database here...
    return jsonify({"message": "User registered successfully!"})


@app.route('/api/Login',methods=['POST'])
def Login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    return jsonify({"message": "User Logged in successfully!"})



    






if __name__=="__main__":
    app.run(debug=True)