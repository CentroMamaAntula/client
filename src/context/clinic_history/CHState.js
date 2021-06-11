import React, { useReducer } from 'react';
import uuid from 'react-uuid';
import CHContext from './CHContext';
import CHReducer from './CHReducer';

import clienteAxios from '../../config/axios';

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
  ERROR_PACIENTE,
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
} from '../../types';

const CHState = props => {
  const initialState = {
    activity: null,
    diagnostic: null,
    hisopado: null,
    medicalHistory: null,
    physicalExam: null,
    nursingExam: null,
    treatment: null,
    historyCurrent: null,
    news2: null,
    curb65: null,
    apache: null,
    sofa: null,
    message: '',
    loading: true
  };

  const [state, dispatch] = useReducer(CHReducer, initialState);

  //funciones
  const getClinicHistory = async id_paciente => {
    dispatch({
      type: LOADING_CH
    });
    try {
      const respuesta = await clienteAxios.get('/api/clinic_history', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_CLINIC_HISTORY,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const deleteClinicHistory = () => {
    dispatch({
      type: DELETE_CLINIC_HISTORY
    });
  };

  const addActivity = async data => {
    const formData = new FormData();
    let result;
    try {
      if (data.file) {
        const id_medicalReferral = uuid();
        formData.append('medical_referral', data.file);
        result = await clienteAxios.post(
          `/api/activity/${id_medicalReferral}`,
          formData
        ); //imagen
        data = {
          ...data,
          medical_referral: id_medicalReferral
        };
        result = await clienteAxios.post('/api/activity', data);
        dispatch({
          type: ADD_ACTIVITY,
          payload: result.data
        });
      } else {
        result = await clienteAxios.post('/api/activity', data);
        dispatch({
          type: ADD_ACTIVITY,
          payload: result.data
        });
      }
    } catch (error) {
      console.log(error.response);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const getActivity = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/activity', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_ACTIVITY,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const addDiagnostic = async data => {
    try {
      const result = await clienteAxios.post('/api/diagnostic', data);
      dispatch({
        type: ADD_DIAGNOSTIC,
        payload: result.data
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getDiagnostic = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/diagnostic', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_DIAGNOSTIC,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addCurb65 = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/curb65', data);
      dispatch({
        type: ADD_CURB65,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error.response);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const getCurb65 = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/curb65', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_CURB65,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addHisopado = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/hisopado', data);
      dispatch({
        type: ADD_HISOPADO,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const updateHisopado = async data => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/hisopado/${data._id}`,
        data
      );
      dispatch({
        type: UPDATE_HISOPADO,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getHisopado = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/hisopado', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_HISOPADO,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const addMedicalHistory = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/medical_history', data);
      dispatch({
        type: ADD_MEDICAL_HISTORY,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const getMedicalHistory = async ({ id_paciente }) => {
    try {
      const respuesta = await clienteAxios.get('/api/medical_history', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_MEDICAL_HISTORY,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const editMedicalHistory = async data => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/medical_history/${data._id}`,
        data
      );
      dispatch({
        type: EDIT_MEDICAL_HISTORY,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const addNews2 = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/news2', data);
      dispatch({
        type: ADD_NEWS2,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const getNews2 = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/news2', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_NEWS2,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const addPhysicalExam = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/physical_exam', data);
      dispatch({
        type: ADD_PHYSICAL_EXAM,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      /* dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      }); */
    }
  };

  const getPhysicalExam = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/physical_exam', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_PHYSICAL_EXAM,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addTreatment = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/treatment', data);
      dispatch({
        type: ADD_TREATMENT,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getTreatment = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/treatment', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_TREATMENT,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addHistoryCurrent = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/historyCurrent', data);
      dispatch({
        type: ADD_HISTORY_CURRENT,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getHistoryCurrent = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/historyCurrent', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_HISTORY_CURRENT,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addAPACHE = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/apache', data);
      dispatch({
        type: ADD_APACHE,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getAPACHE = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/apache', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_APACHE,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addSOFA = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/sofa', data);
      dispatch({
        type: ADD_SOFA,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getSOFA = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/sofa', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_SOFA,
        payload: respuesta.data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  return (
    <CHContext.Provider
      value={{
        activity: state.activity,
        diagnostic: state.diagnostic,
        curb65: state.curb65,
        hisopado: state.hisopado,
        medicalHistory: state.medicalHistory,
        news2: state.news2,
        physicalExam: state.physicalExam,
        nursingExam: state.nursingExam,
        treatment: state.treatment,
        historyCurrent: state.historyCurrent,
        apache: state.apache,
        sofa: state.sofa,
        messageCH: state.message,
        loadingCH: state.loading,
        getClinicHistory,
        deleteClinicHistory,
        addActivity,
        getActivity,
        addDiagnostic,
        getDiagnostic,
        addCurb65,
        getCurb65,
        addNews2,
        getNews2,
        addPhysicalExam,
        getPhysicalExam,
        addTreatment,
        getTreatment,
        addHistoryCurrent,
        getHistoryCurrent,
        addAPACHE,
        getAPACHE,
        addSOFA,
        getSOFA,
        addHisopado,
        updateHisopado,
        getHisopado,
        addMedicalHistory,
        getMedicalHistory,
        editMedicalHistory
      }}
    >
      {props.children}
    </CHContext.Provider>
  );
};

export default CHState;
