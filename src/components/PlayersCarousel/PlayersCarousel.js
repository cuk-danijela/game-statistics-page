import './PlayersCarousel.css';
import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const PlayersCarousel = ({ teamData, selectedPlayer, onPlayerSelect }) => {
    if (!teamData || !teamData.playersStats || teamData.playersStats.length === 0) {
        return <p>No team data available.</p>;
    }

    const handlePlayerSelect = (playerId) => {
        onPlayerSelect(playerId);
    };

    return (
        <MDBCarousel showControls showIndicators>
            {teamData.playersStats.map((player) => (
                <MDBCarouselItem key={player.id} className="w-100 d-block">
                    <img src={player.avatar} alt={player.firstName} />
                    <div className={selectedPlayer === player.id ? 'selected' : ''}>
                        <h5>{player.firstName} {player.lastName}</h5>
                        <p>Number: {player.number}</p>
                    </div>
                </MDBCarouselItem>
            ))}
        </MDBCarousel>
    );
};

export default PlayersCarousel;
