import { FETCH_USER_PROFILE, SAVE_USER_PROFILE } from '../actions/actions';

const INITIAL_STATE = { userProfile: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USER_PROFILE:
      return { userProfile: action.payload.data };
    case SAVE_USER_PROFILE:
      return { userProfile: action.payload.data };
    default: 
      return state;
  }
}