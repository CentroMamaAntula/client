import {
  ADD_APPLICATION_HEMO,
  GET_APPLICATION_HEMO,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_APPLICATION_HEMO:
      return {
        ...state,
        application: {
          ...state.application,
          applications: [action.payload, ...state.application.applications],
          total: state.application.total + 1
        },
        message: '',
        loading: false
      };
    case GET_APPLICATION_HEMO:
      return {
        ...state,
        application: action.payload,
        message: '',
        loading: false
      };
    default:
      return state;
  }
};
