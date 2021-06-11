import {
  ADD_EVOLUTION_LAB,
  GET_EVOLUTION_LAB,
  LOADING_LAB,
  ERROR_LAB
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EVOLUTION_LAB:
      return {
        ...state,
        evolution: {
          ...state.evolution,
          evolutions: [action.payload, ...state.evolution.evolutions],
          total: state.total + 1
        },
        message: null,
        loading: false
      };
    case GET_EVOLUTION_LAB:
      return {
        ...state,
        evolution: action.payload,
        message: null,
        loading: false
      };
    case ERROR_LAB:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case LOADING_LAB:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
