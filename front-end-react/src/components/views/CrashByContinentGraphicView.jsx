import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {FormControl, FormLabel, InputGroup} from "react-bootstrap";

function CrashByContinentGraphicView() {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(2019);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/camembert?year=' + year)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, [year]);

    function updateGraphic() {
        const yearValue = document.getElementById('year').value;
        setYear(yearValue);
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

                <InputGroup>
                    <FormLabel>Choisir une année</FormLabel>
                    <FormControl id="year" type="number" min={1990} max={2019} />
                </InputGroup>

                <Button id="submit" onClick={updateGraphic}>
                     Valider
                </Button>
            </div>
        </>
    );
}

export default CrashByContinentGraphicView;
