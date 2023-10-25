import { useEffect, useRef, useState } from 'react';
import { getLeaderboardData } from '../services/gameService';
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
    const [result, setResult] = useState([]);
    const [sortedField, setSortedField] = useState("wpm")
    useEffect(() => {
        getLeaderboardData(sortedField).then(res =>
            setResult(res.resul.slice(0, Math.min(10, res.length))))
    }, [sortedField])

    return (
        <div className="page-container">
            <Leaderboard data={result} sortedField={sortedField} setSortedField={setSortedField}/>
        </div>
    )
}


export default LeaderboardPage;