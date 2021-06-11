import React, { useReducer } from 'react';
import BedContext from './bedContext';
import BedReducer from './bedReducer';
import clientAxios from '../../config/axios';
import {
  GET_BED_OCCUPIED,
  GET_BED_UNOCCUPIED,
  OCCUPY_BED,
  EMPTY_BED,
  ERROR_BED
} from '../../types';

const BedState = props => {
  const initialState = {
    occupied_beds: [],
    unoccupied_beds: [],
    msg: null,
    loading: true
  };
  const [state, dispatch] = useReducer(BedReducer, initialState);

  //func
  const editBed = async bed => {
    try {
      const result = await clientAxios.put(`/api/bed/occupy/${bed._id}`, bed);
      dispatch({
        type: OCCUPY_BED,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_BED,
        payload: error.response.data.errors
      });
    }
  };

  const emptyBed = async id_paciente => {
    try {
      const result = await clientAxios.put(`/api/bed/empty/${id_paciente}`);
      dispatch({
        type: EMPTY_BED,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_BED,
        payload: error.response.data.errors
      });
    }
  };

  const getBedOccupied = async () => {
    try {
      const result = await clientAxios.get('/api/bed/occupied_beds');
      dispatch({
        type: GET_BED_OCCUPIED,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_BED,
        payload: error.response.data.errors
      });
    }
  };

  const getBedUnoccupied = async () => {
    try {
      const result = await clientAxios.get('/api/bed/unoccupied_beds');
      dispatch({
        type: GET_BED_UNOCCUPIED,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_BED,
        payload: error.response.data.errors
      });
    }
  };
  return (
    <BedContext.Provider
      value={{
        occupied_beds: state.occupied_beds,
        unoccupied_beds: state.unoccupied_beds,
        msg: state.msg,
        loading: state.loading,
        editBed,
        emptyBed,
        getBedOccupied,
        getBedUnoccupied
      }}
    >
      {props.children}
    </BedContext.Provider>
  );
};

export default BedState;
