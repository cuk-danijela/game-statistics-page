import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './PlayersCarousel.css';
import placeholderImg from '../../assets/placeholder.png';

const PlayersCarousel = ({ teamData, gameData, playersStats, selectedPlayerIndex, handlePlayerSelect }) => {
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            month: 'short',
            day: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const handleCarouselPlayerSelect = (selectedIndex) => {
        handlePlayerSelect(selectedIndex === 0 ? null : playersStats[selectedIndex - 1].id);
    };

    return (
        <Carousel
            className="custom-carousel"
            interval={null}
            fade
            activeIndex={selectedPlayerIndex}
            onSelect={handleCarouselPlayerSelect}
            indicators={false}
        >
            <Carousel.Item key="team">

                {teamData ? (
                    <>
                        <h4>ALL TEAM</h4>
                        <div className="image-container">
                            <img className="d-block slider-img" src={teamData.logo || placeholderImg} alt={teamData.name} />
                        </div>
                        <Carousel.Caption>
                            <h4>{teamData.name} vs {gameData.awayTeamName}</h4>
                            <h6>{getFormattedDate(gameData.date)}</h6>
                        </Carousel.Caption>
                    </>
                ) : (
                    <Carousel.Caption>
                        <h4>Team Data Unavailable</h4>
                    </Carousel.Caption>
                )}
            </Carousel.Item>
            {playersStats?.map((player, index) => (
                <Carousel.Item key={player.id} className={selectedPlayerIndex === index ? 'selected' : ''}>
                    <h4 className='invisible'>ALL TEAM</h4>
                    <div className="image-container">
                        <img className="d-block slider-img" src={player.avatar || placeholderImg} alt={player.firstName} />
                    </div>
                    <Carousel.Caption>
                        <h4>{player.firstName} {player.lastName}</h4>
                        {player.number ? <h6>Number {player.number}</h6> : <h6 className='invisible'>Number</h6>}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default PlayersCarousel;
