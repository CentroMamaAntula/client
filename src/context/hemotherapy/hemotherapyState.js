import React, { useReducer } from 'react';
import HemotherapyContext from './hemotherapyContext';
import hemotherapyReducer from './hemotherapyReducer';
import clienteAxios from '../../config/axios';

import {
  ADD_APPLICATION_HEMO,
  GET_APPLICATION_HEMO,
  ERROR_PACIENTE
} from '../../types';

const HemotherapyState = props => {
  const initialState = {
    application: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(hemotherapyReducer, initialState);

  //funciones
  const addApplication = async datos => {
    try {
      const respuesta = await clienteAxios.post(
        '/api/hemotherapy/application',
        datos
      );
      dispatch({
        type: ADD_APPLICATION_HEMO,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getApplication = async ({ id_paciente }) => {
    try {
      const respuesta = await clienteAxios.get('/api/hemotherapy/application', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_APPLICATION_HEMO,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  return (
    <HemotherapyContext.Provider
      value={{
        application: state.application,
        message: state.message,
        loading: state.loading,
        addApplication,
        getApplication
      }}
    >
      {props.children}
    </HemotherapyContext.Provider>
  );
};

export default HemotherapyState;
