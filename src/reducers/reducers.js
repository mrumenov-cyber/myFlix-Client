import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USERS, SET_UPDATEUSERS } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

//reducers movies
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}


  //reducers users
  function user(state = [], action) {
    switch (action.type) {
      case SET_USERS:
        return action.user;
  
      case  SET_UPDATEUSERS:
        return action.value;
      default:
        return state;
    }
  }

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
  });


export default moviesApp;