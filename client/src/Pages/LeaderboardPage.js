import Leaderboard from '../Components/Leaderboard/Leaderboard';


const mock = [
    {
        username: 'elijah',
        wpm: 45,
        time: 800,
        typed: 3600,
        accuracy: .75,
    },
    {
        username: 'harshi',
        wpm: 45,
        time: 800,
        typed: 3600,
        accuracy: .75,
    },
    {
        username: 'kai',
        wpm: 45,
        time: 800,
        typed: 3600,
        accuracy: .75,
    }
]


const LeaderboardPage = () => {



    return (
        <div className="page-container">
            <Leaderboard data={mock}/>
        </div>
    )
}


export default LeaderboardPage;