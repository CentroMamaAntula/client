import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import calculateAge from 'src/utils/calculateAge';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, yellow, red } from '@material-ui/core/colors';
import {
  Box,
  Button,
  Card,
  TextField,
  makeStyles,
  Container,
  Typography,
  Grid,
  CardHeader,
  Dialog,
  DialogTitle,
  Table,
  TableHead,
  TableBody,
  MenuItem,
  CardContent,
  TablePagination,
  TableFooter,
  TableRow,
  Chip
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
});

const themeGreen = createTheme({
  palette: {
    primary: green
  }
});

const themeRed = createTheme({
  palette: {
    primary: red
  }
});

const themeYellow = createTheme({
  palette: {
    primary: yellow
  }
});

////////////////////////////////////////////////////
const CURB65 = ({
  className,
  paciente,
  data,
  addCurb65,
  getCurb65,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [curb65, setCurb65] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getCurb65({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  const calculateCURB65 = values => {
    let value = 0;
    if (values.confusion) value++;
    if (values.urea > 19) value++;
    if (values.breathing > 29) value++;
    if (
      +values.systolic_blood_pressure < 90 ||
      values.diastolic_blood_pressure < 61
    ) {
      value++;
    }
    if (calculateAge(paciente.birthday) > 64) value++;
    setCurb65(value);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="CURB65"
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
      {/* dialog con form */}
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
              confusion: false,
              urea: 0,
              breathing: 0,
              systolic_blood_pressure: 0,
              diastolic_blood_pressure: 0,
              value: 0
            }}
            validationSchema={Yup.object().shape({
              confusion: Yup.bool(),
              urea: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(100, 'No puede ser mayor a 100'),
              breathing: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(100, 'No puede ser mayor a 100')
                .required('Urea es requerido'),
              systolic_blood_pressure: Yup.string().required(
                'La PA sistólica es requerida'
              ),
              diastolic_blood_pressure: Yup.string().required(
                'La PA diastólica es requerida'
              )
            })}
            onSubmit={values => {
              values = {
                ...values,
                value: curb65,
                date: Date.now(),
                id_paciente: paciente._id
              };
              addCurb65(values);
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
                    CURB65
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
                    <TextField
                      error={Boolean(touched.urea && errors.urea)}
                      fullWidth
                      helperText={touched.urea && errors.urea}
                      label="Urea"
                      name="urea"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.urea}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
                    <TextField
                      error={Boolean(touched.breathing && errors.breathing)}
                      fullWidth
                      helperText={touched.breathing && errors.breathing}
                      label="Frec. respiratoria (/m)"
                      name="breathing"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.breathing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
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
                      label="TA sistólica"
                      name="systolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.systolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
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
                      label="TA diastólica"
                      name="diastolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.diastolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
                    <TextField
                      error={Boolean(touched.confusion && errors.confusion)}
                      fullWidth
                      select
                      helperText={touched.confusion && errors.confusion}
                      label="Confusión"
                      name="confusion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.confusion}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO presenta</MenuItem>
                      <MenuItem>SI presenta</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={6}>
                    <Box>
                      <ThemeProvider
                        theme={() => {
                          if (curb65 < 2) return themeGreen;
                          if (curb65 < 4) return themeYellow;
                          return themeRed;
                        }}
                      >
                        <Button
                          color="primary"
                          fullWidth
                          size="large"
                          variant="contained"
                          onClick={e => calculateCURB65(values)}
                        >
                          {curb65 < 2
                            ? `${curb65}, Riesgo Bajo`
                            : `${curb65}, Riesgo Severo`}
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

      {/* tabla */}
      <CardContent>
        <PerfectScrollbar>
          <Box height={400}>
            <Table>
              <TableHead>
                <TableRowCustom>
                  <TableCellCustom>Fecha/Hora</TableCellCustom>
                  <TableCellCustom>Confusion</TableCellCustom>
                  <TableCellCustom>Urea</TableCellCustom>
                  <TableCellCustom>Respiración</TableCellCustom>
                  <TableCellCustom>Presión Arterial</TableCellCustom>
                  <TableCellCustom>VALOR</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.curb65.map(curb65s => (
                    <TableRowCustom hover key={curb65s._id}>
                      <TableCellCustom>
                        {moment(curb65s.date).format('DD/MM/YYYY HH:mm')}
                      </TableCellCustom>
                      <TableCellCustom>
                        {curb65s.confusion ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>{curb65s.urea}</TableCellCustom>
                      <TableCellCustom>{curb65s.breathing}</TableCellCustom>
                      <TableCellCustom>
                        {`${curb65s.systolic_blood_pressure}/
                        ${curb65s.diastolic_blood_pressure}`}
                      </TableCellCustom>
                      <TableCellCustom>
                        <ThemeProvider
                          theme={() => {
                            if (curb65s.value < 2) return themeGreen;
                            if (curb65s.value < 4) return themeYellow;
                            return themeRed;
                          }}
                        >
                          <Chip color="primary" label={curb65.value} />
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

CURB65.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addCurb65: PropTypes.func,
  getCurb65: PropTypes.func
};

export default CURB65;
