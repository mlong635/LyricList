import axios from 'axios';

export const FETCH_SONGS = 'FETCH_SONGS';
export const CREATE_SONG = 'CREATE_SONG';
export const FETCH_SONG = 'FETCH_SONG';
export const DELETE_SONG = 'DELETE_SONG';
export const EDIT_SONG = 'EDIT_SONG';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export function fetchSongs(){
  const url = '/database/allSongs';
  const request = axios.get(url);
  return {
    type: FETCH_SONGS,
    payload: request,
  };
}

export function createSong(props){
  console.log("actions.js createSong props", props);

  const url = '/database/createSong';
  const request = axios.post(url, props);

  return {
    type: CREATE_SONG,
    payload: request
  }
}

export function fetchOneSong(id) {
  const url = '/database/fetchOneSong';
  const request = axios.get(url, id);

  return {
    type: FETCH_SONG,
    payload: request
  }
}

export function editSong(id) {
  const url = '/database/editSong';
  const request = axios.get(url, id);

  return {
    type: EDIT_SONG,
    payload: request
  }
}

export function deleteSong(id){
  const url = '/database/deleteSong';
  const request = axios.get(url, id);

  return {
    type: DELETE_SONG,
    payload: request
  }
}

export function submitLogin(props){
  console.log("actions.js submitLogin props", props);
  const url = '/database/submitLogin';
  const request = axios.post(url, props);

  return {
    type: SUBMIT_LOGIN,
    payload: request
  }
}