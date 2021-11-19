import React, { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import { RAYOS, MEDICO } from 'src/utils/role';
import SearchPaciente from 'src/views/searchPaciente';
import AutContext from 'src/context/auth/authContext';
import PacienteContext from 'src/context/paciente/pacienteContext';
import XrayContext from 'src/context/xray/xrayContext';
import Notifications from './Notifications';
import OrderRX from './OrderRX';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const XrayView = () => {
  const classes = useStyles();
  const autContext = useContext(AutContext);
  const pacienteContext = useContext(PacienteContext);
  const xrayContext = useContext(XrayContext);
  const [open, setOpen] = useState(false);

  const { user } = autContext;
  const { paciente, message } = pacienteContext;
  const {
    xRayOrders,
    xRayOrdersPaciente,
    xRayReport,
    totalPages,
    currentPage,
    total,
    addOrderRX,
    getOrderRX,
    getOrderRXPaciente,
    editOrderRX,
    addReportRX,
    getReportRX
  } = xrayContext;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user.role === MEDICO) {
      if (paciente) {
        getOrderRXPaciente(paciente._id);
      }
    } else if (user.role === RAYOS) {
      getOrderRX();
    }
  }, [paciente]);

  return (
    <Page className={classes.root} title="Rayos">
      <Container maxWidth="lg">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <SearchPaciente user={user} />
        {user.role === MEDICO && paciente ? (
          <OrderRX
            user={user}
            paciente={paciente}
            dataOrders={xRayOrdersPaciente}
            report={xRayReport}
            addOrder={addOrderRX}
            getReport={getReportRX}
          />
        ) : user.role === RAYOS ? (
          <Notifications
            user={user}
            orders={xRayOrders}
            totalPages={totalPages}
            currentPage={currentPage}
            count={total}
            getOrders={getOrderRX}
            editOrder={editOrderRX}
            addReport={addReportRX}
          />
        ) : null}
      </Container>
    </Page>
  );
};

export default XrayView;
