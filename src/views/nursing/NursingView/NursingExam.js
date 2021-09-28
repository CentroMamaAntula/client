import React, { Fragment, useState } from 'react';
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
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  TablePagination,
  TableFooter,
  TableRow,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const NursingExam = ({
  className,
  user,
  paciente,
  data,
  addNursingExam,
  getNursingExam,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [obs, setObs] = useState('');
  const [imc, setImc] = useState(0);

  const handleChangeIMC = values => {
    setImc((values.weight / (values.size * values.size)).toFixed(2));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = obsTwo => {
    setObs(obsTwo);
    setOpenTwo(!openTwo);
  };

  const handleChangePage = (event, newPage) => {
    getNursingExam({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader
          title="Signos Vitales"
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
                date: new Date().toJSON().slice(0, 16),
                weight: 0,
                size: 0,
                imc: 0,
                abdomen: 0,
                temperature: 0,
                systolic_blood_pressure: 0,
                half_blood_pressure: 0,
                diastolic_blood_pressure: 0,
                heart_rate: 0,
                breathing_frequency: 0,
                saturometry: 0,
                observations: ''
              }}
              validationSchema={Yup.object().shape({
                date: Yup.date(),
                weight: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                size: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                imc: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                abdomen: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                temperature: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                systolic_blood_pressure: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                half_blood_pressure: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                diastolic_blood_pressure: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                heart_rate: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                breathing_frequency: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                saturometry: Yup.number()
                  .min(0, 'No puede ser menor a 0')
                  .max(400, 'No puede ser mayor a 400'),
                observations: Yup.string().max(
                  50000,
                  'No se puede superar los 50000 caracteres'
                )
              })}
              onSubmit={values => {
                values = {
                  ...values,
                  imc,
                  id_nurse: user._id,
                  id_paciente: paciente._id
                };
                addNursingExam(values);
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
                      Examen de Enfermeria
                    </Typography>
                  </Box>
                  <Grid
                    container
                    justify="center"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item lg={3} md={3} sm={4} xl={3} xs={6}>
                      <TextField
                        error={Boolean(touched.date && errors.date)}
                        fullWidth
                        helperText={touched.date && errors.date}
                        label="Fecha/Hora"
                        name="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="datetime-local"
                        value={values.date}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                      <TextField
                        error={Boolean(touched.weight && errors.weight)}
                        fullWidth
                        helperText={touched.weight && errors.weight}
                        label="Peso (kg)"
                        name="weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.weight}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                      <TextField
                        error={Boolean(touched.size && errors.size)}
                        fullWidth
                        helperText={touched.size && errors.size}
                        label="Talla (mts)"
                        name="size"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.size}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={1} md={1} sm={4} xl={1} xs={6}>
                      <TextField
                        error={Boolean(touched.imc && errors.imc)}
                        fullWidth
                        disabled
                        helperText={touched.imc && errors.imc}
                        label="IMC"
                        name="imc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onClick={e => handleChangeIMC(values)}
                        type="number"
                        value={imc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                      <TextField
                        error={Boolean(touched.abdomen && errors.abdomen)}
                        fullWidth
                        helperText={touched.abdomen && errors.abdomen}
                        label="Circunferencia adbominal"
                        name="abdomen"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.abdomen}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                      <TextField
                        error={Boolean(
                          touched.temperature && errors.temperature
                        )}
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
                        error={Boolean(
                          touched.half_blood_pressure &&
                            errors.half_blood_pressure
                        )}
                        fullWidth
                        helperText={
                          touched.half_blood_pressure &&
                          errors.half_blood_pressure
                        }
                        label="Media"
                        name="half_blood_pressure"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.half_blood_pressure}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
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
                        error={Boolean(
                          touched.saturometry && errors.saturometry
                        )}
                        fullWidth
                        helperText={touched.saturometry && errors.saturometry}
                        label="Saturometria"
                        name="saturometry"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.saturometry}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <TextField
                        error={Boolean(
                          touched.observations && errors.observations
                        )}
                        fullWidth
                        multiline
                        rows={15}
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
                    <TableCellCustom>Fecha/Hora</TableCellCustom>
                    <TableCellCustom>Peso</TableCellCustom>
                    <TableCellCustom>Talla</TableCellCustom>
                    <TableCellCustom>IMC</TableCellCustom>
                    <TableCellCustom>Circunferencia abdominal</TableCellCustom>
                    <TableCellCustom>Temperatura</TableCellCustom>
                    <TableCellCustom>PA sistolica</TableCellCustom>
                    <TableCellCustom>PA Media</TableCellCustom>
                    <TableCellCustom>PA diastolica</TableCellCustom>
                    <TableCellCustom>Frecuencia cardiaca</TableCellCustom>
                    <TableCellCustom>Frecuencia respiratoria</TableCellCustom>
                    <TableCellCustom>Saturometria</TableCellCustom>
                    <TableCellCustom>Observaciones</TableCellCustom>
                    <TableCellCustom>Realizado por</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  {data !== null &&
                    data.nursingExams.map(nursingExam => (
                      <TableRowCustom hover key={nursingExam._id}>
                        <TableCellCustom>
                          {`${new Date(nursingExam.date).toLocaleDateString()} 
                          ${new Date(nursingExam.date).toLocaleTimeString()}`}
                        </TableCellCustom>
                        <TableCellCustom>{nursingExam.weight}</TableCellCustom>
                        <TableCellCustom>{nursingExam.size}</TableCellCustom>
                        <TableCellCustom>{nursingExam.imc}</TableCellCustom>
                        <TableCellCustom>{nursingExam.abdomen}</TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.temperature}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.systolic_blood_pressure}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.half_blood_pressure}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.diastolic_blood_pressure}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.heart_rate}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.breathing_frequency}
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.saturometry}
                        </TableCellCustom>
                        <TableCellCustom>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={e => handleClick(nursingExam.observations)}
                          >
                            <PostAddRoundedIcon />
                          </IconButton>
                        </TableCellCustom>
                        <TableCellCustom>
                          {nursingExam.id_nurse.name}
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
                      onPageChange={handleChangePage}
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
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={openTwo}
        onClose={handleClick}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Exámen Enfermeria</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary="Observaciones" secondary={obs} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClick('')} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

NursingExam.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addNursingExam: PropTypes.func,
  getNursingExam: PropTypes.func
};

export default NursingExam;
