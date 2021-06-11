import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import SearchPaciente from 'src/views/searchPaciente';

import AutContext from 'src/context/auth/authContext';
import PacienteContext from 'src/context/paciente/pacienteContext';
import NursingContext from 'src/context/nursing/NursingContext';

import { ENFERMERO, MEDICO } from 'src/utils/role';
import NursingExam from './NursingExam';
import ARMExam from './ARMExam';
import BalanceHE from './BalanceHE';

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
  const nursingContext = useContext(NursingContext);

  const { user } = autContext;

  const { paciente, message } = pacienteContext;

  const {
    arme,
    balanceHE,
    nursingExam,
    messageNursing,
    getNursing,
    addARME,
    getARME,
    addBalaceExam,
    getBalaceExam,
    addNursingExam,
    getNursingExam
  } = nursingContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (messageNursing) {
      handleOpen();
    }
    if (paciente) {
      getNursing(paciente._id);
    }
  }, [messageNursing, paciente]);

  return (
    <Page className={classes.root} title="Enfermería">
      <Container maxWidth="xl">
        <Grid container justify="center" spacing={1}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {message ? message : messageNursing}
            </Alert>
          </Snackbar>
          <SearchPaciente user={user} />
          {(user.role === MEDICO && paciente) ||
          (user.role === ENFERMERO && paciente) ? (
            <Fragment>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <NursingExam
                  user={user}
                  paciente={paciente}
                  data={nursingExam}
                  addNursingExam={addNursingExam}
                  getNursingExam={getNursingExam}
                />
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <ARMExam
                  user={user}
                  paciente={paciente}
                  data={arme}
                  addARME={addARME}
                  getARME={getARME}
                />
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <BalanceHE
                  user={user}
                  paciente={paciente}
                  data={balanceHE}
                  addNursingExam={addBalaceExam}
                  getNursingExam={getBalaceExam}
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
