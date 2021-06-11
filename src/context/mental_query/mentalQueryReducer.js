import {
  ADD_MENTAL_QUERY,
  GET_MENTAL_QUERY,
  SELECT_MENTAL_QUERY,
  ADD_MENTAL_EVOLUTION,
  GET_MENTAL_EVOLUTION,
  LOADING_MENTAL
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_MENTAL_QUERY:
      return {
        ...state,
        mentalQueryOpen: action.payload,
        mentalQuerys: [action.payload, ...state.mentalQuerys],
        message: null,
        loading: false
      };
    case GET_MENTAL_QUERY:
      return {
        ...state,
        mentalQuerys: action.payload,
        mentalEvolutions: [],
        message: null,
        loading: false
      };
    case GET_MENTAL_EVOLUTION:
      return {
        ...state,
        mentalEvolutions: action.payload,
        message: null,
        loading: false
      };
    case ADD_MENTAL_EVOLUTION:
      return {
        ...state,
        mentalEvolutions: [action.payload, ...state.mentalEvolutions],
        message: null,
        loading: false
      };
    case SELECT_MENTAL_QUERY:
      return {
        ...state,
        mentalQueryOpen: action.payload,
        message: null,
        loading: false
      };
    case LOADING_MENTAL:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
