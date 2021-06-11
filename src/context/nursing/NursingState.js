import React, { useReducer } from 'react';
import NursingContext from './NursingContext';
import NursingReducer from './NursingReducer';

import clienteAxios from '../../config/axios';

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
  LOADING_CH,
  ERROR_PACIENTE
} from '../../types';

const NursingState = props => {
  const initialState = {
    arme: null,
    application: null,
    balanceHE: null,
    nursingExam: null,
    message: '',
    loading: true
  };

  const [state, dispatch] = useReducer(NursingReducer, initialState);

  //funciones
  const getNursing = async id_paciente => {
    dispatch({
      type: LOADING_CH
    });
    try {
      const respuesta = await clienteAxios.get('/api/nursing', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_NURSING,
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

  const deleteNursing = () => {
    dispatch({
      type: DELETE_NURSING
    });
  };

  const addARME = async data => {
    try {
      const result = await clienteAxios.post('/api/arm_exam', data);
      dispatch({
        type: ADD_ARM_EXAM,
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

  const getARME = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/arm_exam', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_ARM_EXAM,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addApplication = async data => {
    try {
      const result = await clienteAxios.post('/api/application', data);
      dispatch({
        type: ADD_APPLICATION,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getApplication = async (id_treatment) => {
    try {
      const respuesta = await clienteAxios.get('/api/application', {
        params: { id_treatment }
      });
      dispatch({
        type: GET_APPLICATION,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addBalaceExam = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/balance_exam', data);
      dispatch({
        type: ADD_BALANCE_EXAM,
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

  const getBalaceExam = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/balance_exam', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_BALANCE_EXAM,
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

  const addNursingExam = async data => {
    try {
      const respuesta = await clienteAxios.post('/api/nursing_exam', data);
      dispatch({
        type: ADD_NURSING_EXAM,
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

  const getNursingExam = async ({ id_paciente, newPage = 1 }) => {
    try {
      const respuesta = await clienteAxios.get('/api/nursing_exam', {
        params: { id_paciente, page: newPage }
      });
      dispatch({
        type: GET_NURSING_EXAM,
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

  return (
    <NursingContext.Provider
      value={{
        arme: state.arme,
        application: state.application,
        balanceHE: state.balanceHE,
        nursingExam: state.nursingExam,
        messageNursing: state.message,
        loadingNursing: state.loading,
        getNursing,
        deleteNursing,
        addARME,
        getARME,
        addApplication,
        getApplication,
        addBalaceExam,
        getBalaceExam,
        addNursingExam,
        getNursingExam
      }}
    >
      {props.children}
    </NursingContext.Provider>
  );
};

export default NursingState;
