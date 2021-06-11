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
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SOFA = ({ className, paciente, data, addSofa, getSofa, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [sofa, setSofa] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getSofa({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  const calculateSofa = values => {
    let value = 0;
    const {
      PaO2,
      FiO2,
      mechanical_ventilation,
      platelets,
      glasgow,
      bilirubin,
      blood_pressure,
      creatinine
    } = values;

    const pao2_fi02 = (PaO2 / FiO2) * 100;

    value =
      pao2_fi02 > 399
        ? (value += 0)
        : pao2_fi02 > 299
        ? (value += 1)
        : pao2_fi02 > 199
        ? (value += 2)
        : pao2_fi02 <= 199 && !mechanical_ventilation
        ? (value += 2)
        : pao2_fi02 > 100 && mechanical_ventilation
        ? (value += 2)
        : (value += 4);

    value =
      platelets < 20
        ? (value += 4)
        : platelets < 50
        ? (value += 3)
        : platelets < 100
        ? (value += 2)
        : platelets < 150
        ? (value += 1)
        : (value += 0);

    value =
      glasgow < 6
        ? (value += 4)
        : glasgow < 10
        ? (value += 3)
        : glasgow < 13
        ? (value += 2)
        : glasgow < 15
        ? (value += 1)
        : (value += 0);

    value =
      bilirubin < 1.2
        ? (value += 0)
        : bilirubin < 2
        ? (value += 1)
        : bilirubin < 6
        ? (value += 2)
        : bilirubin < 12
        ? (value += 3)
        : (value += 4);

    value += blood_pressure;

    value =
      creatinine < 1.2
        ? (value += 0)
        : creatinine < 2
        ? (value += 1)
        : creatinine < 3.5
        ? (value += 2)
        : creatinine < 5.0
        ? (value += 3)
        : (value += 4);

    setSofa(value);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="SOFA"
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
              PaO2: 0,
              FiO2: 0,
              mechanical_ventilation: false,
              platelets: 0,
              glasgow: 0,
              bilirubin: 0,
              blood_pressure: 0,
              creatinine: 0,
              value: 0
            }}
            validationSchema={Yup.object().shape({
              PaO2: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              FiO2: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              mechanical_ventilation: Yup.boolean().required(
                'Ventilacion Mecanica es requerido'
              ),
              platelets: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Plaquetas es requerido'),
              glasgow: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              bilirubin: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' es requerido'),
              blood_pressure: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' es requerido'),
              creatinine: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido')
            })}
            onSubmit={values => {
              values = {
                ...values,
                value: sofa,
                date: Date.now(),
                id_paciente: paciente._id
              };
              addSofa(values);
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
                    SOFA
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
                      error={Boolean(touched.PaO2 && errors.PaO2)}
                      fullWidth
                      helperText={touched.PaO2 && errors.PaO2}
                      label="PaO2"
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
                        touched.mechanical_ventilation &&
                          errors.mechanical_ventilation
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.mechanical_ventilation &&
                        errors.mechanical_ventilation
                      }
                      label="Ventilación Mecanica"
                      name="mechanical_ventilation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.mechanical_ventilation}
                      variant="outlined"
                    >
                      <MenuItem value={false}>No</MenuItem>
                      <MenuItem>Si</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.platelets && errors.platelets)}
                      fullWidth
                      helperText={touched.platelets && errors.platelets}
                      label="Plaquetas×10³/µL"
                      name="platelets"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.platelets}
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
                      error={Boolean(touched.bilirubin && errors.bilirubin)}
                      fullWidth
                      helperText={touched.bilirubin && errors.bilirubin}
                      label="Bilirrubina mg/dL"
                      name="bilirubin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.bilirubin}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.blood_pressure && errors.blood_pressure
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.blood_pressure && errors.blood_pressure
                      }
                      label="Tensión Arterial media"
                      name="blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.blood_pressure}
                      variant="outlined"
                    >
                      <MenuItem value={0}>{'Hipotensión ausente'}</MenuItem>
                      <MenuItem value={1}>
                        {'Presión arterial media <70 mmHg'}
                      </MenuItem>
                      <MenuItem value={2}>
                        {'Con dopamina ≤5 mcg/kg/min o cualquier dobutamina'}
                      </MenuItem>
                      <MenuItem value={3}>
                        {
                          'Con dopamina > 5 mcg /kg/min, epinefrina <= 0,1 mcg/kg/min o noradrenalina <= 0,1 mcg/kg/min'
                        }
                      </MenuItem>
                      <MenuItem value={4}>
                        {
                          'Con dopamina > 15 mcg/kg/min o epinefrina> 0,1 mcg/kg/min o noradrenalina> 0,1 mcg/kg/min'
                        }
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.creatinine && errors.creatinine)}
                      fullWidth
                      helperText={touched.creatinine && errors.creatinine}
                      label="Creatinina (mg/dL)"
                      name="creatinine"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.creatinine}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={8} md={8} sm={4} xl={8} xs={12}>
                    <Box>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={e => calculateSofa(values)}
                      >
                        {sofa}
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
                  <TableCellCustom>PaO2</TableCellCustom>
                  <TableCellCustom>FiO2</TableCellCustom>
                  <TableCellCustom>Ventilacion Mecanica</TableCellCustom>
                  <TableCellCustom>Plaquetas</TableCellCustom>
                  <TableCellCustom>Glasgow</TableCellCustom>
                  <TableCellCustom>Bilirrubina</TableCellCustom>
                  <TableCellCustom>Tension Arterial</TableCellCustom>
                  <TableCellCustom>Creatinina</TableCellCustom>
                  <TableCellCustom>VALOR</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.sofa.map(sofas => (
                    <TableRowCustom hover key={sofas._id}>
                      <TableCellCustom>
                        {moment(sofas.date).format('DD/MM/YYYY HH:mm')}
                      </TableCellCustom>
                      <TableCellCustom>{sofas.PaO2}</TableCellCustom>
                      <TableCellCustom>{sofas.FiO2}</TableCellCustom>
                      <TableCellCustom>
                        {sofas.mechanical_ventilation ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>{sofas.platelets}</TableCellCustom>
                      <TableCellCustom>{sofas.glasgow}</TableCellCustom>
                      <TableCellCustom>{sofas.bilirubin}</TableCellCustom>
                      <TableCellCustom>
                        {sofas.blood_pressure === 0
                          ? 'Hipotensión ausente'
                          : sofas.blood_pressure === 1
                          ? 'Presión arterial media <70 mmHg'
                          : sofas.blood_pressure === 2
                          ? 'Con dopamina ≤5 mcg/kg/min o cualquier dobutamina'
                          : sofas.blood_pressure === 2
                          ? 'Con dopamina > 5 mcg/kg/min'
                          : 'Con dopamina > 15 mcg/kg/min '}
                      </TableCellCustom>
                      <TableCellCustom>{sofas.creatinine}</TableCellCustom>
                      <TableCellCustom>
                        <Chip color="primary" label={sofas.value} />
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={['']}
                    count={data ? data.total : 0}
                    rowsPerPage={3}
                    page={data ? data.currentPage - 1 : 0}
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

SOFA.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addSofa: PropTypes.func,
  getSofa: PropTypes.func
};

export default SOFA;
