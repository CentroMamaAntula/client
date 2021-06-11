import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableHead,
  TextField,
  makeStyles,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  TablePagination,
  TableFooter,
  TableRow,
  MenuItem
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  actions: {
    justifyContent: 'flex-end'
  }
}));

const KinesiologyEvolution = ({
  className,
  user,
  paciente,
  data,
  addEvolution,
  getEvolution,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rox, setRox] = useState(0);

  const handleChangeRox = values => {
    const { SpO2, FiO2, breathing_frequency } = values;
    if (SpO2 > 0 && FiO2 > 0 && breathing_frequency > 0) {
      setRox(((SpO2 / FiO2 / breathing_frequency) * 100).toFixed(2));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getEvolution({
      id_paciente: paciente._id,
      newPage: newPage + 1
    });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Examen de Kinesiologia"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Nuevo
          </Button>
        }
      />
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              O2_admin: false,
              flow: false,
              SpO2: '',
              FiO2: '',
              breathing_frequency: '',
              respiratory_mechanics: '',
              heart_rate: '',
              auscultation: '',
              blood_gases: '',
              indications: '',
              systolic_blood_pressure: '',
              diastolic_blood_pressure: '',
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              SpO2: Yup.number()
                .min(85, 'No puede ser menor a 85')
                .max(98, 'No puede ser mayor a 98'),
              FiO2: Yup.number()
                .min(21, 'No puede ser menor a 21')
                .max(100, 'No puede ser mayor a 100'),
              breathing_frequency: Yup.number()
                .min(5, 'No puede ser menor a 5')
                .max(45, 'No puede ser mayor a 45'),
              o2_saturation: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              systolic_blood_pressure: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              diastolic_blood_pressure: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              heart_rate: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              conscience_level: Yup.bool(),
              temperature: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                rox,
                blood_pressure: `${values.systolic_blood_pressure}/${values.diastolic_blood_pressure}`,
                professional_name: user._id,
                id_paciente: paciente._id
              };
              addEvolution(values);
              handleClose();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h3">
                    Examen de Kinesiologia
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.O2_admin && errors.O2_admin)}
                      fullWidth
                      select
                      helperText={touched.O2_admin && errors.O2_admin}
                      label="Administracion de Oxigeno"
                      name="O2_admin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.O2_admin}
                      variant="outlined"
                    >
                      <MenuItem value={true}>SI</MenuItem>
                      <MenuItem value={false}>NO</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.flow && errors.flow)}
                      fullWidth
                      select
                      helperText={touched.flow && errors.flow}
                      label="Flujo"
                      name="flow"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.flow}
                      variant="outlined"
                    >
                      <MenuItem value={true}>Alto Flujo</MenuItem>
                      <MenuItem value={false}>Bajo Flujo</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.SpO2 && errors.SpO2)}
                      fullWidth
                      helperText={touched.SpO2 && errors.SpO2}
                      label="SpO2"
                      name="SpO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.SpO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.FiO2 && errors.FiO2)}
                      fullWidth
                      helperText={touched.FiO2 && errors.FiO2}
                      label="FiO2"
                      name="FiO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.FiO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.breathing_frequency &&
                          errors.breathing_frequency
                      )}
                      fullWidth
                      helperText={
                        touched.breathing_frequency &&
                        errors.breathing_frequency
                      }
                      label="Frecuencia Respiratoria"
                      name="breathing_frequency"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.breathing_frequency}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.rox && errors.rox)}
                      fullWidth
                      disabled
                      helperText={touched.rox && errors.rox}
                      label="Indice Rox"
                      name="rox"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onClick={e => handleChangeRox(values)}
                      type="number"
                      value={rox}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={4} />
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(touched.heart_rate && errors.heart_rate)}
                      fullWidth
                      helperText={touched.heart_rate && errors.heart_rate}
                      label="Ritmo Cardiaco"
                      name="heart_rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.heart_rate}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        touched.systolic_blood_pressure &&
                          errors.systolic_blood_pressure
                      )}
                      fullWidth
                      helperText={
                        touched.systolic_blood_pressure &&
                        errors.systolic_blood_pressure
                      }
                      label="PA sistólica"
                      name="systolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.systolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        touched.diastolic_blood_pressure &&
                          errors.diastolic_blood_pressure
                      )}
                      fullWidth
                      helperText={
                        touched.diastolic_blood_pressure &&
                        errors.diastolic_blood_pressure
                      }
                      label="PA diastolica"
                      name="diastolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.diastolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        touched.respiratory_mechanics &&
                          errors.respiratory_mechanics
                      )}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={
                        touched.respiratory_mechanics &&
                        errors.respiratory_mechanics
                      }
                      label="Mecanica Respiratoria"
                      name="respiratory_mechanics"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.respiratory_mechanics}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(
                        touched.auscultation && errors.auscultation
                      )}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.auscultation && errors.auscultation}
                      label="Auscultacion"
                      name="auscultation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.auscultation}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      error={Boolean(touched.blood_gases && errors.blood_gases)}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.blood_gases && errors.blood_gases}
                      label="Gases en sangre"
                      name="blood_gases"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.blood_gases}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(touched.indications && errors.indications)}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.indications && errors.indications}
                      label="Indicaciones/Trabajos"
                      name="indications"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.indications}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.observations && errors.observations}
                      label="Observaciones"
                      name="observations"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.observations}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    GUARDAR
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Dialog>
      <CardContent>
        <PerfectScrollbar>
          <Box height={400}>
            <Table>
              <TableHead>
                <TableRowCustom>
                  <TableCellCustom>Fecha</TableCellCustom>
                  <TableCellCustom>Administración O2</TableCellCustom>
                  <TableCellCustom>Flujo</TableCellCustom>
                  <TableCellCustom>SpO2</TableCellCustom>
                  <TableCellCustom>FiO2</TableCellCustom>
                  <TableCellCustom>Frec Respiratoria</TableCellCustom>
                  <TableCellCustom>Indice Rox</TableCellCustom>
                  <TableCellCustom>Mecanica Respiratoria</TableCellCustom>
                  <TableCellCustom>Presion Sanguinea</TableCellCustom>
                  <TableCellCustom>Frecuancia cardiaca</TableCellCustom>
                  <TableCellCustom>Auscultación</TableCellCustom>
                  <TableCellCustom>Gases en Sangre</TableCellCustom>
                  <TableCellCustom>Indicaciones/Trabajos</TableCellCustom>
                  <TableCellCustom>Observaciones</TableCellCustom>
                  <TableCellCustom>Profesional</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.evolutions.map(evolution => (
                    <TableRowCustom hover key={evolution._id}>
                      <TableCellCustom>
                        {`${new Date(evolution.date).toLocaleDateString()} 
                          ${new Date(evolution.date).toLocaleTimeString()}`}
                      </TableCellCustom>
                      <TableCellCustom>
                        {evolution.O2_admin ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>
                        {evolution.flow ? 'Alto Flujo' : 'Bajo Flujo'}
                      </TableCellCustom>
                      <TableCellCustom>{evolution.SpO2}</TableCellCustom>
                      <TableCellCustom>{evolution.FiO2}</TableCellCustom>
                      <TableCellCustom>
                        {evolution.breathing_frequency}
                      </TableCellCustom>
                      <TableCellCustom>{evolution.rox}</TableCellCustom>
                      <TableCellCustom>
                        {evolution.respiratory_mechanics}
                      </TableCellCustom>
                      <TableCellCustom>
                        {evolution.blood_pressure}
                      </TableCellCustom>
                      <TableCellCustom>{evolution.heart_rate}</TableCellCustom>
                      <TableCellCustom>
                        {evolution.auscultation}
                      </TableCellCustom>
                      <TableCellCustom>{evolution.blood_gases}</TableCellCustom>
                      <TableCellCustom>{evolution.indications}</TableCellCustom>
                      <TableCellCustom>
                        {evolution.observations}
                      </TableCellCustom>
                      <TableCellCustom>
                        {evolution.professional_name.name}
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={['']}
                    count={data ? data.total : 1}
                    rowsPerPage={5}
                    page={data ? data.currentPage - 1 : 1}
                    onChangePage={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                    labelDisplayedRows={handleLabelDisplay}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

KinesiologyEvolution.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addEvolution: PropTypes.func,
  getEvolution: PropTypes.func
};

export default KinesiologyEvolution;
