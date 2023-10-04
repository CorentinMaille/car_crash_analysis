import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CrashByContinentGraphicView() {
  const [chartDataURI, setChartDataURI] = useState('');

  useEffect(() => {
    // Faites une requête pour obtenir le graphique à partir de l'API Flask
    axios.get('/api/camembert')

      .then(response => {
        const dataURI = response.data.chart_data_uri;
        setChartDataURI(dataURI);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {chartDataURI && <img src={`data:image/png;base64,${chartDataURI}`} alt="Chart" />}
    </div>
  );
}

export default CrashByContinentGraphicView;
