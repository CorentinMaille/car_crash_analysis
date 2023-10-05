import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

export default function UpdateDataForm() {
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    code: '',
    year: '',
    deaths: '',
  });
  const [years, setYears] = useState(null)
  const [year, setYear] = useState(null)
  const [ids, setIds] = useState(null)
  const [id, setId] = useState("null")


  useEffect(() => {
    axios.get("http://localhost:8080/api/get_years")
        .then((res) => {
          setYears(res.data)
        })
        .catch((error) => {
            console.log(error)
        });

  }, []); 

  useEffect(() => {
    axios.get("http://localhost:8080/api/countries_by_year?year=" + year)
        .then((res) => {
          setIds(res.data)
        })
        .catch((error) => {
            console.log(error)
        });

  }, [year]); 

  useEffect(() => {
    axios.get("http://localhost:8080/api/get_data/" + id)
        .then((res) => {
          setFormData(res.data)
        })
        .catch((error) => {
            console.log(error)
            setFormData({
              category: '',
              country: '',
              code: '',
              year: '',
              deaths: '',
            });
        });

  }, [id]); 
  
  const HandleIdChange = (e) => {
    setId(e.currentTarget.value)
  };

  const HandleYearChange = (e) => {
    setYear(e.currentTarget.value)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.put('http://localhost:8080/api/update_data/' + formData.id, formData, {
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
        setId("null")
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout des données :', error);
      });
  };
  

  return (
    <div>
      <h1>Modifier des données en base de données</h1>
      <Form.Label>Sélectionner l'élément à modifier:</Form.Label>
      <Form.Select aria-label="Years" onChange={HandleYearChange} value={year}>
        <option value="null">Sélectionner une année</option>
        { years != null ? (
          <>
          {years.map(el => {
            return <option value={el}>{el}</option>
          })}
          </>
        ) : (<><option value="test">test</option></>)}
      </Form.Select>
      {year != null ? (
        <Form.Select aria-label="Id" onChange={HandleIdChange} value={id} className='mt-3'>
          <option value="null">Sélectionner un pays</option>
          {ids != null ? (
            <>
            {ids.map(el => {
              return <option value={el.id}>{el.Country}</option>
            })}
            </>
          ) : <></>}
        </Form.Select>
      ): <></>}
      <Card className='mt-3 p-3'>
        <form onSubmit={handleSubmit}>
          <Form.Group>
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
      </Card>
    </div>
  );
}
