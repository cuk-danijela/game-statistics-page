import React, { useState } from 'react';
import './TeamStatistics.css';

const TeamStatistics = ({ playersStats, teamData, selectedPlayerId }) => {

    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        return `${firstInitial}${lastInitial}`;
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortArrow = (column) => {
        return sortColumn === column ? (sortOrder === 'asc' ? <span>&#9650;</span> : <span>&#9660;</span>) : null;
    };

    const sortPlayersStats = () => {
        const sortedStats = [...playersStats];

        sortedStats.sort((a, b) => {
            const columnA = sortColumn === 'PTS'
                ? (a.stats['3 PTS'] || 0) + (a.stats.FT || 0) + (a.stats.FG || 0)
                : a.stats[sortColumn] || 0;
            const columnB = sortColumn === 'PTS'
                ? (b.stats['3 PTS'] || 0) + (b.stats.FT || 0) + (b.stats.FG || 0)
                : b.stats[sortColumn] || 0;

            return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        });
        return sortedStats;
    };

    const calculateTeamStats = () => {
        let teamStats = {
            PTS: 0,
            FT: 0,
            FG: 0,
            '3 PTS': 0,
            AST: 0,
            'O/R': 0,
            'D/R': 0,
            'T/O': 0,
            STL: 0,
            BS: 0
        };

        if (playersStats) {
            playersStats.forEach((player) => {
                teamStats.PTS += (player.stats['3 PTS'] || 0) + (player.stats.FT || 0) + (player.stats.FG || 0);
                teamStats.FT += player.stats.FT || 0;
                teamStats.FG += player.stats.FG || 0;
                teamStats['3 PTS'] += player.stats['3 PTS'] || 0;
                teamStats.AST += player.stats.AST || 0;
                teamStats['O/R'] += player.stats['O/R'] || 0;
                teamStats['D/R'] += player.stats['D/R'] || 0;
                teamStats['T/O'] += player.stats['T/O'] || 0;
                teamStats.STL += player.stats.STL || 0;
                teamStats.BS += player.stats.BS || 0;
            });
        }

        return teamStats;
    };

    const teamStats = calculateTeamStats();
    const sortedPlayersStats = sortColumn ? sortPlayersStats() : playersStats;

    return (
        <>
            {playersStats ? (
                <table className="rounded-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="sortable" onClick={() => handleSort('PTS')}>
                                PTS {sortArrow('PTS')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('FT')}>
                                FT {sortArrow('FT')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('FG')}>
                                FG {sortArrow('FG')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('3 PTS')}>
                                3 PTS {sortArrow('3 PTS')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('AST')}>
                                AST {sortArrow('AST')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('O/R')}>
                                O/R {sortArrow('O/R')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('D/R')}>
                                D/R {sortArrow('D/R')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('T/O')}>
                                T/O {sortArrow('T/O')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('STL')}>
                                STL {sortArrow('STL')}
                            </th>
                            <th className="sortable" onClick={() => handleSort('BS')}>
                                BS {sortArrow('BS')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <img src={teamData && teamData.logo} alt="Team Logo" className="avatar" />
                            </td>
                            <td className="alignLeft">{teamData && teamData.name}</td>
                            <td>{teamStats.PTS}</td>
                            <td>{teamStats.FT}</td>
                            <td>{teamStats.FG}</td>
                            <td>{teamStats['3 PTS']}</td>
                            <td>{teamStats.AST}</td>
                            <td>{teamStats['O/R']}</td>
                            <td>{teamStats['D/R']}</td>
                            <td>{teamStats['T/O']}</td>
                            <td>{teamStats.STL}</td>
                            <td>{teamStats.BS}</td>
                        </tr>
                        {sortedPlayersStats.map((player) => (
                            <tr key={player.id} className={selectedPlayerId === player.id ? 'selected' : ''}>
                                <td>{player.number && <div className="num">{player.number}</div>}</td>
                                <td>
                                    {player.avatar ? (
                                        <img src={player.avatar} alt="avatar" className="avatar" />
                                    ) : (
                                            <div className="noAvatar">{getInitials(player.firstName, player.lastName)}</div>
                                    )}
                                </td>
                                <td className="alignLeft">{`${player.firstName} ${player.lastName}`}</td>
                                <td>{(player.stats['3 PTS'] || 0) + (player.stats.FT || 0) + (player.stats.FG || 0)}</td>
                                <td>{player.stats.FT || 0}</td>
                                <td>{player.stats.FG || 0}</td>
                                <td>{player.stats['3 PTS'] || 0}</td>
                                <td>{player.stats.AST || 0}</td>
                                <td>{player.stats['O/R'] || 0}</td>
                                <td>{player.stats['D/R'] || 0}</td>
                                <td>{player.stats['T/O'] || 0}</td>
                                <td>{player.stats.STL || 0}</td>
                                <td>{player.stats.BS || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default TeamStatistics;
