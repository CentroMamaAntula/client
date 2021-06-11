import React, { useReducer } from 'react';
import LaboratoryContext from './laboratoryContext';
import LaboratoryReducer from './laboratoryReducer';
import clienteAxios from '../../config/axios';
import {
  ADD_EVOLUTION_LAB,
  GET_EVOLUTION_LAB,
  LOADING_LAB,
  ERROR_LAB
} from '../../types';

const LaboratoryState = props => {
  const initialState = {
    evolution: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(LaboratoryReducer, initialState);

  //funciones
  const addEvolution = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/laboratory', datos);
      dispatch({
        type: ADD_EVOLUTION_LAB,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_LAB,
        payload: error.response.data.msg
      });
    }
  };

  const getEvolutions = async data => {
    dispatch({
      type: LOADING_LAB
    });
    try {
      const respuesta = await clienteAxios.get('/api/laboratory', {
        params: { id_paciente: data.id_paciente }
      });
      dispatch({
        type: GET_EVOLUTION_LAB,
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
        evolution: state.evolution,
        message: state.message,
        loading: state.loading,
        addEvolution,
        getEvolutions
      }}
    >
      {props.children}
    </LaboratoryContext.Provider>
  );
};

export default LaboratoryState;
