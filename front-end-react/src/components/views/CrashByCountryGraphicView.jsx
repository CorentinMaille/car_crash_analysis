import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function CrashByCountryGraphicView() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/countries")
            .then((res) => {
                setData(res.data);
                
                document.getElementById( 'data' ).addEventListener('load', e => {
                    let iFrame = e.currentTarget
                    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
                    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 50;
                })
            })
            .catch((error) => {
                console.log(error)
            });
      }, []); 
    
    return (
        <>
            <h1 className="text-center">Analyse par pays</h1>
            <Card className="p-3 overflow-auto" >
                <h2>Morts sur la route par pays</h2>
                {data != null ? (
                    <iframe srcDoc={data} id="data"/>

                ) : (
                    <h3>Chargement...</h3>
                )}
            </Card>
        </>
    )
}