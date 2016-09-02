import axios from 'axios';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const CREATE_USER_PROFILE = 'CREATE_USER_PROFILE';

export const FETCH_SONGS = 'FETCH_SONGS';
export const CREATE_SONG = 'CREATE_SONG';
export const FETCH_SONG = 'FETCH_SONG';
export const DELETE_SONG = 'DELETE_SONG';
export const EDIT_SONG = 'EDIT_SONG';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_CREATE_ACCOUNT = 'SUBMIT_CREATE_ACCOUNT';
export const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE';

export function saveUserProfile(userProfile){
  const url = '/database/saveUserProfile';
  const request = axios.post(url, userProfile);

  return {
    type: SAVE_USER_PROFILE,
    payload: request
  }
}

export function createUserProfile(props){
  const url = '/database/createUserProfile';
  const request = axios.post(url, props);

  return {
    type: CREATE_USER_PROFILE,
    payload: request
  }
}

export function fetchUserProfile(id){
  console.log("actions.js fetchUserProfile id ", id);
  const url = '/database/fetchUserProfile';
  const request = axios.post(url, id);
  
  return {
    type: FETCH_USER_PROFILE,
    payload: request
  }
}

export function fetchSongs(){
  const url = '/database/allSongs';
  const request = axios.get(url);
  return {
    type: FETCH_SONGS,
    payload: request,
  };
}

export function createSong(songInfo){
  console.log("actions.js createSong props", songInfo);

  const url = '/database/createSong';
  const request = axios.post(url, songInfo);

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

export function deleteSong(songInfo){
  console.log("actions.js deleteSong() just received ", songInfo);
  const url = '/database/deleteSong';
  const request = axios.post(url, songInfo);

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

export function submitCreateAccount(props){
  console.log("actions.js submitCreateAccount props", props);
  const url = '/database/createAccount';
  const request = axios.post(url, props);

  return {
    type: SUBMIT_CREATE_ACCOUNT,
    payload: request
  }
}