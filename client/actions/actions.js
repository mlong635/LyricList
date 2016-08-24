import axios from 'axios';

export const FETCH_SONGS = 'FETCH_SONGS';
export const CREATE_SONG = 'CREATE_SONG';

export function fetchSongs(){
  const url = '/database/allSongs';
  const request = axios.get(url);
  return {
    type: FETCH_SONGS,
    payload: request,
  };
}

export function createSong(props){
  const url = '/database/createSong';
  const request = axios.post(url, props);

  return {
    type: CREATE_SONG,
    payload: request
  }
}