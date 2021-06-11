import React, { useReducer } from 'react';
import MentalQueryContext from './mentalQueryContext';
import mentalQueryReducer from './mentalQueryReducer';
import clienteAxios from '../../config/axios';

import {
  ADD_MENTAL_QUERY,
  GET_MENTAL_QUERY,
  SELECT_MENTAL_QUERY,
  ADD_MENTAL_EVOLUTION,
  GET_MENTAL_EVOLUTION,
  LOADING_MENTAL,
  ERROR_MENTAL
} from '../../types';

const MentalQueryState = props => {
  const initialState = {
    mentalQueryOpen: null,
    mentalQuerys: [],
    mentalEvolutions: [],
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(mentalQueryReducer, initialState);

  //funciones
  const addMentalQuery = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/mental_query', datos);
      dispatch({
        type: ADD_MENTAL_QUERY,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_MENTAL,
        payload: error.response.data.msg
      });
    }
  };

  const getMentalQuery = async data => {
    dispatch({
      type: LOADING_MENTAL
    });
    try {
      const respuesta = await clienteAxios.get('/api/mental_query', {
        params: { id_paciente: data }
      });
      dispatch({
        type: GET_MENTAL_QUERY,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_MENTAL,
        payload: error.response.data.msg
      });
    }
  };

  const addMentalEvolutions = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/mental_evolution', datos);
      dispatch({
        type: ADD_MENTAL_EVOLUTION,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_MENTAL,
        payload: error.response.data.msg
      });
    }
  };

  const getMentalEvolutions = async data => {
    dispatch({
      type: LOADING_MENTAL
    });
    console.log(data);
    try {
      const respuesta = await clienteAxios.get('/api/mental_evolution', {
        params: { id_mentalquery: data }
      });
      dispatch({
        type: GET_MENTAL_EVOLUTION,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_MENTAL,
        payload: error.response.data.msg
      });
    }
  };

  const selectMentalQuery = async data => {
    dispatch({
      type: SELECT_MENTAL_QUERY,
      payload: data
    });
  };

  return (
    <MentalQueryContext.Provider
      value={{
        mentalQueryOpen: state.mentalQueryOpen,
        mentalQuerys: state.mentalQuerys,
        mentalEvolutions: state.mentalEvolutions,
        message: state.message,
        loading: state.loading,
        addMentalQuery,
        getMentalQuery,
        selectMentalQuery,
        addMentalEvolutions,
        getMentalEvolutions
      }}
    >
      {props.children}
    </MentalQueryContext.Provider>
  );
};

export default MentalQueryState;
