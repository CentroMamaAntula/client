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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const themeGreen = createMuiTheme({
  palette: {
    primary: green
  }
});

const themeRed = createMuiTheme({
  palette: {
    primary: red
  }
});

const themeYellow = createMuiTheme({
  palette: {
    primary: yellow
  }
});

const NEWS2 = ({ className, paciente, data, addNews2, getNews2, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [news2, setNews2] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getNews2({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  const calculateNews2 = values => {
    let value = 0;
    const {
      breathing_frequency,
      o2_saturation,
      epoc,
      supplemental_oxygen,
      systolic_blood_pressure,
      heart_rate,
      conscience_level,
      temperature
    } = values;

    if (breathing_frequency > 24) {
      value += 3;
    } else if (breathing_frequency > 20) {
      value += 2;
    } else if (breathing_frequency > 11) {
      value += 0;
    } else if (breathing_frequency > 8) {
      value += 1;
    } else {
      value += 3;
    }
    if (epoc) {
      //escala 2
      if (o2_saturation > 96) {
        value += 3;
      } else if (o2_saturation > 94) {
        value += 2;
      } else if (o2_saturation > 92) {
        value += 1;
      } else if (o2_saturation > 87) {
        value += 0;
      } else if (o2_saturation > 85) {
        value += 1;
      } else if (o2_saturation > 83) {
        value += 2;
      } else {
        value += 3;
      }
    } else if (o2_saturation > 95) {
      //escala 1
      value += 0;
    } else if (o2_saturation > 93) {
      value += 1;
    } else if (o2_saturation > 91) {
      value += 2;
    } else {
      value += 3;
    }

    if (supplemental_oxygen) value += 2;

    if (systolic_blood_pressure > 219) {
      value += 3;
    } else if (systolic_blood_pressure > 110) {
      value += 0;
    } else if (systolic_blood_pressure > 100) {
      value += 1;
    } else if (systolic_blood_pressure > 90) {
      value += 2;
    } else {
      value += 3;
    }

    if (heart_rate > 130) {
      value += 3;
    } else if (heart_rate > 110) {
      value += 2;
    } else if (heart_rate > 90) {
      value += 1;
    } else if (heart_rate > 50) {
      value += 0;
    } else if (heart_rate > 40) {
      value += 1;
    } else {
      value += 3;
    }

    if (conscience_level) value += 3;

    if (temperature > 39) {
      value += 2;
    } else if (temperature > 38) {
      value += 1;
    } else if (temperature > 36) {
      value += 0;
    } else if (temperature > 35) {
      value += 1;
    } else {
      value += 3;
    }
    setNews2(value);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="NEWS2"
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
              breathing_frequency: 0,
              o2_saturation: 0,
              epoc: false,
              supplemental_oxygen: false,
              systolic_blood_pressure: 0,
              heart_rate: 0,
              conscience_level: false,
              temperature: 0,
              value: 0
            }}
            validationSchema={Yup.object().shape({
              breathing_frequency: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required(' Frecuencia Respiratoria es requerido'),
              o2_saturation: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Saturación arterial de Oxígeno es requerido'),
              epoc: Yup.bool(),
              supplemental_oxygen: Yup.bool(),
              systolic_blood_pressure: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              heart_rate: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido'),
              conscience_level: Yup.bool(),
              temperature: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
                .required('Urea es requerido')
            })}
            onSubmit={values => {
              values = {
                ...values,
                value: news2,
                date: Date.now(),
                id_paciente: paciente._id
              };
              addNews2(values);
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
                    NEWS2
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
                      error={Boolean(
                        touched.o2_saturation && errors.o2_saturation
                      )}
                      fullWidth
                      helperText={touched.o2_saturation && errors.o2_saturation}
                      label="Saturación O2"
                      name="o2_saturation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.o2_saturation}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
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
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
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
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.temperature && errors.temperature)}
                      fullWidth
                      helperText={touched.temperature && errors.temperature}
                      label="Temperatura"
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
                      error={Boolean(touched.epoc && errors.epoc)}
                      fullWidth
                      select
                      helperText={touched.epoc && errors.epoc}
                      label="EPOC/ASMA"
                      name="epoc"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.epoc}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO</MenuItem>
                      <MenuItem>SI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.supplemental_oxygen &&
                          errors.supplemental_oxygen
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.supplemental_oxygen &&
                        errors.supplemental_oxygen
                      }
                      label="O2 Suplementario"
                      name="supplemental_oxygen"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.supplemental_oxygen}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO</MenuItem>
                      <MenuItem>SI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.conscience_level && errors.conscience_level
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.conscience_level && errors.conscience_level
                      }
                      label="Nivel de Conciencia"
                      name="conscience_level"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.conscience_level}
                      variant="outlined"
                    >
                      <MenuItem value={false}>ALERTA</MenuItem>
                      <MenuItem>CVDI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={8} md={8} sm={4} xl={8} xs={12}>
                    <Box>
                      <ThemeProvider
                        theme={() => {
                          if (news2 < 5) return themeGreen;
                          if (news2 < 7) return themeYellow;
                          return themeRed;
                        }}
                      >
                        <Button
                          color="primary"
                          fullWidth
                          size="large"
                          variant="contained"
                          onClick={e => calculateNews2(values)}
                        >
                          {news2 < 5
                            ? `${news2}, evaluación por Enfermería`
                            : news2 < 7
                            ? `${news2}, revision urgente `
                            : `${news2}, Emergencia`}
                        </Button>
                      </ThemeProvider>
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
                  <TableCellCustom>Frecuencia Respiratoria</TableCellCustom>
                  <TableCellCustom>Saturacion O2</TableCellCustom>
                  <TableCellCustom>EPOC</TableCellCustom>
                  <TableCellCustom>O2 Suplementario</TableCellCustom>
                  <TableCellCustom>Presion Arterial Sis</TableCellCustom>
                  <TableCellCustom>Ritmo Cardiaco</TableCellCustom>
                  <TableCellCustom>Nivel de Conciencia</TableCellCustom>
                  <TableCellCustom>Temperatura</TableCellCustom>
                  <TableCellCustom>VALOR</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.news2.map(news => (
                    <TableRowCustom hover key={news._id}>
                      <TableCellCustom>
                        {moment(news.date).format('DD/MM/YYYY')}
                      </TableCellCustom>
                      <TableCellCustom>
                        {news.breathing_frequency}
                      </TableCellCustom>
                      <TableCellCustom>{news.o2_saturation}</TableCellCustom>
                      <TableCellCustom>
                        {news.epoc ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>
                        {news.supplemental_oxygen ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>
                        {news.systolic_blood_pressure}
                      </TableCellCustom>
                      <TableCellCustom>{news.heart_rate}</TableCellCustom>
                      <TableCellCustom>
                        {news.conscience_level ? 'CVDI' : 'ALERTA'}
                      </TableCellCustom>
                      <TableCellCustom>{news.temperature}</TableCellCustom>
                      <TableCellCustom>
                        <ThemeProvider
                          theme={() => {
                            if (news.value < 5) return themeGreen;
                            if (news.value < 6) return themeYellow;
                            return themeRed;
                          }}
                        >
                          <Chip color="primary" label={news2.value} />
                        </ThemeProvider>
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

NEWS2.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addNews2: PropTypes.func,
  getNews2: PropTypes.func
};

export default NEWS2;
