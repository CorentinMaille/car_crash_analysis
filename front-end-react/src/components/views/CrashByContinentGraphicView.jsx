import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Container, FloatingLabel, FormControl, FormLabel, InputGroup, Row} from "react-bootstrap";
import FormRange from "react-bootstrap/FormRange";

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
        const yearValue = document.getElementById('year-range').value;
        setYear(yearValue);
    }

    return (
        <>
            <h1 className="text-center">Analyse par continent</h1>
            <div className="w-75 border rounded mx-auto mt-3" style={{height: "75vh"}}>
                {data != null ? (
                    <iframe srcDoc={data} style={{width: '100%', height: '500px', border: 'none'}}/>
                ) : (
                    <h1>Chargement</h1>
                )}

                {/*<FloatingLabel controlId="floatingLabel" label="Sélectionner une année" className="mx-auto w-50">*/}
                {/*    <FormControl id="year" type="number"*/}
                {/*                  min={1990} max={2019}*/}
                {/*                  className=""*/}
                {/*                  // style={{width: "250px"}}*/}
                {/*                  placeholder="Sélectionner une année" />*/}
                {/*</FloatingLabel>*/}

                {/*<label htmlFor="year-range" className="form-label">Sélectionner une année</label>*/}
                {/*<input type="range" className="form-range" min="1990" max="2019" step="1" id="year-range"*/}
                {/*       onChange={updateGraphic} />*/}
                <Container>
                    <Row>
                        <FormLabel className={"text-center"}>Sélectionner une année</FormLabel>
                    </Row>
                    <Row>
                        <h1 className={"text-center"}>{year}</h1>
                    </Row>
                    <Row>
                        <FormRange className={"mx-auto w-75"} step="1" id="year-range" min="1990" max="2019" defaultValue={2019} onChange={updateGraphic} />
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default CrashByContinentGraphicView;
