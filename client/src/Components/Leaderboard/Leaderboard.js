import './Leaderboard.css'
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import React, {useState} from 'react';

const Leaderboard = ({ data }) => {

    const [sortedField, setSortedField] = useState('wpm');

    const handleClick = (colName) => {
        setSortedField(colName);
        console.log(sortedField);
    }

    return (
        <div className="leaderboard-container">
            <h className="title-text">leaderboard</h>
            <table className="leaderboard-table"> 
                <thead>

                    <tr>
                        <Tooltip
                        placement="top"
                        overlay={<span>rank</span>}
                        showArrow="false"
                        >
                            <th>#</th>
                        </Tooltip>

                        <th>username</th>

                        <Tooltip
                        placement="top"
                        overlay={<span>wpm</span>}
                        >
                            <th>
                                <button className="header" type="button" onClick = {() => handleClick('wpm')}>
                                    average speed {sortedField==='wpm'? '▼' : '▽'}
                                </button>
                            </th>
                        </Tooltip>

                        <Tooltip
                        placement="top"
                        overlay={<span>mins</span>}
                        showArrow="true"
                        >
                            <th>
                                <button className="header" type="button" onClick = {() => handleClick('time')}>
                                    time played {sortedField==='time'? '▼' : '▽'}
                                </button>
                            </th>
                        </Tooltip>

                        <th>
                            <button className="header" type="button" onClick = {() => handleClick('typed')}>
                            characters typed {sortedField==='typed'? '▼' : '▽'}
                            </button>
                        </th>

                        <Tooltip
                        placement="top"
                        overlay={<span>%</span>}
                        showArrow="false"
                        >
                            <th>
                                <button className="header" type="button" onClick = {() => handleClick('accuracy')}>
                                    average accuracy {sortedField==='accuracy'? '▼' : '▽'}
                                </button>
                            </th>
                        </Tooltip>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td style={{borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.wpm}</td>
                            <td>{user.time}</td>
                            <td>{user.typed}</td>
                            <td style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}>{user.accuracy*100}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
