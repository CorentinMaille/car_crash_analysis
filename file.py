from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuration de la base de données MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/sakila'  # Remplacez avec vos informations
db = SQLAlchemy(app)

# Modèle de la table que vous souhaitez interagir
class Actor(db.Model):
    __tablename__ = 'actor'  # Remplacez par le nom de votre table MySQL
    actor_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45))
    last_name = db.Column(db.String(45))

# Route pour la page d'accueil
@app.route('/')
def index():
    return render_template('index.html')

# Route pour récupérer des données depuis la base de données
@app.route('/api/data', methods=['GET'])
def get_data():
    actors = Actor.query.all()
    data = [{'actor_id': actor.actor_id, 'first_name': actor.first_name, 'last_name': actor.last_name} for actor in actors]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
