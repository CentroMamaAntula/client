import React, { useReducer } from 'react';
import PacienteContext from './pacienteContext';
import PacienteReducer from './pacienteReducer';
import clienteAxios from '../../config/axios';

import {
  ADD_PACIENTE,
  GET_PACIENTE,
  EDIT_PACIENTE,
  SELECT_PACIENTE,
  ERROR_PACIENTE,
  LOADING_PACIENTE,
  CLEAR_PACIENTE
} from '../../types';

const PacienteState = props => {
  const initialState = {
    paciente: null,
    pacientes: [],
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(PacienteReducer, initialState);

  //funciones
  const addPaciente = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/paciente', datos);
      dispatch({
        type: ADD_PACIENTE,
        payload: respuesta.data.paciente
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const editPaciente = async datos => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/paciente/${datos._id}`,
        datos
      );
      dispatch({
        type: EDIT_PACIENTE,
        payload: respuesta.data.newPaciente
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getPaciente = async data => {
    dispatch({
      type: LOADING_PACIENTE
    });
    try {
      const respuesta = await clienteAxios.get('/api/paciente', {
        params: { q: data }
      });
      dispatch({
        type: GET_PACIENTE,
        payload: respuesta.data.pacientes
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const selectPaciente = async data => {
    dispatch({
      type: SELECT_PACIENTE,
      payload: data
    });
  };

  const clearPaciente = async () => {
    dispatch({
      type: CLEAR_PACIENTE
    });
  };

  return (
    <PacienteContext.Provider
      value={{
        paciente: state.paciente,
        pacientes: state.pacientes,
        message: state.message,
        loading: state.loading,
        addPaciente,
        getPaciente,
        editPaciente,
        selectPaciente,
        clearPaciente
      }}
    >
      {props.children}
    </PacienteContext.Provider>
  );
};

export default PacienteState;
