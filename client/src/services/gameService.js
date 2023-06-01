import axios from 'axios'
// const axios = require('axios');

const baseURL = 'http://localhost:3001/api/game';
let authToken = window.localStorage.getItem('authToken');

/*
    send POST request to /api/game/create endpoint with 
    game data in req header and token in auth header.
*/
const createGame = async game => {
  if (!verifyGameData(game)) return {
    success: false,
    error: "invalid game data"
  };
  try {
    const res = await axios.post(`${baseURL}/create`, {
      headers: {
        Authorization: authToken
      },
      ...game
    });
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
  }
};

const getAllGames = async userID => {
  if (!userID) return {
    success: false,
    error: "invalid userID"
  };
  try {
    const res = await axios.get(`${baseURL}/games`, {
      data: {
        userID: userID
      }
    });
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
const deleteAllGames = async userID => {
  if (!userID) return {
    success: false,
    error: "invalid userID"
  };
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
  createGame
}
// exports.createGame = createGame;
// exports.deleteAllGames = deleteAllGames;
// exports.getAllGames = getAllGames;