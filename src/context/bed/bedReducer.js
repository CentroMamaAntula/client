import {
  GET_BED_OCCUPIED,
  GET_BED_UNOCCUPIED,
  OCCUPY_BED,
  EMPTY_BED,
  ERROR_BED
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case OCCUPY_BED:
      return {
        ...state,
        message: null,
        loading: false
      };
    case EMPTY_BED:
      return {
        ...state,
        unoccupied_beds: [action.payload, ...state.unoccupied_beds],
        msg: null,
        loading: false
      };
    case GET_BED_OCCUPIED:
      return {
        ...state,
        occupied_beds: action.payload,
        unoccupied_beds: [],
        msg: null,
        loading: false
      };
    case GET_BED_UNOCCUPIED:
      return {
        ...state,
        occupied_beds: [],
        unoccupied_beds: action.payload,
        msg: null,
        loading: false
      };
    case ERROR_BED:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
