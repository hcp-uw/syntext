import React, { useEffect, useState, useRef } from 'react'
import './AccountManager.css'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUserID } from '../../redux/user/userStateActions'
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../services/gameService'
import GameChart from '../GameSummary/GameChart'
import Game from '../Game/Game'


const GameChartModal = ({ displayedData, onClose }) => {
  return (
    <div className='game-chart-modal'>
      <GameChart displayedData={displayedData} />
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

const GameViewer = ({ date, dataTyped, accuracy, averageWPM, setDisplayedData, displayedData }) => {
  const [showChartModal, setShowChartModal] = useState(false);

  const handleExpand = () => {
    setShowChartModal(true);
    setDisplayedData(null);
    setDisplayedData(dataTyped);
  };

  return (
    <>
      <td>{date}</td>
      <td>{accuracy}</td>
      <td>{averageWPM}</td>
      <td>
        {displayedData === null && <button onClick={() => handleExpand(dataTyped)}>
          View
        </button>}
      </td>
    </>
  );
};

const ViewGames = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const userID = useSelector(s => s.userState.userID);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const g = await getGames(userID);
      if (g && g.success) {
        setGames(g.result);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [displayedData, setDisplayedData] = useState(null);

  return (
    <div className='view-games'>
      <h2>View Games</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='games-list'>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Accuracy</th>
                <th>Average WPM</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, i) => (
                <tr key={i}>
                  <GameViewer
                    date={new Date(game.time_stamp).toLocaleDateString()}
                    dataTyped={game.wpm_data
                      ?.split(',')
                      .map((p) => parseInt(p))}
                    accuracy={game.accuracy}
                    averageWPM={game.wpm_avg}
                    setDisplayedData={setDisplayedData}
                    displayedData={displayedData}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {displayedData !== null && (
        <GameChartModal
          displayedData={displayedData}
          onClose={() => {
            setDisplayedData(null);
          }}
        />
      )}
    </div>
  );
};


const AccountManager = (props) => {
  const dispatch = useDispatch()
  //   const [username, setUsername] = useState(user.username);
  //   const [profilePic, setProfilePic] = useState(user.profilePic);
  //   const [isPrivate, setIsPrivate] = useState(user.isPrivate);
  //   const [resetHistory, setResetHistory] = useState(false);

  const navivate = useNavigate()
  // const handleUsernameChange = event => {}

  // const handleProfilePicChange = event => {}

  // const handlePrivateChange = event => {}

  // const handleResetHistoryChange = event => {}

  const handleSave = () => {}

  const handleLogout = () => {
    window.localStorage.removeItem(`authToken`)
    dispatch(setUserID(undefined))
    dispatch(setLoggedIn(false))
    navivate('/')
  }

  return (
    <div className='account-manager'>
      <ViewGames />
      {/* <h2>Account Manager</h2>
      <div className='input-wrapper'>
        <label htmlFor='username-input'>Username:</label>
        <input
          id='username-input'
          type='text'
          value=''
          onChange={handleUsernameChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='profile-pic-input'>Profile Picture:</label>
        <input
          id='profile-pic-input'
          type='text'
          value=''
          onChange={handleProfilePicChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='private-checkbox'>Private Account:</label>
        <input
          id='private-checkbox'
          type='checkbox'
          checked={false}
          onChange={handlePrivateChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='reset-history-checkbox'>Reset Account History:</label>
        <input
          id='reset-history-checkbox'
          type='checkbox'
          checked={false}
          onChange={handleResetHistoryChange}
        />
      </div>
      <button className='save-button' onClick={handleSave}>
        Save Changes
      </button> */}
      <button
        className='logout-button'
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default AccountManager
