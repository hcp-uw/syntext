import Leaderboard from '../Components/Leaderboard/Leaderboard';


const mock = [
    {
        username: 'elijah',
        wpm: 10,
        time: 800,
        typed: 3600,
        accuracy: .75,
    },
    {
        username: 'harshi',
        wpm: 43,
        time: 800,
        typed: 3600,
        accuracy: .75,
    },
    {
        username: 'kai',
        wpm: 44,
        time: 800,
        typed: 3600,
        accuracy: .75,
    },
    {
        username: 'kai',
        wpm: 44,
        time: 850,
        typed: 3650,
        accuracy: .76,
    },
    {
        username: 'william',
        wpm: 1,
        time: 1000,
        typed: 30,
        accuracy: .5,
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