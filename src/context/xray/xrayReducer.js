import {
  ADD_ORDER_RX,
  GET_ORDER,
  GET_ORDER_PACIENTE,
  EDIT_ORDER,
  ADD_REPORT,
  GET_REPORT_ORDER,
  LOADING_RX,
  ERROR_RX
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_ORDER_RX:
      return {
        ...state,
        xRayOrdersPaciente: [action.payload, ...state.xRayOrdersPaciente],
        message: '',
        loading: false
      };
    case GET_ORDER:
      return {
        ...state,
        xRayOrders: action.payload.orderRx,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        total: action.payload.total,
        message: '',
        loading: false
      };
    case GET_ORDER_PACIENTE:
      return {
        ...state,
        xRayOrdersPaciente: action.payload,
        message: '',
        loading: false
      };
    case EDIT_ORDER:
      return {
        ...state,
        xRayOrders: state.xRayOrders.map(
          order => order._id === action.payload._id ? action.payload : order
        ),
        message: '',
        loading: false
      };
    case GET_REPORT_ORDER:
      return {
        ...state,
        xRayReport: action.payload,
        message: '',
        loading: false
      };
    case ERROR_RX:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case LOADING_RX:
      return {
        ...state,
        loading: true
      };
    case ADD_REPORT:
    default:
      return state;
  }
};
