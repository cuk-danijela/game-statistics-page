import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TeamStatistics from './components/TeamStatistics/TeamStatistics';

function App() {

  const [playersStats, setPlayersStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fehomeassignment-jxn3r4tyqq-ez.a.run.app');
      const data = response.data;

      setPlayersStats(data.playersStats);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="grid-container">
      <div className="grid-item score">Score Placeholder</div>
      <div className="grid-item team">All team</div>
      <div className="grid-item donuts">Donuts Placeholder</div>
      <div className="grid-item court">Court Placeholder</div>
      <div className="grid-item bars">Bars Placeholder</div>
      <div className="grid-item table"><TeamStatistics playersStats={playersStats} /></div>
    </div>
  );
}

export default App;
