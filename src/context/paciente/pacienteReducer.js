import {
  ADD_PACIENTE,
  GET_PACIENTE,
  EDIT_PACIENTE,
  SELECT_PACIENTE,
  LOADING_PACIENTE,
  ERROR_PACIENTE,
  CLEAR_PACIENTE
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PACIENTE:
    case EDIT_PACIENTE:
    case SELECT_PACIENTE:
      return {
        ...state,
        paciente: action.payload,
        pacientes: [],
        message: '',
        loading: false
      };
    case GET_PACIENTE:
      return {
        ...state,
        paciente: null,
        pacientes: action.payload,
        message: '',
        loading: false
      };
    case CLEAR_PACIENTE:
    case ERROR_PACIENTE:
      return {
        ...state,
        paciente: null,
        pacientes: [],
        message: action.payload,
        loading: false
      };
    case LOADING_PACIENTE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
