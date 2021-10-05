import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import moment from 'moment';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Epicrisis = ({ className, ...rest }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const [{ activities, historysCurrent, paciente, treatments }] = useState(JSON.parse(localStorage.getItem('clinicHistory')));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    if (localStorage.getItem('clinicHistory') === null) {
      window.close();
    }
    return () => {
      localStorage.removeItem('clinicHistory');
    };
  }, []);

  return (
    <Page className={classes.root} title="Imprimir Historia Clinica">
      <Container
        maxWidth="lg"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box m={4} ref={componentRef}>
          <Card>
            <CardHeader
              subheader="Centro de Salud Mama Antula"
              title="Historia Clinica"
              titleTypographyProps={{ variant: 'h1' }}
              style={{ textAlign: 'center' }}
            />
            <Divider />
            <CardHeader
              title="Datos del Paciente"
              titleTypographyProps={{ variant: 'h3' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Nombre y Apellido
                  </Typography>
                  <Typography>{paciente.name}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    N° de documento
                  </Typography>
                  <Typography>{paciente.dni}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Domicilio
                  </Typography>
                  <Typography>{paciente.domicile}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Localidad
                  </Typography>
                  <Typography>{paciente.location}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Telefono
                  </Typography>
                  <Typography>{paciente.phone}</Typography>
                  <Typography>{paciente.family_phone}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Cobertura Social
                  </Typography>
                  <Typography>{paciente.social_coverage}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item container spacing={6} wrap="nowrap" justify="center">
                  {activities ? activities.map(activity => (
                    <Grid className={classes.item} item md={4} sm={6} xs={12}>
                      <Typography color="textPrimary" gutterBottom variant="h6">
                        {`Fecha de ${activity.type}:
                        ${moment(activity.date).format('DD/MM/YYYY')}`}
                      </Typography>
                    </Grid>
                  )) : null}
                </Grid>
                <Grid item container sm={12} spacing={2} justify="center">
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      Antecedendes de Enfermedad Actual
                    </Typography>
                    {historysCurrent.map(hc => (
                      <Typography color="textPrimary" gutterBottom variant="h6">
                        {`${moment(hc.date).format('DD/MM/YYYY HH:mm')}\t${hc.disease}\t${hc.observations}\nDr/a ${hc.professional_name.name}`}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Tratamiento
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {treatments.map(t => (
                        <Typography color="textPrimary" gutterBottom variant="h6">
                          {`${moment(t.date).format('DD/MM/YYYY HH:mm')} \t${t.disease ? t.disease : ''} \t${t.observations}\n Dr/a ${t.professional_name.name}`}
                        </Typography>
                      ))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handlePrint}>
            Imprimir
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

Epicrisis.propTypes = {
  className: PropTypes.string
};

export default Epicrisis;
