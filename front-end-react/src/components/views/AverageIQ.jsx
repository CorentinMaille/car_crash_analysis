import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function AverageIQ() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/iq")
            .then((res) => {
                setData(res.data);
                
                document.getElementById( 'data' ).addEventListener('load', e => {
                    let iFrame = e.currentTarget
                    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 50;
                })
            })
            .catch((error) => {
                console.log(error)
            });
      }, []); 
    
    return (
        <>
            <h1 className="text-center">Average IQ</h1>
            <Card className="p-3 overflow-auto" >
                {data != null ? (
                    <iframe srcDoc={data} id="data"/>

                ) : (
                    <h2>Chargement...</h2>
                )}
            </Card>
        </>
    )
}