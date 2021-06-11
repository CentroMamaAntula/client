import React, { useReducer } from 'react';
import KinesiologyContext from './kinesiologyContext';
import KinesiologyReducer from './kinesiologyReducer';
import clienteAxios from '../../config/axios';

import {
  GET_KINESIOLOGY,
  ADD_EVOLUTION_KINE,
  GET_EVOLUTION_KINE,
  ADD_EVOLUTION_MV_KINE,
  GET_EVOLUTION_MV_KINE,
  ERROR_PACIENTE
} from '../../types';

const KinesiologyState = props => {
  const initialState = {
    evolution: null,
    evolutionMV: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(KinesiologyReducer, initialState);

  //funciones
  const getKinesiology = async ({ id_paciente }) => {
    try {
      const respuesta = await clienteAxios.get('/api/kinesiology', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_KINESIOLOGY,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addEvolution = async datos => {
    try {
      const respuesta = await clienteAxios.post(
        '/api/kinesiology/evolution',
        datos
      );
      dispatch({
        type: ADD_EVOLUTION_KINE,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getEvolution = async ({ id_paciente }) => {
    try {
      const respuesta = await clienteAxios.get('/api/kinesiology/evolution', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_EVOLUTION_KINE,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const addEvolutionMV = async datos => {
    try {
      const respuesta = await clienteAxios.post(
        '/api/kinesiology/mechanic_ventilation',
        datos
      );
      dispatch({
        type: ADD_EVOLUTION_MV_KINE,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_PACIENTE,
        payload: error.response.data.msg
      });
    }
  };

  const getEvolutionMV = async ({ id_paciente }) => {
    try {
      const respuesta = await clienteAxios.get(
        '/api/kinesiology/mechanic_ventilation',
        {
          params: { id_paciente }
        }
      );
      dispatch({
        type: GET_EVOLUTION_MV_KINE,
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
    <KinesiologyContext.Provider
      value={{
        evolution: state.evolution,
        evolutionMV: state.evolutionMV,
        message: state.message,
        loading: state.loading,
        getKinesiology,
        addEvolution,
        getEvolution,
        addEvolutionMV,
        getEvolutionMV
      }}
    >
      {props.children}
    </KinesiologyContext.Provider>
  );
};

export default KinesiologyState;
