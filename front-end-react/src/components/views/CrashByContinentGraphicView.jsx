import React, {useEffect, useState} from 'react';
import axios from 'axios';

function CrashByContinentGraphicView() {
    const [data, setData] = useState(null);

    let year = ""

    document.getElementById("year").onclick(() => {
        year = document.getElementById("year");
    })

    document.getElementById("submit").onclick(() => {
        useEffect(() => {
            axios.get('http://127.0.0.1:8080/api/camembert?year=' + year)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error(error.message);
                });
        }, []);
    })

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/camembert?year=' + year)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    return (
        <>
            <h1 className="text-center">Crash by continent</h1>
            <div className="w-75 border rounded mx-auto mt-3" style={{height: "75vh"}}>
                {data != null ? (
                    <iframe srcDoc={data} style={{width: '100%', height: '500px', border: 'none'}}/>
                ) : (
                    <h1>Chargement</h1>
                )}

                <input id="year" type="number"/>
                <button id="submit">Submit</button>
            </div>
        </>
    );
}

export default CrashByContinentGraphicView;
