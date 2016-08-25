import axios from 'axios';

export const FETCH_SONGS = 'FETCH_SONGS';
export const CREATE_SONG = 'CREATE_SONG';
export const FETCH_SONG = 'FETCH_SONG';

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

export function fetchOneSong(id) {
  const url = '/database/fetchOneSong';
  const request = axios.get(url, id);

  return {
    type: FETCH_SONG,
    payload: request
  }

}