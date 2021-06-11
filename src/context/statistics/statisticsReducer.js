import {
  GET_ACTIVITY_FROM_TO,
  LOADING_STATISTICS,
  ERROR_STATISTICS
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ACTIVITY_FROM_TO:
      return {
        ...state,
        activityFromTo: action.payload,
        message: null,
        loading: false
      };
    case LOADING_STATISTICS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
