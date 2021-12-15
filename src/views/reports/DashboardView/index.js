import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  Container,
  CircularProgress,
  Grid,
  makeStyles,
  Snackbar,
  Box,
  Card,
  CardHeader,
  TextField,
  MenuItem,
  CardContent,
  Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import SearchPaciente from 'src/views/searchPaciente';
import Page from 'src/components/Page';
import AutContext from 'src/context/auth/authContext';
import PacienteContext from 'src/context/paciente/pacienteContext';
import CHContext from 'src/context/clinic_history/CHContext';
import NursingContext from 'src/context/nursing/NursingContext';
import { MEDICO, SALUD_MENTAL } from 'src/utils/role';
import PhysicalExam from './PhysicalExam';
import Diagnostic from './Diagnostic';
import Activity from './Activity';
import Hisopado from './Hisopado';
import Pronostic from './scales/prognostic';
import Respiratory from './scales/respiratory';
import Treatment from './Treatment';
import HistoryCurrent from './HistoryCurrent';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [escalas, setEscalas] = useState(0);
  const autContext = useContext(AutContext);
  const pacienteContext = useContext(PacienteContext);
  const chContext = useContext(CHContext);
  const nursingContext = useContext(NursingContext);

  const { user } = autContext;
  const { paciente, message, editPaciente } = pacienteContext;
  const {
    activity,
    diagnostic,
    hisopado,
    physicalExam,
    treatment,
    historyCurrent,
    messageCH,
    loadingCH,
    getClinicHistory,
    addActivity,
    getActivity,
    addDiagnostic,
    getDiagnostic,
    addHisopado,
    updateHisopado,
    getHisopado,
    addPhysicalExam,
    getPhysicalExam,
    addTreatment,
    getTreatment,
    addHistoryCurrent,
    getHistoryCurrent
  } = chContext;
  const { application, addApplication, getApplication } = nursingContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setEscalas(e.target.value);
  };

  const handleClick = async e => {
    await getClinicHistory({ id_paciente: paciente._id });
    localStorage.setItem('clinicHistory', JSON.stringify({
      activities: activity.activitys,
      historysCurrent: historyCurrent.historyCurrents,
      hisopados: hisopado.hisopados,
      diagnostics: diagnostic.diagnostics,
      paciente,
      treatments: treatment.treatments
    }));
    window.open('/print/clinic_history');
  };

  useEffect(() => {
    if (message) {
      handleOpen();
    }
    if (messageCH) {
      handleOpen();
    }
  }, [message, messageCH]);

  useEffect(() => {
    if (paciente) {
      getClinicHistory({ id_paciente: paciente._id, limit: 5 });
    }
  }, [paciente]);

  return (
    <Page className={classes.root} title="Historia Clinica">
      <Container maxWidth={false}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message ? message : messageCH}
          </Alert>
        </Snackbar>
        <Grid container justifyContent="center" spacing={1}>
          <SearchPaciente user={user} />
          {user ? (
            paciente ? (
              !loadingCH ? (
                <Fragment>
                  <Grid item xs={12}>
                    <HistoryCurrent
                      id={paciente._id}
                      user={user}
                      disabled={(user.role !== MEDICO) || (user.role !== SALUD_MENTAL)}
                      data={historyCurrent}
                      addHistoryCurrent={addHistoryCurrent}
                      getHistoryCurrent={getHistoryCurrent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Treatment
                      id={paciente._id}
                      user={user}
                      data={treatment}
                      disabled={user.role !== MEDICO}
                      addTreatment={addTreatment}
                      getTreatment={getTreatment}
                      application={application}
                      addApplication={addApplication}
                      getApplication={getApplication}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12}>
                    <Diagnostic
                      id={paciente._id}
                      disabled={user.role !== MEDICO}
                      user={user}
                      data={diagnostic}
                      addDiagnostic={addDiagnostic}
                      getDiagnostic={getDiagnostic}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12}>
                    <PhysicalExam
                      id={paciente._id}
                      disabled={user.role !== MEDICO}
                      user={user}
                      data={physicalExam}
                      addPhysicalExam={addPhysicalExam}
                      getPhysicalExam={getPhysicalExam}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Hisopado
                      id={paciente._id}
                      disabled={user.role !== MEDICO}
                      data={hisopado}
                      addHisopado={addHisopado}
                      updateHisopado={updateHisopado}
                      getHisopado={getHisopado}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Activity
                      paciente={paciente}
                      disabled={user.role !== MEDICO}
                      user={user}
                      data={activity}
                      editPaciente={editPaciente}
                      addActivity={addActivity}
                      getActivity={getActivity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Escalas"
                        titleTypographyProps={{ variant: 'h2' }}
                      />
                      <CardContent>
                        <TextField
                          fullWidth
                          select
                          label="Escalas/Indicadores"
                          name="escalas"
                          type="number"
                          onChange={handleChange}
                          value={escalas}
                          variant="outlined"
                        >
                          <MenuItem value={0}>Seleccione...</MenuItem>
                          <MenuItem value={1}>Respiratorio</MenuItem>
                          <MenuItem value={2}>
                            Indicadores de Pronostico
                          </MenuItem>
                        </TextField>
                      </CardContent>
                    </Card>
                  </Grid>
                  {escalas === 1 ? (
                    <Respiratory />
                  ) : escalas === 2 ? (
                    <Pronostic />
                  ) : null}
                  <Grid item xs={12}>
                    <Box my={2}>
                      <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                      >
                        IMPRIMIR
                      </Button>
                    </Box>
                  </Grid>
                </Fragment>
              ) : (
                <Box my={10}>
                  <CircularProgress size={60} />
                </Box>
              )
            ) : null
          ) : null}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
