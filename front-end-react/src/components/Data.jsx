import React, { useState } from 'react';
import axios from 'axios';

export default function DataForm() {
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    code: '',
    year: '',
    deaths: '',
    sidedness: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8080/api/add_data', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Données ajoutées avec succès :', response.data);
        setFormData({
          category: '',
          country: '',
          code: '',
          year: '',
          deaths: '',
          sidedness: '',
        });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout des données :', error);
      });
  };
  

  return (
    <div>
      <h1>Ajouter des données en base de données</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Catégorie:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pays:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Année:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Décès:</label>
          <input
            type="text"
            name="deaths"
            value={formData.deaths}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Côté:</label>
          <input
            type="text"
            name="sidedness"
            value={formData.sidedness}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
