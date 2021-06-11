import React, { useReducer } from 'react';
import uuid from 'react-uuid';
import XRayContext from './xrayContext';
import XRayReducer from './xrayReducer';
import clienteAxios from '../../config/axios';
import {
  ADD_ORDER_RX,
  GET_ORDER,
  GET_ORDER_PACIENTE,
  EDIT_ORDER,
  ADD_REPORT,
  GET_REPORT_ORDER,
  LOADING_RX,
  ERROR_RX
} from '../../types';

const XrayState = props => {
  const initialState = {
    xRayOrders: [],
    xRayOrdersPaciente: [],
    xRayReport: null,
    totalPages: 0,
    currentPage: 1,
    total: 0,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(XRayReducer, initialState);

  //funciones
  const addOrderRX = async datos => {
    try {
      console.log(datos);
      const respuesta = await clienteAxios.post('/api/orderrx', datos);
      dispatch({
        type: ADD_ORDER_RX,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const getOrderRX = async data => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.get('/api/orderrx', {
        params: { page: data ? data.newPage : undefined }
      });
      dispatch({
        type: GET_ORDER,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const getOrderRXPaciente = async data => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.get('/api/orderrx/paciente', {
        params: { id_paciente: data }
      });
      dispatch({
        type: GET_ORDER_PACIENTE,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const editOrderRX = async datos => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/orderrx/${datos._id}`,
        datos
      );
      dispatch({
        type: EDIT_ORDER,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const addReportRX = async data => {
    const formData = new FormData();
    let result = null;
    const id_plate = uuid();
    formData.append('plate', data.plate);
    try {
      result = await clienteAxios.post(`/api/reportrx/${id_plate}`, formData);

      data = {
        ...data,
        plate: id_plate
      };

      result = await clienteAxios.post('/api/reportrx', data);
      dispatch({
        type: ADD_REPORT,
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const getReportRX = async data => {
    try {
      const respuesta = await clienteAxios.get('/api/reportrx', {
        params: { id_orderRx: data }
      });
      dispatch({
        type: GET_REPORT_ORDER,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  return (
    <XRayContext.Provider
      value={{
        xRayOrders: state.xRayOrders,
        xRayOrdersPaciente: state.xRayOrdersPaciente,
        xRayReport: state.xRayReport,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        total: state.total,
        message: state.message,
        loading: state.loading,
        addOrderRX, //medico
        getOrderRX, //tecnico ve todas las order
        getOrderRXPaciente, // ver las order de un paciente
        editOrderRX, // completar la order
        addReportRX, // idem
        getReportRX // medico ve la order o tecnico
      }}
    >
      {props.children}
    </XRayContext.Provider>
  );
};

export default XrayState;
