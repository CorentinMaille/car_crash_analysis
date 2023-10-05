from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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

@app.route('/api/get_data/<int:data_id>', methods=['GET'])
def get_data(data_id):
    data = Crash.query.get(data_id)

    if data is None:
        return jsonify({'message': 'Données non trouvées'}), 404

    data_dict = {
        'id': data.id,
        'category': data.Category,
        'country': data.Country,
        'code': data.Code,
        'year': data.Year,
        'deaths': data.Deaths
    }

    return jsonify(data_dict), 200

@app.route('/api/update_data/<int:data_id>', methods=['PUT'])
def update_data(data_id):
    data = request.json

    existing_data = Crash.query.get(data_id)

    if existing_data is None:
        return jsonify({'message': 'Données non trouvées'}), 404

    existing_data.Category = data.get('category', existing_data.Category)
    existing_data.Country = data.get('country', existing_data.Country)
    existing_data.Code = data.get('code', existing_data.Code)
    existing_data.Year = data.get('year', existing_data.Year)
    existing_data.Deaths = data.get('deaths', existing_data.Deaths)

    db.session.commit()

    return jsonify({'message': 'Données mises à jour avec succès'}), 200



@app.route('/api/countries', methods=['GET'])
def get_countries():
    sql_query = text("SELECT * FROM road_accident_clean WHERE Category = 'Country'")
    result = db.session.execute(sql_query)
    data = [{'Year': row.Year, 'Country': row.Country, 'Deaths': row.Deaths} for row in result]
    df = pd.DataFrame(data)
    fig = px.line(df, x='Year', y='Deaths', color='Country')

    return fig.to_html()
    


@app.route('/api/world_population', methods=['GET'])
def get_population():
    sql_query = text("SELECT Country, `2010` AS Population FROM world_population_clean ORDER BY Population DESC LIMIT 10")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Population': row.Population} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, x='Country', y='Population')

    return fig.to_html()

@app.route('/api/world_area', methods=['GET'])
def get_area():
    sql_query = text("SELECT Country, `Area (km²)` AS Area FROM world_population_clean ORDER BY Area DESC LIMIT 10")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Area': row.Area} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, x='Country', y='Area')

    return fig.to_html()

@app.route('/api/world_density', methods=['GET'])
def get_density():
    sql_query = text("SELECT Country, `2010` / `Area (km²)` AS Density FROM world_population_clean ORDER BY Density DESC LIMIT 10;")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Density': row.Density} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, x='Country', y='Density')

    return fig.to_html()
    

@app.route('/api/world_percent', methods=['GET'])
def get_percent():
    sql_query = text("SELECT Country, Deaths * 100 / `2010` AS Percent, Year, Category FROM road_accident_clean INNER JOIN world_population_clean USING (Country) WHERE Year = 2010 AND Category = 'Country' ORDER BY `Percent` DESC LIMIT 20;")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Percent': row.Percent} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, x='Country', y='Percent')

    return fig.to_html()
    

@app.route('/api/iq', methods=['GET'])
def get_iq():
    sql_query = text("SELECT * FROM average_iq")
    result = db.session.execute(sql_query)
    data = [{'Country': row.Country, 'Average': row.Average} for row in result]
    df = pd.DataFrame(data)
    fig = px.bar(df, y='Average', x='Country')
    fig.update_layout(yaxis_range=[85,110])
    fig.update_xaxes(tickangle=45)
    fig.update_traces(marker=dict(opacity=1), selector=dict(type='bar'), width=.5)
    return fig.to_html()

@app.route('/api/camembert', methods=['GET'])
def get_camembert_mort():
    args = request.args
    year = args.get("year")

    year = int(year) if yearIsCorrect(year) else 2019

    sql_query = text("SELECT * FROM road_accident_clean WHERE Category='Continent'")
    result = db.session.execute(sql_query)
    data = [{'Year': row.Year, 'Country': row.Country, 'Deaths': row.Deaths} for row in result]

    df = pd.DataFrame(data)
    df = df.groupby(["Country", "Year"]).sum("Deaths").reset_index()
    df = df.loc[(df["Year"] == year)]

    cmap = plt.cm.cool
    colors = cmap(np.linspace(0., 1., len(list(df['Country']))))

    explode = (0.05, 0.05, 0.05, 0.05, 0.05)

    fig, ax = plt.subplots(figsize =(15, 10))
    wedges, texts, autotexts = ax.pie(df['Deaths'],
                                    autopct='%1.1f%%',
                                    explode = explode,
                                    shadow = True,
                                    colors = colors,
                                    startangle = 90,
                                    wedgeprops = { 'linewidth' : 1, 'edgecolor' : "red" },
                                    textprops = dict(color ="black"))

    ax.legend(wedges, df['Country'],
            title ="Continent",
            loc ="center left",
            bbox_to_anchor =(1, 0, 0.5, 1))

    plt.setp(autotexts, size = 10, weight ="bold")
    ax.set_title("Nombres de morts sur la route par continent",loc='left')

    fig = px.pie(df, values='Deaths', names='Country', title='Population of European continent')
    return fig.to_html()

# METHODS
def yearIsCorrect(year):
    if not year:
        return False
    if not year.isdigit():
        return False
    if int(year) not in range(1990, 2019):
        return False
    return True


# RUN APP
if __name__ == '__main__':
    app.run(debug=True, port=8080)