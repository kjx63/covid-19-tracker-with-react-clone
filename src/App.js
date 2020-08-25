import React, { useState, useEffect } from 'react';
import './App.css';

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        const data = await response.json();
        setCountryInfo(data);
      };
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCountry(countryCode);
      setCountryInfo(data);
    } catch (err) {
      console.error(err.message);
    }

    console.log(countryInfo);
  };

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='worldwide'>WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox
            title='Coronavirus Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
