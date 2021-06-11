import React, { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PacienteContext from 'src/context/paciente/pacienteContext';
import CHContext from 'src/context/clinic_history/CHContext';
import CURB65 from './CURB65';
import NEWS2 from './NEWS2';

const XrayView = () => {
  const pacienteContext = useContext(PacienteContext);
  const chContext = useContext(CHContext);

  const { paciente } = pacienteContext;
  const { curb65, addCurb65, getCurb65, news2, addNews2, getNews2 } = chContext;

  useEffect(() => {
    getNews2({ id_paciente: paciente._id });
    getCurb65({ id_paciente: paciente._id });
  }, [paciente]);

  return (
    <Fragment>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <CURB65
          paciente={paciente}
          data={curb65}
          addCurb65={addCurb65}
          getCurb65={getCurb65}
        />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <NEWS2
          paciente={paciente}
          data={news2}
          addNews2={addNews2}
          getNews2={getNews2}
        />
      </Grid>
    </Fragment>
  );
};

export default XrayView;
