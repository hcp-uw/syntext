import './Leaderboard.css'

const Leaderboard = ({ data }) => {


    return (
        <div className="leaderboard-container">
            <h className="title-text">leaderboard</h>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>username</th>
                        <th>average wpm</th>
                        <th>time played</th>
                        <th>characters typed</th>
                        <th>average accuracy</th>
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
