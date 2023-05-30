import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PlayersCarousel from "./components/PlayersCarousel/PlayersCarousel";
import TeamStatistics from "./components/TeamStatistics/TeamStatistics";

function App() {
  const [playersStats, setPlayersStats] = useState(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fehomeassignment-jxn3r4tyqq-ez.a.run.app"
      );
      const data = response.data;

      setPlayersStats(data.playersStats);
      setTeamData(data.teamData);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-item score">Score Placeholder</div>
      <div className="grid-item team">
        <PlayersCarousel teamData={teamData} playersStats={playersStats} />
      </div>
      <div className="grid-item donuts">Donuts Placeholder</div>
      <div className="grid-item court">Court Placeholder</div>
      <div className="grid-item bars">Bars Placeholder</div>
      <TeamStatistics playersStats={playersStats} teamData={teamData} />
    </div>
  );
}

export default App;
