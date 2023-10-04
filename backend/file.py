from flask import Flask, render_template, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/car_crash'
db = SQLAlchemy(app)

class Crash(db.Model):
    __tablename__ = 'road_accident_clean'
    id = db.Column(db.Integer, primary_key=True)
    Index = db.Column(db.Integer)
    Category = db.Column(db.String(45))
    Country = db.Column(db.String(45))
    Code = db.Column(db.String(45))
    Year = db.Column(db.String(45))
    Deaths = db.Column(db.String(45))
    Sidedness = db.Column(db.String(45))

@app.route('/')
def index():
    return render_template('index.html')

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
@app.route('/api/data', methods=['GET'])
def get_data():
    sql_query = text("SELECT Country FROM road_accident_clean")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country} for row in result]
    return jsonify(data)

@app.route('/api/add_data', methods=['POST'])
def add_data():
    data = request.json  # Récupérez les données du formulaire envoyées depuis React

    # Insérez les données dans votre base de données ici
    # Exemple : Insérez les données dans le modèle Crash
    new_data = Crash(
        Category=data['category'],
        Country=data['country'],
        Code=data['code'],
        Year=data['year'],
        Deaths=data['deaths'],
        Sidedness=data['sidedness']
    )

    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Données ajoutées avec succès'})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
