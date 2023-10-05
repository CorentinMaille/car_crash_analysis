from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
import pandas as pd
import plotly.express as px


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/car_crash'
db = SQLAlchemy(app)

class Crash(db.Model):
    __tablename__ = 'road_accident_clean'
    id = db.Column(db.Integer, primary_key=True)
    Category = db.Column(db.String(45))
    Country = db.Column(db.String(45))
    Code = db.Column(db.String(45))
    Year = db.Column(db.String(45))
    Deaths = db.Column(db.String(45))

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

@app.route('/api/add_data', methods=['POST'])
def add_data():
    data = request.json

    new_data = Crash(
        Category=data['category'],
        Country=data['country'],
        Code=data['code'],
        Year=data['year'],
        Deaths=data['deaths'],
    )

    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Données ajoutées avec succès'})
    

@app.route('/api/countries', methods=['GET'])
def get_countries():
    sql_query = text("SELECT * FROM road_accident_clean WHERE Category = 'Country'")
    result = db.session.execute(sql_query)
    data = [{'Year': row.Year, 'Country': row.Country, 'Deaths': row.Deaths} for row in result]
    df = pd.DataFrame(data)
    fig = px.line(df, x='Year', y='Deaths', color='Country')

    return fig.to_html()

@app.route('/api/iq', methods=['GET'])
def get_iq():
    sql_query = text("SELECT * FROM average_iq")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Average': row.Average} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, y='Average', x='Country')
    fig.update_xaxes(tickangle=45)
    fig.update_traces(marker=dict(opacity=1), selector=dict(type='bar'), width=.5)
    return fig.to_html()
    



if __name__ == '__main__':
    app.run(debug=True, port=8080)
