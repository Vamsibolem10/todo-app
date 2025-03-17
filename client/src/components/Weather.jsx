import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('City not found or server error');
      setWeather(null);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Weather Checker
      </Typography>
      <TextField
        label="Enter city"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchWeather}
        style={{ marginBottom: '20px' }}
      >
        Get Weather
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {weather && (
        <Card style={{ marginTop: '20px', backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Weather in {weather.name}
            </Typography>
            <Typography variant="h6">Temperature: {weather.main.temp} °C</Typography>
            <Typography variant="h6">Humidity: {weather.main.humidity}%</Typography>
            <Typography variant="h6">Condition: {weather.weather[0].description}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
