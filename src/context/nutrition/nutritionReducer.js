import {
  ADD_EVOLUTION_NUTR,
  GET_EVOLUTION_NUTR,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EVOLUTION_NUTR:
      return {
        ...state,
        evolution: {
          ...state.evolution,
          evolutions: [action.payload, ...state.evolution.evolutions],
          total: state.evolution.total + 1
        },
        message: '',
        loading: false
      };
    case GET_EVOLUTION_NUTR:
      return {
        ...state,
        evolution: action.payload,
        message: '',
        loading: false
      };
    default:
      return state;
  }
};
