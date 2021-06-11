import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import SearchPaciente from 'src/views/searchPaciente';

import PacienteContext from 'src/context/paciente/pacienteContext';
import AuthContext from 'src/context/auth/authContext';
import NutritionContext from 'src/context/nutrition/nutritionContext';
import { MEDICO, NUTRICION } from 'src/utils/role';
import NutritionEvolution from './NutritionEvolution';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const Laboratory = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const pacienteContext = useContext(PacienteContext);
  const nutritionContext = useContext(NutritionContext);

  const { user } = authContext;
  const { paciente } = pacienteContext;
  const { evolution, message, addEvolution, getEvolution } = nutritionContext;

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
      getEvolution({ id_paciente: paciente._id });
    }
  }, [message, paciente]);

  return (
    <Page className={classes.root} title="Nutrición">
      <Container maxWidth={false}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <Grid container justify="center" spacing={1}>
          <SearchPaciente user={user} />
          {(user.role === NUTRICION || user.role === MEDICO) && paciente ? (
            <Fragment>
              <Grid item xs={12}>
                <NutritionEvolution
                  user={user}
                  paciente={paciente}
                  data={evolution}
                  addEvolution={addEvolution}
                  getEvolution={getEvolution}
                />
              </Grid>
            </Fragment>
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
};

export default Laboratory;
