import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchPaciente from 'src/views/searchPaciente';
import PacienteContext from 'src/context/paciente/pacienteContext';
import MentalQueryContext from 'src/context/mental_query/mentalQueryContext';
import AuthContext from 'src/context/auth/authContext';
import { Alert } from '@material-ui/lab';
import { MEDICO, SALUD_MENTAL } from 'src/utils/role';
import MentalQuery from './MentalQuery';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const mentalQueryContext = useContext(MentalQueryContext);
  const pacienteContext = useContext(PacienteContext);

  const { user } = authContext;
  const { paciente } = pacienteContext;

  const {
    mentalQueryOpen,
    mentalQuerys,
    mentalEvolutions,
    message,
    addMentalQuery,
    getMentalQuery,
    selectMentalQuery,
    addMentalEvolutions,
    getMentalEvolutions
  } = mentalQueryContext;

  useEffect(() => {
    if (paciente) {
      getMentalQuery(paciente._id);
    }
  }, [paciente]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page className={classes.root} title="Salud Mental">
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={1}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {message}
              </Alert>
            </Snackbar>
            <SearchPaciente user={user} />
          </Grid>
          {(user.role === MEDICO && paciente) ||
          (user.role === SALUD_MENTAL && paciente) ? (
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <MentalQuery
                user={user}
                paciente={paciente}
                mentalQueryOpen={mentalQueryOpen}
                mentalQuerys={mentalQuerys}
                mentalEvolutions={mentalEvolutions}
                addMentalQuery={addMentalQuery}
                getMentalQuery={getMentalQuery}
                selectMentalQuery={selectMentalQuery}
                addMentalEvolutions={addMentalEvolutions}
                getMentalEvolutions={getMentalEvolutions}
              />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
};

export default SettingsView;
