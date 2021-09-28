import React, { useReducer } from 'react';
import LaboratoryContext from './laboratoryContext';
import LaboratoryReducer from './laboratoryReducer';
import clienteAxios from '../../config/axios';
import {
  ADD_REPORT_LAB,
  GET_REPORT_LAB,
  LOADING_LAB,
  ERROR_LAB
} from '../../types';

const LaboratoryState = props => {
  const initialState = {
    report: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(LaboratoryReducer, initialState);

  //funciones
  const addReport = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/laboratory', datos);
      dispatch({
        type: ADD_REPORT_LAB,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_LAB,
        payload: error.response.data.msg
      });
    }
  };

  const getReports = async data => {
    dispatch({
      type: LOADING_LAB
    });
    try {
      const respuesta = await clienteAxios.get('/api/laboratory', {
        params: { id_paciente: data.id_paciente }
      });
      dispatch({
        type: GET_REPORT_LAB,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_LAB,
        payload: error.response.data.msg
      });
    }
  };

  return (
    <LaboratoryContext.Provider
      value={{
        report: state.report,
        message: state.message,
        loading: state.loading,
        addReport,
        getReports
      }}
    >
      {props.children}
    </LaboratoryContext.Provider>
  );
};

export default LaboratoryState;
