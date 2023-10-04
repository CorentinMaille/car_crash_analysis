from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

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

@app.route('/api/data', methods=['GET'])
def get_data():
    sql_query = text("SELECT Country FROM road_accident_clean")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country} for row in result]
    # data = [{'id': row.id, 'Index': row.Index, 'Category': row.Category, 'Country': row.Country, 'Code': row.Code, 'Year': row.Year, 'Deaths': row.Deaths, 'Sidedness': row.Sidedness} for row in result]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
