import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function DataForm() {
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    code: '',
    year: '',
    deaths: '',
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
        <Form.Group className="mt-3">
          <Form.Label>Catégorie:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Pays:</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Code:</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Année:</Form.Label>
          <Form.Control
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Décès:</Form.Label>
          <Form.Control
            type="text"
            name="deaths"
            value={formData.deaths}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Ajouter</Button>
      </form>
    </div>
  );
}
