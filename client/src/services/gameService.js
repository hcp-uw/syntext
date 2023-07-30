import axios from 'axios'
// const axios = require('axios');

const baseURL = 'http://localhost:3001/api/game';


/*
    send POST request to /api/game/create endpoint with 
    game data in req header and token in auth header.
*/
const createGame = async game => {
  if (!verifyGameData(game)) return {
    success: false,
    error: "invalid game data"
  };
  let authToken = window.localStorage.getItem('authToken');
  try {
    const res = await axios.post(`${baseURL}/create`, game,
      {
        headers: {
          Authorization: authToken
        }
      }
    );
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
  }
};
const getGames = async (userID = undefined) => {

  let authToken = window.localStorage.getItem('authToken');
  try {
    const query = userID ? `?userID=${userID}` : ""
    const res = await axios.get(`${baseURL}/games${query}`);
    if (res.status === 200) return res.data;else return {
      success: false,
      error: res.status
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error
    };
  }
};

const getLeaderboardData = async (sort =  undefined) => {

  try {
    const query = sort ? `?sort=${sort}` : ""
    const res = await axios.get(`${baseURL}/leaderboard${query}`);
    if (res.status === 200) 
      return {
        result: res.data.result,
        success: true
      }
    else 
      return {
        success: false,
        error: res.status
      };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error
    };
  }
}


const deleteAllGames = async userID => {
  if (!userID) return {
    success: false,
    error: "invalid userID"
  };
  let authToken = window.localStorage.getItem('authToken');

  try {
    const res = await axios.delete(`${baseURL}/games`, {
      headers: {
        Authorization: authToken
      },
      data: {
        userID: userID
      }
    });
    if (res.status === 200) return {
      success: true
    };else return {
      success: false,
      error: res.status
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error
    };
  }
};
const verifyGameData = game => {
  const {
    userID,
    snippet_id,
    total_time,
    total_characters,
    wpm_data,
    wpm_avg,
    accuracy,
    num_mistakes
  } = game;
  
  return typeof userID !== undefined && typeof snippet_id !== undefined && typeof total_time !== undefined && typeof total_characters !== undefined && typeof wpm_avg !== undefined && typeof accuracy !== undefined && typeof num_mistakes !== undefined && wpm_data;
};

export {
  createGame,
  getGames,
  getLeaderboardData
}
// exports.createGame = createGame;
// exports.deleteAllGames = deleteAllGames;
// exports.getAllGames = getAllGames;