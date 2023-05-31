import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayersCarousel from "./components/PlayersCarousel/PlayersCarousel";
import TeamStatistics from "./components/TeamStatistics/TeamStatistics";
import "./App.css";

function App() {

  const [playersStats, setPlayersStats] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [gameData, setGameData] = useState({});
  const [selectedPlayerId, setSelectedPlayer] = useState(null);

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
      setGameData(data.gameData);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  return (
    <div className="gridContainer">
      <div className="gridItem score">Score Placeholder</div>
      <div className="gridItem team">
        {playersStats.length > 0 && (
          <PlayersCarousel
            teamData={teamData}
            gameData={gameData}
            playersStats={playersStats}
            selectedPlayerId={selectedPlayerId}
            handlePlayerSelect={handlePlayerSelect}
          />
        )}
      </div>
      <div className="gridItem donuts">Donuts Placeholder</div>
      <div className="gridItem court">Court Placeholder</div>
      <div className="gridItem bars">Bars Placeholder</div>
      {teamData && (
        <TeamStatistics
          playersStats={playersStats}
          teamData={{ logo: teamData.logo }}
          selectedPlayerId={selectedPlayerId}
        />
      )}
    </div>
  );
}

export default App;
