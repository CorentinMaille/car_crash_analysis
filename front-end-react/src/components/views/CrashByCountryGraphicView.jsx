import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

export default function CrashByCountryGraphicView() {
    const [data, setData] = useState(null);
    const [key, setKey] = useState('world_percent');
    const [subData, setSubData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/countries")
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

    useEffect(() => {
        axios.get("http://localhost:8080/api/" + key)
            .then((res) => {
                setSubData(res.data);
                
                document.getElementById( 'subData' ).addEventListener('load', e => {
                    let iFrame = e.currentTarget
                    iFrame.height = iFrame.contentWindow.document.body.scrollHeight + 50;
                })
            })
            .catch((error) => {
                console.log(error)
            });
      }, [key]); 
    
    const HandleClick = e => {
        setKey(e.currentTarget.dataset.key)
        document.getElementById('subDataName').innerText = e.currentTarget.dataset.name
    }
      
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
                <Nav variant="tabs" defaultActiveKey="world_percent">
                    <Nav.Item>
                        <Nav.Link onClick={HandleClick} eventKey="world_percent" data-key="world_percent" data-name="Proportion de la population global morte sur la route en %">Proportion</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={HandleClick} eventKey="world_area" data-key="world_area" data-name="Territoire en km²">Territoire</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={HandleClick} eventKey="world_population" data-key="world_population" data-name="Population">Population</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={HandleClick} eventKey="world_density" data-key="world_density" data-name="Densité en habitant/km²">Densité</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={HandleClick} eventKey="iq" data-key="iq" data-name="Q.I. moyen">Q.I. moyen</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Card className='border-top-0 rounded-top-0'>
                    <h3 id="subDataName" className='ms-3 mt-3'>Proportion de la population global morte sur la route (en %)</h3>
                    {subData != null ? (
                        <iframe srcDoc={subData} id="subData"/>

                    ) : (
                        <h3>Chargement...</h3>
                    )}
                </Card>
            </Card>
        </>
    )
}