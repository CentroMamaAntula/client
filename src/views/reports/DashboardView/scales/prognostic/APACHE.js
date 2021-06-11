import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
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
import calculateAge from 'src/utils/calculateAge';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const APACHE = ({
  className,
  paciente,
  data,
  addApache,
  getApache,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [apache, setApache] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getApache({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  const calculateApache = values => {
    let value = 0;
    const {
      temperature,
      blood_pressure,
      heart_rate,
      breathing_frequency,
      FiO2,
      PaO2,
      pH_arterial,
      na_serico,
      k_serico,
      insuficiencia_renal,
      creatinina_serica,
      hematocrito,
      leucocitos,
      glasgow,
      chronic_problems
    } = values;

    value =
      temperature >= 41
        ? (value += 4)
        : temperature > 38.9
        ? (value += 3)
        : temperature > 38.4
        ? (value += 1)
        : temperature > 35.9
        ? (value += 0)
        : temperature > 33.9
        ? (value += 1)
        : temperature > 31.9
        ? (value += 2)
        : temperature > 29.9
        ? (value += 3)
        : (value += 4);

    value =
      blood_pressure > 159
        ? (value += 4)
        : blood_pressure > 129
        ? (value += 3)
        : blood_pressure > 109
        ? (value += 2)
        : blood_pressure > 69
        ? (value += 0)
        : blood_pressure > 49
        ? (value += 2)
        : (value += 4);

    value =
      heart_rate > 179
        ? (value += 4)
        : heart_rate > 139
        ? (value += 3)
        : heart_rate > 109
        ? (value += 2)
        : heart_rate > 69
        ? (value += 0)
        : heart_rate > 54
        ? (value += 2)
        : heart_rate > 39
        ? (value += 3)
        : (value += 4);

    value =
      breathing_frequency > 49
        ? (value += 4)
        : breathing_frequency > 34
        ? (value += 3)
        : breathing_frequency > 24
        ? (value += 1)
        : breathing_frequency > 11
        ? (value += 0)
        : breathing_frequency > 9
        ? (value += 1)
        : breathing_frequency > 5
        ? (value += 2)
        : (value += 4);

    if (FiO2 > 50) {
      value =
        PaO2 > 500
          ? (value += 4)
          : PaO2 > 349
          ? (value += 3)
          : PaO2 > 199
          ? (value += 2)
          : (value += 0);
    } else {
      value =
        PaO2 > 70
          ? (value += 0)
          : PaO2 > 60
          ? (value += 1)
          : PaO2 > 54
          ? (value += 3)
          : (value += 4);
    }

    value =
      pH_arterial > 7.69
        ? (value += 4)
        : pH_arterial > 7.59
        ? (value += 3)
        : pH_arterial > 7.49
        ? (value += 1)
        : pH_arterial > 7.32
        ? (value += 0)
        : pH_arterial > 7.24
        ? (value += 2)
        : pH_arterial > 7.14
        ? (value += 3)
        : (value += 4);

    value =
      na_serico > 179
        ? (value += 4)
        : na_serico > 159
        ? (value += 3)
        : na_serico > 154
        ? (value += 2)
        : na_serico > 149
        ? (value += 1)
        : na_serico > 119
        ? (value += 0)
        : na_serico > 110
        ? (value += 3)
        : (value += 4);

    value =
      k_serico > 6.9
        ? (value += 4)
        : k_serico > 5.9
        ? (value += 3)
        : k_serico > 5.4
        ? (value += 1)
        : k_serico > 3.4
        ? (value += 0)
        : k_serico > 2.9
        ? (value += 1)
        : k_serico > 2.4
        ? (value += 2)
        : (value += 4);

    if (insuficiencia_renal) {
      value =
        creatinina_serica > 3.4
          ? (value += 8)
          : creatinina_serica > 1.9
          ? (value += 6)
          : creatinina_serica > 1.4
          ? (value += 4)
          : creatinina_serica > 0.5
          ? (value += 0)
          : (value += 2);
    } else {
      value =
        creatinina_serica > 3.4
          ? (value += 4)
          : creatinina_serica > 1.9
          ? (value += 3)
          : creatinina_serica > 1.4
          ? (value += 2)
          : creatinina_serica > 0.5
          ? (value += 0)
          : (value += 2);
    }

    value =
      hematocrito > 59.9
        ? (value += 4)
        : hematocrito > 49.9
        ? (value += 2)
        : hematocrito > 45.9
        ? (value += 1)
        : hematocrito > 29.9
        ? (value += 0)
        : hematocrito > 19.9
        ? (value += 2)
        : (value += 4);

    value =
      leucocitos > 39.9
        ? (value += 4)
        : leucocitos > 19.9
        ? (value += 2)
        : leucocitos > 14.9
        ? (value += 1)
        : leucocitos > 2.9
        ? (value += 0)
        : leucocitos > 0.9
        ? (value += 2)
        : (value += 4);

    value = glasgow < 4 ? (value += 12) : (value += (glasgow - 15) * -1);

    value =
      chronic_problems === 1
        ? (value += 0)
        : chronic_problems === 2
        ? (value += 5)
        : chronic_problems === 3
        ? (value += 5)
        : (value += 2);

    const age = calculateAge(paciente.birthday);

    value =
      age < 45
        ? (value += 0)
        : age < 55
        ? (value += 2)
        : age < 64
        ? (value += 3)
        : age < 75
        ? (value += 5)
        : (value += 6);

    setApache(value);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="APACHE"
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
              temperature: 0,
              blood_pressure: 0,
              heart_rate: 0,
              breathing_frequency: 0,
              FiO2: 0,
              PaO2: 0,
              pH_arterial: 0,
              na_serico: 0,
              k_serico: 0,
              insuficiencia_renal: false,
              creatinina_serica: 0,
              hematocrito: 0,
              leucocitos: 0,
              glasgow: 0,
              chronic_problems: 1,
              value: 0
            }}
            validationSchema={Yup.object().shape({
              temperature: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Temperatura es requerido'),
              blood_pressure: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' es requerido'),
              heart_rate: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' es requerido'),
              breathing_frequency: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' es requerido'),
              FiO2: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              PaO2: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              pH_arterial: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              na_serico: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              k_serico: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              insuficiencia_renal: Yup.bool().required('Urea es requerido'),
              creatinina_serica: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              hematocrito: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              leucocitos: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              glasgow: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido')
            })}
            onSubmit={values => {
              values = {
                ...values,
                value: apache,
                date: Date.now(),
                age: calculateAge(paciente.birthday),
                id_paciente: paciente._id
              };
              addApache(values);
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
                    APACHE II
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
                      error={Boolean(touched.temperature && errors.temperature)}
                      fullWidth
                      helperText={touched.temperature && errors.temperature}
                      label="Temperatura °C"
                      name="temperature"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.temperature}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.blood_pressure && errors.blood_pressure
                      )}
                      fullWidth
                      helperText={
                        touched.blood_pressure && errors.blood_pressure
                      }
                      label="Tensión arterial media (mmHg)"
                      name="blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.heart_rate && errors.heart_rate)}
                      fullWidth
                      helperText={touched.heart_rate && errors.heart_rate}
                      label="Frecuencia cardíaca"
                      name="heart_rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.heart_rate}
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
                      label="Frecuencia respiratoria"
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
                      error={Boolean(touched.FiO2 && errors.FiO2)}
                      fullWidth
                      helperText={touched.FiO2 && errors.FiO2}
                      label="Fracción inspirada O2 (FIO2)"
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
                      error={Boolean(touched.PaO2 && errors.PaO2)}
                      fullWidth
                      helperText={touched.PaO2 && errors.PaO2}
                      label="A-aPO2 ó PaO2"
                      name="PaO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.PaO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.pH_arterial && errors.pH_arterial)}
                      fullWidth
                      helperText={touched.pH_arterial && errors.pH_arterial}
                      label="pH Arterial"
                      name="pH_arterial"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.pH_arterial}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.na_serico && errors.na_serico)}
                      fullWidth
                      helperText={touched.na_serico && errors.na_serico}
                      label="Na+ sérico (mEq/l)"
                      name="na_serico"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.na_serico}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.k_serico && errors.k_serico)}
                      fullWidth
                      helperText={touched.k_serico && errors.k_serico}
                      label="K+ sérico (mEq/l)"
                      name="k_serico"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.k_serico}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.insuficiencia_renal &&
                          errors.insuficiencia_renal
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.insuficiencia_renal &&
                        errors.insuficiencia_renal
                      }
                      label="Insuficiencia Renal"
                      name="insuficiencia_renal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.insuficiencia_renal}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO</MenuItem>
                      <MenuItem>SI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.creatinina_serica && errors.creatinina_serica
                      )}
                      fullWidth
                      helperText={
                        touched.creatinina_serica && errors.creatinina_serica
                      }
                      label="Creatinina sérica"
                      name="creatinina_serica"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.creatinina_serica}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.hematocrito && errors.hematocrito)}
                      fullWidth
                      helperText={touched.hematocrito && errors.hematocrito}
                      label="Hematocrito"
                      name="hematocrito"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.hematocrito}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.leucocitos && errors.leucocitos)}
                      fullWidth
                      helperText={touched.leucocitos && errors.leucocitos}
                      label="Recuento de leucocitos (10^9/l)"
                      name="leucocitos"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.leucocitos}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.glasgow && errors.glasgow)}
                      fullWidth
                      helperText={touched.glasgow && errors.glasgow}
                      label="Glasgow"
                      name="glasgow"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.glasgow}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.chronic_problems && errors.chronic_problems
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.chronic_problems && errors.chronic_problems
                      }
                      label="Problemas crónicos de salud"
                      name="chronic_problems"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.chronic_problems}
                      variant="outlined"
                    >
                      <MenuItem value={1}>Ninguno</MenuItem>
                      <MenuItem value={2}>No quirúrgico</MenuItem>
                      <MenuItem value={3}>
                        Operación quirúrgica urgente
                      </MenuItem>
                      <MenuItem value={4}>
                        Operación quirúrgica programada
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={8} md={8} sm={4} xl={8} xs={12}>
                    <Box>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={e => calculateApache(values)}
                      >
                        {apache}
                      </Button>
                    </Box>
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
                  <TableCellCustom>Temperatura</TableCellCustom>
                  <TableCellCustom>Presion Arterial</TableCellCustom>
                  <TableCellCustom>Ritmo Cardiaco</TableCellCustom>
                  <TableCellCustom>Frecuencia Respiratoria</TableCellCustom>
                  <TableCellCustom>Fracción inspirada O2</TableCellCustom>
                  <TableCellCustom>Pa02</TableCellCustom>
                  <TableCellCustom>pH Arterial</TableCellCustom>
                  <TableCellCustom>Na+ sérico (mEq/l)</TableCellCustom>
                  <TableCellCustom>K+ sérico (mEq/l)</TableCellCustom>
                  <TableCellCustom>Insuficiencia Renal</TableCellCustom>
                  <TableCellCustom>Creatinina sérica</TableCellCustom>
                  <TableCellCustom>Hematocrito</TableCellCustom>
                  <TableCellCustom>Leucocitos (10^9/l)</TableCellCustom>
                  <TableCellCustom>Glasgow</TableCellCustom>
                  <TableCellCustom>Problemas crónicos</TableCellCustom>
                  <TableCellCustom>Edad</TableCellCustom>
                  <TableCellCustom>VALOR</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.apache.map(apaches => (
                    <TableRowCustom hover key={apaches._id}>
                      <TableCellCustom>
                        {moment(apaches.date).format('DD/MM/YYYY HH:mm')}
                      </TableCellCustom>
                      <TableCellCustom>{apaches.temperature}</TableCellCustom>
                      <TableCellCustom>{apaches.blood_pressure}</TableCellCustom>
                      <TableCellCustom>{apaches.heart_rate}</TableCellCustom>
                      <TableCellCustom>
                        {apaches.breathing_frequency}
                      </TableCellCustom>
                      <TableCellCustom>{apaches.FiO2}</TableCellCustom>
                      <TableCellCustom>{apaches.PaO2}</TableCellCustom>
                      <TableCellCustom>{apaches.pH_arterial}</TableCellCustom>
                      <TableCellCustom>{apaches.na_serico}</TableCellCustom>
                      <TableCellCustom>{apaches.k_serico}</TableCellCustom>
                      <TableCellCustom>
                        {apaches.insuficiencia_renal ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>
                        {apaches.creatinina_serica}
                      </TableCellCustom>
                      <TableCellCustom>{apaches.hematocrito}</TableCellCustom>
                      <TableCellCustom>{apaches.leucocitos}</TableCellCustom>
                      <TableCellCustom>{apaches.glasgow}</TableCellCustom>
                      <TableCellCustom>
                        {apaches.chronic_problems === 1
                          ? 'Ninguno'
                          : apaches.chronic_problems === 2
                          ? 'No quirúrgico'
                          : apaches.chronic_problems === 3
                          ? 'Operación quirúrgica urgente'
                          : 'Operación quirúrgica programada'}
                      </TableCellCustom>
                      <TableCellCustom>{apaches.age}</TableCellCustom>
                      <TableCellCustom>
                        <Chip color="primary" label={apaches.value} />
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={['']}
                    count={data ? data.total : 1}
                    rowsPerPage={3}
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

APACHE.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addApache: PropTypes.func,
  getApache: PropTypes.func
};

export default APACHE;
