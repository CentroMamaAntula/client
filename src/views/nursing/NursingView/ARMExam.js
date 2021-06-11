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
  TableRow
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

const ARMExam = ({
  className,
  user,
  paciente,
  data,
  addARME,
  getARME,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getARME({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Asistencia Respiratoria Mecanica"
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
              mode: '',
              breathing_frequency: 0,
              fiO2: 0,
              inspiration: 0,
              expiration: 0,
              pim: 0,
              peep: 0,
              vol: 0
            }}
            validationSchema={Yup.object().shape({
              date: Yup.date(),
              mode: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              breathing_frequency: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              fiO2: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              inspiration: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              expiration: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              pim: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              peep: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              vol: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400')
            })}
            onSubmit={values => {
              values = {
                ...values,
                id_nurse: user._id,
                id_paciente: paciente._id
              };
              addARME(values);
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
                    Examen ARM
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item md={4} sm={4} xs={6}>
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
                  <Grid item md={3} sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.mode && errors.mode)}
                      fullWidth
                      helperText={touched.mode && errors.mode}
                      label="Modo"
                      name="mode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.mode}
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
                      error={Boolean(touched.fiO2 && errors.fiO2)}
                      fullWidth
                      helperText={touched.fiO2 && errors.fiO2}
                      label="FiO2"
                      name="fiO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.fiO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.inspiration && errors.inspiration)}
                      fullWidth
                      helperText={touched.inspiration && errors.inspiration}
                      label="Inspiración (tiempo)"
                      name="inspiration"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.inspiration}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.expiration && errors.expiration)}
                      fullWidth
                      helperText={touched.expiration && errors.expiration}
                      label="Espiración (tiempo)"
                      name="expiration"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.expiration}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.pim && errors.pim)}
                      fullWidth
                      helperText={touched.pim && errors.pim}
                      label="PIM"
                      name="pim"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.pim}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.peep && errors.peep)}
                      fullWidth
                      helperText={touched.peep && errors.peep}
                      label="PEEP"
                      name="peep"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.peep}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.vol && errors.vol)}
                      fullWidth
                      helperText={touched.vol && errors.vol}
                      label="Volumen"
                      name="vol"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.vol}
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
                  <TableCellCustom>Modo</TableCellCustom>
                  <TableCellCustom>Frecuencia Respiratoria</TableCellCustom>
                  <TableCellCustom>FiO2</TableCellCustom>
                  <TableCellCustom>Inspiración (tiempo)</TableCellCustom>
                  <TableCellCustom>Espiración (tiempo)</TableCellCustom>
                  <TableCellCustom>PIM</TableCellCustom>
                  <TableCellCustom>PEEP</TableCellCustom>
                  <TableCellCustom>Volumen</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.armes.map(arme => (
                    <TableRowCustom hover key={arme._id}>
                      <TableCellCustom>
                        {`${new Date(arme.date).toLocaleDateString()} 
                          ${new Date(arme.date).toLocaleTimeString()}`}
                      </TableCellCustom>
                      <TableCellCustom>{arme.mode}</TableCellCustom>
                      <TableCellCustom>
                        {arme.breathing_frequency}
                      </TableCellCustom>
                      <TableCellCustom>{arme.fiO2}</TableCellCustom>
                      <TableCellCustom>{arme.inspiration}</TableCellCustom>
                      <TableCellCustom>{arme.expiration}</TableCellCustom>
                      <TableCellCustom>{arme.pim}</TableCellCustom>
                      <TableCellCustom>{arme.peep}</TableCellCustom>
                      <TableCellCustom>{arme.vol}</TableCellCustom>
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

ARMExam.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addNursingExam: PropTypes.func,
  getNursingExam: PropTypes.func
};

export default ARMExam;
