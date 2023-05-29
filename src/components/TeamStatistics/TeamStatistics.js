import './TeamStatistics.css'


const TeamStatistics = (props) => {

    const { playersStats } = props;

    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <>
            {
                playersStats ? (
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>PTS</th>
                                <th>FT</th>
                                <th>FG</th>
                                <th>3 PTS</th>
                                <th>AST</th>
                                <th>O/R</th>
                                <th>D/R</th>
                                <th>T/O</th>
                                <th>STL</th>
                                <th>BS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersStats.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.number}</td>
                                    <td>{player.avatar ? (
                                        <img
                                            src={player.avatar}
                                            alt="avatar"
                                            className="avatar"
                                        />
                                    ) : (
                                        <div className="no-avatar">
                                            {getInitials(player.firstName, player.lastName)}
                                        </div>
                                    )}</td>
                                    <td>{player.firstName} {player.lastName}</td>
                                    <td></td>
                                    <td>{player.stats.FT !== undefined ? player.stats.FT : '-'}</td>
                                    <td>{player.stats.FG !== undefined ? player.stats.FG : '-'}</td>
                                    <td>{player.stats['3AST'] !== undefined ? player.stats['3AST'] : '-'}</td>
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
                )
            }
        </>
    )
}





export default TeamStatistics;