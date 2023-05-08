import './Leaderboard.css'

const Leaderboard = ({ data }) => {

    return (
        <div className="leaderboard-container">
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Average WPM</th>
                        <th>Time Played</th>
                        <th>Characters Typed</th>
                        <th>Average Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.wpm}</td>
                            <td>{user.time}</td>
                            <td>{user.typed}</td>
                            <td>{user.accuracy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
