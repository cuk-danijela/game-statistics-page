import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import placeholderImg from '../../assets/placeholder.png';
import './PlayersCarousel.css';

const PlayersCarousel = ({ teamData, gameData, playersStats, selectedPlayerIndex, handlePlayerSelect }) => {

    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            month: 'short',
            day: '2-digit',
            year: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const handleCarouselPlayerSelect = (selectedIndex) => {
        handlePlayerSelect(selectedIndex === 0 ? null : playersStats[selectedIndex - 1].id);
    };

    return (
        <Carousel
            className="customCarousel"
            interval={null}
            fade
            activeIndex={selectedPlayerIndex}
            onSelect={handleCarouselPlayerSelect}
            indicators={false}
        >
            <Carousel.Item key="team">

                {teamData ? (
                    <>
                        <h6>ALL TEAM</h6>
                        <div className="imageContainer">
                            <img className="d-block sliderImg" src={teamData.logo || placeholderImg} alt={teamData.name} />
                        </div>
                        <Carousel.Caption>
                            <h4>{teamData.name} VS {gameData.awayTeamName}</h4>
                            <h6 className='text-secondary'>{getFormattedDate(gameData.date)}</h6>
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
                    <h6 className='invisible'>ALL TEAM</h6>
                    <div className="imageContainer">
                        <img className="d-block sliderImg" src={player.avatar || placeholderImg} alt={player.firstName} />
                    </div>
                    <Carousel.Caption>
                        <h4>{player.firstName} {player.lastName}</h4>
                        {player.number ? <h6 className='text-secondary'>Number {player.number}</h6> : <h6 className='invisible'>Number</h6>}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default PlayersCarousel;
