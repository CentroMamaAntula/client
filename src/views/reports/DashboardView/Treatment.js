import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Grid,
  Table,
  TableHead,
  TableBody,
  TextField,
  Typography,
  TableFooter,
  TablePagination,
  TableRow,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';

const Treatment = ({
  className,
  disabled,
  id,
  user,
  data,
  addTreatment,
  getTreatment,
  application,
  addApplication,
  getApplication,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [idTreatment, setIdTreatment] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = id => {
    if (id) {
      setIdTreatment(id);
      getApplication(id);
    }
    setOpenTwo(!openTwo);
  };

  const handleClickClose = () => {
    setIdTreatment(null);
    setOpenTwo(!openTwo);
  };

  const handleChangePage = (event, newPage) => {
    getTreatment({ id_paciente: id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Fragment>
      <Card {...rest}>
        <CardHeader
          title="Tratamientos"
          titleTypographyProps={{ variant: 'h3' }}
          action={
            <Button
              disabled={disabled}
              endIcon={<AddBoxIcon />}
              color="secondary"
              variant="outlined"
              onClick={handleClickOpen}
            >
              NUEVO
            </Button>
          }
        />
        <CardContent>
          <PerfectScrollbar>
            <Box height="auto" position="relative">
              <Table>
                <TableHead>
                  <TableRowCustom>
                    <TableCellCustom>Tratamiento</TableCellCustom>
                    <TableCellCustom>Observaciones</TableCellCustom>
                    <TableCellCustom>Fecha/Hora</TableCellCustom>
                    <TableCellCustom>Aplicaciones/Enfermeria</TableCellCustom>
                    <TableCellCustom>Nombre del Profesional</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  {data !== null &&
                    data.treatments.map(treatment => (
                      <TableRowCustom hover key={treatment._id}>
                        <TableCellCustom>{treatment.name}</TableCellCustom>
                        <TableCellCustom style={{ whiteSpace: 'pre' }}>
                          {treatment.observations}
                        </TableCellCustom>
                        <TableCellCustom>
                          {`${new Date(treatment.date).toLocaleDateString()} 
                          ${new Date(treatment.date).toLocaleTimeString()}`}
                        </TableCellCustom>
                        <TableCellCustom>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={e => handleClick(treatment._id)}
                          >
                            <PostAddRoundedIcon />
                          </IconButton>
                        </TableCellCustom>
                        <TableCellCustom>
                          {'Dr/a '}
                          {treatment.professional_name.name}
                        </TableCellCustom>
                      </TableRowCustom>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={['']}
                      count={data !== null ? data.total : 1}
                      rowsPerPage={5}
                      page={data !== null ? data.currentPage - 1 : 1}
                      onChangePage={handleChangePage}
                      /*ActionsComponent={TablePaginationActions}*/
                      labelDisplayedRows={handleLabelDisplay}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </PerfectScrollbar>
        </CardContent>
      </Card>

      {/* Dialog de nuevo tratamiento */}
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
              name: '',
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(3000, 'No exceder los 3000 caracteres')
                .required('El nombre del tratamiento es requerido'),
              observations: Yup.string()
                .max(3000, 'No exceder los 3000 caracteres')
                .required('Observaciones es requerido')
            })}
            onSubmit={values => {
              values = {
                ...values,
                id_paciente: id,
                date: Date.now(),
                type: user.role === 'enfermero' ? 'de Enfermería' : 'Médico',
                professional_name: user._id
              };
              addTreatment(values);
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
                    Nuevo Tratamiento
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Nombre del Tratamiento"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      helperText={touched.observations && errors.observations}
                      label="Observaciones"
                      name="observations"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={10}
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

      {/* Dialog de Aplicaciones de enfermeria */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'lg'}
        open={openTwo}
        onClose={handleClickClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Aplicaciones del tratamiento médico
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Formik
                initialValues={{
                  date: new Date().toJSON().slice(0, 16),
                  observations: ''
                }}
                validationSchema={Yup.object().shape({
                  date: Yup.date(),
                  observations: Yup.string()
                    .max(10000, 'No exceder los 10000 caracteres')
                    .required('Observaciones es requerido')
                })}
                onSubmit={values => {
                  values = {
                    ...values,
                    id_treatment: idTreatment,
                    id_nurse: user._id
                  };
                  addApplication(values);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <Box mb={1}>
                      <Typography color="textPrimary" variant="h3">
                        Nueva Aplicación
                      </Typography>
                    </Box>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={1}
                    >
                      <Grid item xs={12}>
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
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(
                            touched.observations && errors.observations
                          )}
                          fullWidth
                          helperText={
                            touched.observations && errors.observations
                          }
                          label="Observaciones"
                          name="observations"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          multiline
                          rows={15}
                          value={values.observations}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box my={2}>
                      <Button
                        color="primary"
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
            </Grid>
            <Grid item xs={6}>
              <List>
                {application
                  ? application.map(app => (
                      <ListItem key={app._id}>
                        <ListItemText
                          primary={
                            <Box mb={1}>
                              <Typography variant="h5">
                                {moment(app.date).format('DD/MM/YYYY HH:mm')}
                              </Typography>
                              <Typography variant="h4">
                                {app.observations}
                              </Typography>
                              <Typography variant="h5">
                                {app.id_nurse.name}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))
                  : null}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClickClose(null)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

Treatment.propTypes = {
  className: PropTypes.string
};

export default Treatment;
