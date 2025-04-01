from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validates, ValidationError

db = SQLAlchemy()

# Hero Model
class Hero(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    super_name = db.Column(db.String, nullable=False)
    hero_powers = db.relationship('HeroPower', backref='hero', cascade="all, delete-orphan")

# Power Model
class Power(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    hero_powers = db.relationship('HeroPower', backref='power', cascade="all, delete-orphan")

    @validates('description')
    def validate_description(self, key, description):
        if len(description) < 20:
            raise ValidationError("Description must be at least 20 characters long.")
        return description

# HeroPower Model
class HeroPower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    strength = db.Column(db.String, nullable=False)
    hero_id = db.Column(db.Integer, db.ForeignKey('hero.id'), nullable=False)
    power_id = db.Column(db.Integer, db.ForeignKey('power.id'), nullable=False)

    @validates('strength')
    def validate_strength(self, key, strength):
        if strength not in ['Strong', 'Weak', 'Average']:
            raise ValidationError("Strength must be 'Strong', 'Weak', or 'Average'.")
        return strength
