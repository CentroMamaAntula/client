import React, { useReducer } from 'react';
import StatisticsContext from './statisticsContext';
import StatisticsReducer from './statisticsReducer';
import clienteAxios from '../../config/axios';

import {
  GET_ACTIVITY_FROM_TO,
  LOADING_STATISTICS,
  ERROR_STATISTICS
} from '../../types';

const StatisticsState = props => {
  const initialState = {
    activityFromTo: [],
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(StatisticsReducer, initialState);

  //funciones
  const getActivityFromTo = async data => {
    dispatch({
      type: LOADING_STATISTICS
    });
    const { type, from, to } = data;
    try {
      const respuesta = await clienteAxios.get('/api/statistics/activity', {
        params: { type, from, to }
      });
      dispatch({
        type: GET_ACTIVITY_FROM_TO,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_STATISTICS,
        payload: error.response.data.msg
      });
    }
  };

  return (
    <StatisticsContext.Provider
      value={{
        activityFromTo: state.activityFromTo,
        message: state.message,
        loading: state.loading,
        getActivityFromTo
      }}
    >
      {props.children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsState;
