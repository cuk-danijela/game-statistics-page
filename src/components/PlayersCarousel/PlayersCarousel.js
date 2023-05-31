import React, { useState } from 'react';
import './PlayersCarousel.css';
import Carousel from 'react-bootstrap/Carousel';
import placeholderImage from '../../assets/placeholder.png'




const PlayersCarousel = ({ teamData, playersStats, handlePlayerSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleCarouselPlayerSelect = (playerId) => {
        setSelectedPlayer(playerId);
        handlePlayerSelect(playerId);
    };

    return (
        <>
            <Carousel indicators={false} fade>
                {playersStats?.map((player) => (
                    <Carousel.Item key={player.id}>
                        <div className="image-container">
                            <img
                                className="slider-img"
                                src={player.avatar || require('../../assets/placeholder.png')}
                                alt={player.firstName}
                            />
                        </div>
                        <div
                            className={`player ${selectedPlayer === player.id ? 'active' : ''}`}
                            onClick={() => handleCarouselPlayerSelect(player.id)}
                        ></div>
                        <Carousel.Caption>
                            <h4>{player.firstName} {player.lastName}</h4>
                            <h6>Number {player.number}</h6>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default PlayersCarousel;
