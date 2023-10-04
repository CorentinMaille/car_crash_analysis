


# ROUTES
@app.route('/')
def index():
    return render_template('index.html')


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
    )

    db.session.add(new_data)
    db.session.commit()

    return jsonify({'message': 'Données ajoutées avec succès'})


@app.route('/api/camembert', methods=['GET'])
def get_camembert_mort():
    sql_query = text("SELECT * FROM road_accident_clean WHERE Category='Continent'")
    result = db.session.execute(sql_query)
    data = [{'Year': row.Year, 'Country': row.Country, 'Deaths': row.Deaths} for row in result]

    return jsonify(data)

    df = pd.DataFrame(data)
    df = df.groupby(["Country", "Year"]).sum("Deaths").reset_index()
    # df = df.loc[(df["Year"] == 2019)]
    #
    # cmap = plt.cm.cool
    # colors = cmap(np.linspace(0., 1., len(list(df['Country']))))
    #
    # explode = (0.05, 0.05, 0.05, 0.05, 0.05)
    #
    # fig, ax = plt.subplots(figsize =(15, 10))
    # wedges, texts, autotexts = ax.pie(df['Deaths'],
    #                                 autopct='%1.1f%%',
    #                                 explode = explode,
    #                                 shadow = True,
    #                                 colors = colors,
    #                                 startangle = 90,
    #                                 wedgeprops = { 'linewidth' : 1, 'edgecolor' : "red" },
    #                                 textprops = dict(color ="black"))
    #
    # ax.legend(wedges, df['Country'],
    #         title ="Continent",
    #         loc ="center left",
    #         bbox_to_anchor =(1, 0, 0.5, 1))
    #
    # plt.setp(autotexts, size = 10, weight ="bold")
    # ax.set_title("Nombres de morts sur la route par continent",loc='left')
    #
    # buffer = BytesIO()
    # plt.savefig(buffer, format='png')
    # buffer.seek(0)
    #
    # data_uri = base64.b64encode(buffer.read()).decode('utf-8')

    # return jsonify({'chart_data_uri': data_uri})
