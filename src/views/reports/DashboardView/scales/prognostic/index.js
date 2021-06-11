import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import PacienteContext from 'src/context/paciente/pacienteContext';
import CHContext from 'src/context/clinic_history/CHContext';

import SOFA from './SOFA';
/* import Hisopado from './SAPS'; */
import APACHE from './APACHE';

const Prognostic = () => {
  const pacienteContext = useContext(PacienteContext);
  const chContext = useContext(CHContext);

  const { paciente } = pacienteContext;
  const { apache, addAPACHE, getAPACHE, sofa, addSOFA, getSOFA } = chContext;

  useEffect(() => {
    getAPACHE({ id_paciente: paciente._id });
    getSOFA({ id_paciente: paciente._id });
  }, [paciente]);

  return (
    <Fragment>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <APACHE
          paciente={paciente}
          data={apache}
          addApache={addAPACHE}
          getApache={getAPACHE}
        />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <SOFA
          paciente={paciente}
          data={sofa}
          addSofa={addSOFA}
          getSofa={getSOFA}
        />
      </Grid>
    </Fragment>
  );
};

export default Prognostic;
