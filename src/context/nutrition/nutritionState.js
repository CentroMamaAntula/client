import React, { useReducer } from 'react';
import NutritionContext from './nutritionContext';
import NutritionReducer from './nutritionReducer';
import clienteAxios from '../../config/axios';

import {
  ADD_EVOLUTION_NUTR,
  GET_EVOLUTION_NUTR,
  ERROR_PACIENTE
} from '../../types';

const NutritionState = props => {
  const initialState = {
    evolution: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(NutritionReducer, initialState);

  //funciones
  const addEvolution = async datos => {
    try {
      const respuesta = await clienteAxios.post(
        '/api/nutrition/evolution',
        datos
      );
      dispatch({
        type: ADD_EVOLUTION_NUTR,
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
      const respuesta = await clienteAxios.get('/api/nutrition/evolution', {
        params: { id_paciente }
      });
      dispatch({
        type: GET_EVOLUTION_NUTR,
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
    <NutritionContext.Provider
      value={{
        evolution: state.evolution,
        message: state.message,
        loading: state.loading,
        addEvolution,
        getEvolution
      }}
    >
      {props.children}
    </NutritionContext.Provider>
  );
};

export default NutritionState;
