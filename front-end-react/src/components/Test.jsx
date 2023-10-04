import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Flask API</h1>
      <div>
        {data.map((item) => (
          <p key={item.Country}>{item.Country}</p>
        ))}
      </div>
    </div>
  );
}
