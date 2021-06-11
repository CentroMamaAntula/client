import {
  GET_NURSING,
  DELETE_NURSING,
  ADD_ARM_EXAM,
  GET_ARM_EXAM,
  ADD_APPLICATION,
  GET_APPLICATION,
  ADD_BALANCE_EXAM,
  GET_BALANCE_EXAM,
  ADD_NURSING_EXAM,
  GET_NURSING_EXAM,
  LOADING_CH
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_NURSING:
      return {
        ...state,
        arme: action.payload.arme,
        balanceHE: action.payload.balanceHE,
        nursingExam: action.payload.nursingExam,
        message: '',
        loading: false
      };
    case DELETE_NURSING:
      return {
        ...state,
        arme: null,
        application: null,
        balanceHE: null,
        nursingExam: null,
        message: '',
        loading: false
      };
    case ADD_ARM_EXAM:
      return {
        ...state,
        arme: {
          ...state.arme,
          armes: [action.payload, ...state.arme.armes],
          total: state.arme.total + 1
        },
        loading: false
      };
    case GET_ARM_EXAM:
      return {
        ...state,
        arme: action.payload,
        loading: false
      };
    case ADD_APPLICATION:
      return {
        ...state,
        application: [action.payload, ...state.application],
        loading: false
      };
    case GET_APPLICATION:
      return {
        ...state,
        application: action.payload,
        loading: false
      };
    case ADD_BALANCE_EXAM:
      return {
        ...state,
        balanceHE: {
          ...state.balanceHE,
          balanceHEs: [action.payload, ...state.balanceHE.balanceHEs],
          total: state.balanceHE.total + 1
        },
        loading: false
      };
    case GET_BALANCE_EXAM:
      return {
        ...state,
        balanceHE: action.payload,
        loading: false
      };
    case ADD_NURSING_EXAM:
      return {
        ...state,
        nursingExam: {
          ...state.nursingExam,
          nursingExams: [action.payload, ...state.nursingExam.nursingExams],
          total: state.nursingExam.total + 1
        },
        loading: false
      };
    case GET_NURSING_EXAM:
      return {
        ...state,
        nursingExam: action.payload,
        loading: false
      };
    case LOADING_CH:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
