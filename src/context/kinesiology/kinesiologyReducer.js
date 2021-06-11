import {
  GET_KINESIOLOGY,
  ADD_EVOLUTION_KINE,
  GET_EVOLUTION_KINE,
  ADD_EVOLUTION_MV_KINE,
  GET_EVOLUTION_MV_KINE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_KINESIOLOGY:
      return {
        ...state,
        evolution: action.payload.evolution,
        evolutionMV: action.payload.evolutionMV,
        message: '',
        loading: false
      };
    case ADD_EVOLUTION_KINE:
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
    case GET_EVOLUTION_KINE:
      return {
        ...state,
        evolution: action.payload,
        message: '',
        loading: false
      };
    case ADD_EVOLUTION_MV_KINE:
      return {
        ...state,
        evolutionMV: {
          ...state.evolution,
          evolutionMVs: [action.payload, ...state.evolutionMV.evolutionMVs],
          total: state.evolutionMV.total + 1
        },
        message: '',
        loading: false
      };
    case GET_EVOLUTION_MV_KINE:
      return {
        ...state,
        evolutionMV: action.payload,
        message: '',
        loading: false
      };
    default:
      return state;
  }
};
