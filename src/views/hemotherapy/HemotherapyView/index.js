import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import SearchPaciente from 'src/views/searchPaciente';

import AutContext from 'src/context/auth/authContext';
import PacienteContext from 'src/context/paciente/pacienteContext';
import HemotherapyContext from 'src/context/hemotherapy/hemotherapyContext';

import { HEMOTERAPIA, MEDICO } from 'src/utils/role';
import HemotherapyExam from './HemotherapyExam';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Nursing = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const autContext = useContext(AutContext);
  const pacienteContext = useContext(PacienteContext);
  const hemotherapyContext = useContext(HemotherapyContext);

  const { user } = autContext;

  const { paciente, message } = pacienteContext;

  const {
    application,
    loading,
    addApplication,
    getApplication,
  } = hemotherapyContext;

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
    if (paciente) {
      getApplication({ id_paciente: paciente._id });
    }
  }, [message, paciente]);

  return (
    <Page className={classes.root} title="Hemoterapia">
      <Container maxWidth="xl">
        <Grid container justify="center" spacing={1}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
          <SearchPaciente user={user} />
          {(user.role === MEDICO && paciente) ||
          (user.role === HEMOTERAPIA && paciente) ? (
            <Fragment>
              <Grid item xs={12}>
                <HemotherapyExam
                  user={user}
                  paciente={paciente}
                  data={application}
                  disabled={user.role !== HEMOTERAPIA}
                  addApplication={addApplication}
                  getApplication={getApplication}
                />
              </Grid>
            </Fragment>
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
};

export default Nursing;
