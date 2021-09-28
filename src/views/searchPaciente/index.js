import React, { Fragment, useContext, useEffect } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';

import PacienteContext from 'src/context/paciente/pacienteContext';
import CHContext from 'src/context/clinic_history/CHContext';

import { MEDICO } from 'src/utils/role';
import Toolbar from './Toolbar';
import PatientData from './PatientData';
import ListPaciente from './ListPacientes';

const SearchPaciente = ({ user }) => {
  const pacienteContext = useContext(PacienteContext);
  const chContext = useContext(CHContext);

  const {
    paciente,
    pacientes,
    loading,
    addPaciente,
    editPaciente,
    getPaciente,
    selectPaciente,
  } = pacienteContext;

  const {
    medicalHistory,
    addMedicalHistory,
    getMedicalHistory,
    editMedicalHistory,
  } = chContext;

  useEffect(() => {
    if (paciente) {
      getMedicalHistory({ id_paciente: paciente._id });
    }
  }, [paciente]);

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Toolbar
          getPaciente={getPaciente}
          newPaciente={user ? user.role === MEDICO : false}
          addPaciente={
            user ? (user.role === MEDICO ? addPaciente : null) : null
          }
        />
      </Grid>
      {paciente ? (
        !loading ? (
          <Fragment>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <PatientData
                paciente={paciente}
                editPaciente={editPaciente}
                medicalHistory={medicalHistory}
                addMedicalHistory={addMedicalHistory}
                editMedicalHistory={editMedicalHistory}
              />
            </Grid>
          </Fragment>
        ) : (
          <Box my={10}>
            <CircularProgress size={60} />
          </Box>
        )
      ) : !loading ? (
        pacientes.length !== 0 ? (
          <Fragment>
            <Grid item lg={10} md={10} xl={10} xs={12}>
              <ListPaciente pacientes={pacientes} select={selectPaciente} />
            </Grid>
          </Fragment>
        ) : null
      ) : (
        <Box my={10}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Grid>
  );
};

export default SearchPaciente;
