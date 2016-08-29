import { SUBMIT_LOGIN } from '../actions/actions';

const INITIAL_STATE = { user: null, users :[] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SUBMIT_LOGIN:
      return { users: action.payload.data };
    default: 
      return state;
  }
}