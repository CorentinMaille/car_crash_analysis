import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CrashByCountryGraphicView() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fonction qui va chercher les données depuis l'API
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/countries');
            setData(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
          }
        };
    
        fetchData();
      }, []); 
    
    
    
    return (
        <>
            <h1 className="text-center">Crash by countries</h1>
            <div className="w-75 border rounded mx-auto mt-3" style={{height: "75vh"}}>
                {data != null ? (
                    <iframe srcDoc={data} style={{ width: '100%', height: '500px', border: 'none' }}/>

                ) : (
                    <h1>Chargement</h1>
                )}
            </div>
        </>
    )
}