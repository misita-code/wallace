from flask import Flask, request, jsonify
from models import db, Hero, Power, HeroPower

app = Flask(__name__)

@app.route('/heroes', methods=['GET'])
def get_heroes():
    heroes = Hero.query.all()
    return jsonify([{"id": hero.id, "name": hero.name, "super_name": hero.super_name} for hero in heroes])

@app.route('/heroes/<int:id>', methods=['GET'])
def get_hero(id):
    hero = Hero.query.get(id)
    if hero:
        return jsonify({
            "id": hero.id,
            "name": hero.name,
            "super_name": hero.super_name,
            "hero_powers": [{
                "id": hp.id,
                "strength": hp.strength,
                "power": {
                    "id": hp.power.id,
                    "name": hp.power.name,
                    "description": hp.power.description
                }
            } for hp in hero.hero_powers]
        })
    return jsonify({"error": "Hero not found"}), 404

@app.route('/powers', methods=['GET'])
def get_powers():
    powers = Power.query.all()
    return jsonify([{"id": power.id, "name": power.name, "description": power.description} for power in powers])

@app.route('/powers/<int:id>', methods=['GET'])
def get_power(id):
    power = Power.query.get(id)
    if power:
        return jsonify({"id": power.id, "name": power.name, "description": power.description})
    return jsonify({"error": "Power not found"}), 404

@app.route('/powers/<int:id>', methods=['PATCH'])
def update_power(id):
    power = Power.query.get(id)
    if not power:
        return jsonify({"error": "Power not found"}), 404

    data = request.json
    if "description" in data and len(data["description"]) < 20:
        return jsonify({"errors": ["Description must be at least 20 characters long"]}), 400

    power.description = data["description"]
    db.session.commit()
    return jsonify({"id": power.id, "name": power.name, "description": power.description})

@app.route('/hero_powers', methods=['POST'])
def create_hero_power():
    data = request.json
    hero_power = HeroPower(strength=data["strength"], hero_id=data["hero_id"], power_id=data["power_id"])

    db.session.add(hero_power)
    db.session.commit()

    return jsonify({
        "id": hero_power.id,
        "strength": hero_power.strength,
        "hero": {
            "id": hero_power.hero.id,
            "name": hero_power.hero.name,
            "super_name": hero_power.hero.super_name
        },
        "power": {
            "id": hero_power.power.id,
            "name": hero_power.power.name,
            "description": hero_power.power.description
        }
    })
