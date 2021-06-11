import {
  GET_CLINIC_HISTORY,
  DELETE_CLINIC_HISTORY,
  ADD_CURB65,
  GET_CURB65,
  ADD_NEWS2,
  GET_NEWS2,
  ADD_TREATMENT,
  GET_TREATMENT,
  ADD_HISTORY_CURRENT,
  GET_HISTORY_CURRENT,
  ADD_PHYSICAL_EXAM,
  GET_PHYSICAL_EXAM,
  ADD_NURSING_EXAM,
  GET_NURSING_EXAM,
  ADD_ACTIVITY,
  GET_ACTIVITY,
  ADD_DIAGNOSTIC,
  GET_DIAGNOSTIC,
  ADD_HISOPADO,
  GET_HISOPADO,
  LOADING_CH,
  ADD_MEDICAL_HISTORY,
  GET_MEDICAL_HISTORY,
  EDIT_MEDICAL_HISTORY,
  ADD_APACHE,
  GET_SOFA,
  ADD_SOFA,
  GET_APACHE,
  UPDATE_HISOPADO
} from 'src/types';

export default (state, action) => {
  switch (action.type) {
    case GET_CLINIC_HISTORY:
      return {
        ...state,
        activity: action.payload.activity,
        diagnostic: action.payload.diagnostic,
        hisopado: action.payload.hisopado,
        physicalExam: action.payload.physicalExam,
        treatment: action.payload.treatment,
        historyCurrent: action.payload.historyCurrent,
        message: '',
        loading: false
      };
    case DELETE_CLINIC_HISTORY:
      return {
        ...state,
        activity: null,
        diagnostic: null,
        hisopado: null,
        medicalHistory: null,
        physicalExam: null,
        treatment: null,
        historyCurrent: null,
        message: '',
        loading: false
      };
    case ADD_MEDICAL_HISTORY:
    case GET_MEDICAL_HISTORY:
    case EDIT_MEDICAL_HISTORY:
      return {
        ...state,
        medicalHistory: action.payload,
        loading: false
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activity: {
          ...state.activity,
          activitys: [action.payload, ...state.activity.activitys],
          total: state.activity.total + 1
        },
        loading: false
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        loading: false
      };
    case ADD_DIAGNOSTIC:
      return {
        ...state,
        diagnostic: {
          ...state.activity,
          diagnostics: [action.payload, ...state.diagnostic.diagnostics],
          total: state.activity.total + 1
        },
        loading: false
      };
    case GET_DIAGNOSTIC:
      return {
        ...state,
        diagnostic: action.payload,
        loading: false
      };
    case ADD_TREATMENT:
      return {
        ...state,
        treatment: {
          ...state.treatment,
          treatments: [action.payload, ...state.treatment.treatments],
          total: state.treatment.total + 1
        },
        loading: false
      };
    case GET_TREATMENT:
      return {
        ...state,
        treatment: action.payload,
        loading: false
      };
    case ADD_HISTORY_CURRENT:
      return {
        ...state,
        historyCurrent: {
          ...state.historyCurrent,
          historyCurrents: [
            action.payload,
            ...state.historyCurrent.historyCurrents
          ],
          total: state.historyCurrent.total + 1
        },
        loading: false
      };
    case GET_HISTORY_CURRENT:
      return {
        ...state,
        historyCurrent: action.payload,
        loading: false
      };
    case ADD_PHYSICAL_EXAM:
      return {
        ...state,
        physicalExam: {
          ...state.physicalExam,
          physicalExams: [action.payload, ...state.physicalExam.physicalExams],
          total: state.physicalExam.total + 1
        },
        loading: false
      };
    case GET_PHYSICAL_EXAM:
      return {
        ...state,
        physicalExam: action.payload,
        loading: false
      };
    case ADD_NURSING_EXAM:
      return {
        ...state,
        nursingExam: {
          ...state.nursingExam,
          nursingExam: [action.payload, ...state.nursingExam.nursingExam],
          total: state.physicalExam.total + 1
        },
        loading: false
      };
    case GET_NURSING_EXAM:
      return {
        ...state,
        nursingExam: action.payload,
        loading: false
      };
    case ADD_CURB65:
      return {
        ...state,
        curb65: {
          ...state.curb65,
          curb65: [action.payload, ...state.curb65.curb65],
          total: state.curb65.total + 1
        },
        loading: false
      };
    case GET_CURB65:
      return {
        ...state,
        curb65: action.payload,
        loading: false
      };
    case ADD_NEWS2:
      return {
        ...state,
        news2: {
          ...state.news2,
          news2: [action.payload, ...state.news2.news2],
          total: state.news2.total + 1
        },
        loading: false
      };
    case GET_NEWS2:
      return {
        ...state,
        news2: action.payload,
        loading: false
      };
    case ADD_HISOPADO:
      return {
        ...state,
        hisopado: {
          ...state.hisopado,
          hisopados: [action.payload, ...state.hisopado.hisopados],
          total: state.hisopado.total + 1
        },
        loading: false
      };
    case UPDATE_HISOPADO:
      return {
        ...state,
        hisopado: {
          ...state.hisopado,
          hisopados: state.hisopado.hisopados.map(
            h => h._id === action.payload._id ? action.payload : h
          )
        },
        loading: false
      };
    case GET_HISOPADO:
      return {
        ...state,
        hisopado: action.payload,
        loading: false
      };
    case ADD_APACHE:
      return {
        ...state,
        apache: {
          ...state.apache,
          apache: [action.payload, ...state.apache.apache],
          total: state.hisopado.total + 1
        },
        loading: false
      };
    case GET_APACHE:
      return {
        ...state,
        apache: action.payload,
        loading: false
      };
    case ADD_SOFA:
      return {
        ...state,
        sofa: {
          ...state.sofa,
          sofa: [action.payload, ...state.sofa.sofa],
          total: state.hisopado.total + 1
        },
        loading: false
      };
    case GET_SOFA:
      return {
        ...state,
        sofa: action.payload,
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
