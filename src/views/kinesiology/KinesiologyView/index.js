import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';

import AutContext from 'src/context/auth/authContext';
import PacienteContext from 'src/context/paciente/pacienteContext';
import KinesiologyContext from 'src/context/kinesiology/kinesiologyContext';

import { KINESILOGIA, MEDICO } from 'src/utils/role';
import SearchPaciente from 'src/views/searchPaciente';
import KinesiologyEvolution from './KinesiologyEvolution';
import MechanicVentilation from './MechanicVentilation';

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
  const kinesiologyContext = useContext(KinesiologyContext);

  const { user } = autContext;

  const { paciente, message } = pacienteContext;

  const {
    evolution,
    evolutionMV,
    messageEK = message,
    getKinesiology,
    addEvolution,
    getEvolution,
    addEvolutionMV,
    getEvolutionMV
  } = kinesiologyContext;

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
    if (messageEK) {
      handleOpen();
    }
    if (paciente) {
      getKinesiology({ id_paciente: paciente._id });
    }
  }, [message, paciente]);

  return (
    <Page className={classes.root} title="Kinesiologia">
      <Container maxWidth={false}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message ? message : messageEK}
          </Alert>
        </Snackbar>
        <Grid container justify="center" spacing={1}>
          <SearchPaciente user={user} />
          {(user.role === MEDICO && paciente) ||
          (user.role === KINESILOGIA && paciente) ? (
            <Fragment>
              <Grid item xs={12}>
                <KinesiologyEvolution
                  user={user}
                  paciente={paciente}
                  data={evolution}
                  addEvolution={addEvolution}
                  getEvolution={getEvolution}
                />
              </Grid>
              <Grid item xs={12}>
                <MechanicVentilation
                  user={user}
                  paciente={paciente}
                  data={evolutionMV}
                  addEvolution={addEvolutionMV}
                  getEvolution={getEvolutionMV}
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
