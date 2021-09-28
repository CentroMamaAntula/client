import {
  ADD_REPORT_LAB,
  GET_REPORT_LAB,
  LOADING_LAB,
  ERROR_LAB
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_REPORT_LAB:
      return {
        ...state,
        report: {
          ...state.report,
          reports: [action.payload, ...state.report.reports],
          total: state.total + 1
        },
        message: null,
        loading: false
      };
    case GET_REPORT_LAB:
      return {
        ...state,
        report: action.payload,
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
