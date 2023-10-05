import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

function CrashByContinentGraphicView() {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/camembert?year=' + year)
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error.message);
            });
    }, [year]);

    const updateGraphic = () => {
        const yearValue = document.getElementById('year-input').value;
        setYear(yearValue)
    }

    return (
        <>
            <h1 className="text-center">Crash by continent</h1>
            <div className="w-75 border rounded mx-auto mt-3" style={{height: "75vh"}}>
                {data != null ? (
                    <iframe srcDoc={data} style={{width: '100%', height: '500px', border: 'none'}}/>
                ) : (
                    <h1>Chargement</h1>
                )}

                <div id="iframe-container"></div>

                <FormGroup>
                    <FormLabel>Sélectionnez une année</FormLabel>
                    <FormControl type="number" id="year-input" defaultValue="2019" min={1990} max={2019} width={50}></FormControl>
                </FormGroup>
                <Button id="submit-btn" onClick={updateGraphic}>
                    Valider
                </Button>
            </div>
        </>
    );
}

export default CrashByContinentGraphicView;
