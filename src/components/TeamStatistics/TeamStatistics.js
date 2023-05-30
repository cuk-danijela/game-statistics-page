import React, { useState } from 'react';
import './TeamStatistics.css';

const TeamStatistics = ({ teamData, selectedPlayer, playersStats }) => {

    const [sortColumn, setSortColumn] = useState(''); // Track the currently sorted column
    const [sortOrder, setSortOrder] = useState(''); // Track the sorting order (asc or desc)

    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        return `${firstInitial}${lastInitial}`;
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            // If the same column is clicked, toggle the sorting order
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If a new column is clicked, set the sorting column and order to default (asc)
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortArrow = (column) => {
        if (sortColumn === column) {
            // Return the appropriate arrow icon based on the sorting order
            return sortOrder === 'asc' ? <span>&#9650;</span> : <span>&#9660;</span>;
        }
        return null;
    };

    const sortPlayersStats = () => {
        const sortedStats = [...playersStats];

        sortedStats.sort((a, b) => {
            const totalA = (a.stats['3 PTS'] || 0) + (a.stats.FT || 0) + (a.stats.FG || 0);
            const totalB = (b.stats['3 PTS'] || 0) + (b.stats.FT || 0) + (b.stats.FG || 0);

            if (sortOrder === 'asc') {
                return totalA - totalB;
            } else {
                return totalB - totalA;
            }
        });

        return sortedStats;
    };


    const calculateTeamStats = () => {
        let totalPTS = 0;
        let totalFT = 0;
        let totalFG = 0;
        let total3PTS = 0;
        let totalAST = 0;
        let totalOR = 0;
        let totalDR = 0;
        let totalTO = 0;
        let totalSTL = 0;
        let totalBS = 0;

        if (playersStats) {
            playersStats.forEach((player) => {
                playersStats.forEach((player) => {
                    const pts = (player.stats['3PTS'] || 0) + (player.stats.FT || 0) + (player.stats.FG || 0);
                    totalPTS += pts;
                    const threePts = player.stats['3PTS'] || 0;
                    total3PTS += threePts;
                });
                totalFT += player.stats.FT || 0;
                totalFG += player.stats.FG || 0;
                totalAST += player.stats.AST || 0;
                totalOR += player.stats['O/R'] || 0;
                totalDR += player.stats['D/R'] || 0;
                totalTO += player.stats['T/O'] || 0;
                totalSTL += player.stats.STL || 0;
                totalBS += player.stats.BS || 0;
            });
        }

        return {
            totalPTS,
            totalFT,
            totalFG,
            total3PTS,
            totalAST,
            totalOR,
            totalDR,
            totalTO,
            totalSTL,
            totalBS,
        };
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
                            <td><img src={teamData.logo} alt="Team Logo" className="avatar" /></td>
                            <td className='align-left'>{teamData.name}</td>
                            <td>{teamStats.totalPTS}</td>
                            <td>{teamStats.totalFT}</td>
                            <td>{teamStats.totalFG}</td>
                            <td>{teamStats.total3PTS}</td>
                            <td>{teamStats.totalAST}</td>
                            <td>{teamStats.totalOR}</td>
                            <td>{teamStats.totalDR}</td>
                            <td>{teamStats.totalTO}</td>
                            <td>{teamStats.totalSTL}</td>
                            <td>{teamStats.totalBS}</td>
                        </tr>
                        {sortedPlayersStats.map((player) => (
                            <tr key = {player.id} className={selectedPlayer === player.id ? 'highlighted' : ''}
                            >
                                <td>{player.number && <div className='num'>{player.number}</div>}</td>
                                <td>
                                    {player.avatar ? (
                                        <img src={player.avatar} alt="avatar" className="avatar" />
                                    ) : (
                                        <div className="no-avatar">
                                            {getInitials(player.firstName, player.lastName)}
                                        </div>
                                    )}
                                </td>
                                <td className='align-left'>{player.firstName} {player.lastName}</td>
                                <td>
                                    {player.stats['3 PTS'] !== undefined && player.stats.FT !== undefined && player.stats.FG !== undefined
                                        ? player.stats['3 PTS'] + player.stats.FT + player.stats.FG
                                        : '-'}
                                </td>
                                <td>{player.stats.FT !== undefined ? player.stats.FT : '-'}</td>
                                <td>{player.stats.FG !== undefined ? player.stats.FG : '-'}</td>
                                <td>{player.stats['3 PTS'] !== undefined ? player.stats['3 PTS'] : '-'}</td>
                                <td>{player.stats.AST !== undefined ? player.stats.AST : '-'}</td>
                                <td>{player.stats['O/R'] !== undefined ? player.stats['O/R'] : '-'}</td>
                                <td>{player.stats['D/R'] !== undefined ? player.stats['D/R'] : '-'}</td>
                                <td>{player.stats['T/O'] !== undefined ? player.stats['T/O'] : '-'}</td>
                                <td>{player.stats.STL !== undefined ? player.stats.STL : '-'}</td>
                                <td>{player.stats.BS !== undefined ? player.stats.BS : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading team statistics...</p>
            )}
        </>
    );
};

export default TeamStatistics;
