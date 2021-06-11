import React, { useContext, useEffect, Fragment, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Snackbar,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import AutContext from 'src/context/auth/authContext';
import { MEDICO } from 'src/utils/role';
import { Alert } from '@material-ui/lab';
import StatisticsContext from '../../../context/statistics/statisticsContext';
import PacienteContext from '../../../context/paciente/pacienteContext';
import CHContext from '../../../context/clinic_history/CHContext';
import Toolbar from './Toolbar';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const chContext = useContext(CHContext);
  const autContext = useContext(AutContext);
  const pacienteContext = useContext(PacienteContext);
  const statisticsContext = useContext(StatisticsContext);

  const {
    activityFromTo,
    message,
    loading,
    getActivityFromTo
  } = statisticsContext;
  const { user } = autContext;
  const { getClinicHistory } = chContext;
  const { selectPaciente } = pacienteContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (message) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, [message, loading]);

  return (
    <Page className={classes.root} title="Estadisticas">
      <Container maxWidth={false}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <Grid container justify="center" spacing={1}>
          {user && user.role === MEDICO ? (
            <Fragment>
              <Grid item xs={12}>
                <Toolbar getActivityFromTo={getActivityFromTo} />
              </Grid>
              <Grid item xs={12}>
                <Results
                  results={activityFromTo}
                  selectPaciente={selectPaciente}
                  getClinicHistory={getClinicHistory}
                />
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={8}>
              <Typography variant="h3" color="secondary">
                No tiene acceso a esta seccion
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default CustomerListView;
