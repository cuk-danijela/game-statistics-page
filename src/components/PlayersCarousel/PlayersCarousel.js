import React, { useState } from 'react';
import './PlayersCarousel.css';
import Carousel from 'react-bootstrap/Carousel';

const PlayersCarousel = ({ teamData, playersStats, handlePlayerSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleCarouselPlayerSelect = (playerId) => {
        setSelectedPlayer(playerId);
        handlePlayerSelect(playerId);
    };

    return (
        <>
            {playersStats?.map((player) => (
                <Carousel.Item key={player.id}>
                    {player.avatar && (
                        <img className="d-block w-100" src={player.avatar} alt={player.firstName} />
                    )}
                    <div
                        className={`player ${selectedPlayer === player.id ? 'active' : ''}`}
                        onClick={() => handleCarouselPlayerSelect(player.id)}
                    ></div>
                    <Carousel.Caption>
                        <h3>
                            <h5>
                                {player.firstName} {player.lastName}
                            </h5>
                        </h3>
                        <p>Number: {player.number}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </>
    );
};

export default PlayersCarousel;
