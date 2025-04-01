from flask import Flask, jsonify
from flask_migrate import Migrate
from models import db
from config import Config
import routes

app = Flask(__name__)


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Superheroes API!"})

# Other routes go here...
@app.route('/heroes')
def get_heroes():
    return jsonify([{"id": 1, "name": "Kamala Khan", "super_name": "Ms. Marvel"}])

if __name__ == "__main__":
    app.run(debug=True)
