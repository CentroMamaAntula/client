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
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  TablePagination,
  TableFooter,
  TableRow,
  DialogContent
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

const HemotherapyExam = ({
  className,
  user,
  paciente,
  data,
  disabled,
  addApplication,
  getApplication,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getApplication({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader
          title=""
          titleTypographyProps={{ variant: 'h3' }}
          action={
            <Button
              disabled={disabled}
              color="secondary"
              variant="outlined"
              onClick={handleClick}
            >
              Nuevo
            </Button>
          }
        />

        <CardContent>
          <PerfectScrollbar>
            <Box height={400}>
              <Table>
                <TableHead>
                  <TableRowCustom>
                    <TableCellCustom>Fecha/Hora</TableCellCustom>
                    <TableCellCustom>Hemocomponente/Hemoderivado</TableCellCustom>
                    <TableCellCustom>Número de Unidades</TableCellCustom>
                    <TableCellCustom>Tecnicas utilizadas</TableCellCustom>
                    <TableCellCustom>Resultados</TableCellCustom>
                    <TableCellCustom>Realizado por</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  {data &&
                    data.applications.map(application => (
                      <TableRowCustom hover key={application._id}>
                        <TableCellCustom>
                          {`${new Date(application.date).toLocaleDateString()} 
                          ${new Date(application.date).toLocaleTimeString()}`}
                        </TableCellCustom>
                        <TableCellCustom>
                          {application.hemocomponente}
                        </TableCellCustom>
                        <TableCellCustom>
                          {application.numUnidad}
                        </TableCellCustom>
                        <TableCellCustom>
                          {application.tecnicas}
                        </TableCellCustom>
                        <TableCellCustom>
                          {application.resultados}
                        </TableCellCustom>
                        <TableCellCustom>
                          {application.professional_name.name}
                        </TableCellCustom>
                      </TableRowCustom>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPage={3}
                      rowsPerPageOptions={['']}
                      count={data ? data.total : 1}
                      page={data ? data.currentPage - 1 : 1}
                      onPageChange={handleChangePage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </PerfectScrollbar>
        </CardContent>
      </Card>

      {/* dialog new */}
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <DialogContent>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                date: new Date().toJSON().slice(0, 16),
                hemocomponente: '',
                numUnidad: '',
                tecnicas: '',
                resultados: ''
              }}
              validationSchema={Yup.object().shape({
                date: Yup.date(),
                hemocomponente: Yup.string().max(
                  50000,
                  'No se puede superar los 50000 caracteres'
                ),
                numUnidad: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
                tecnicas: Yup.string().max(
                  50000,
                  'No se puede superar los 50000 caracteres'
                ),
                resultados: Yup.string().max(
                  50000,
                  'No se puede superar los 50000 caracteres'
                ),
              })}
              onSubmit={values => {
                values = {
                  ...values,
                  professional_name: user._id,
                  id_paciente: paciente._id
                };
                addApplication(values);
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
                      {''}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    justify="center"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.hemocomponente && errors.hemocomponente)}
                        fullWidth
                        helperText={touched.hemocomponente && errors.hemocomponente}
                        label="Hemocomponente/Hemoderivado"
                        name="hemocomponente"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.hemocomponente}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.numUnidad && errors.numUnidad)}
                        fullWidth
                        helperText={touched.numUnidad && errors.numUnidad}
                        label="N° Unidad"
                        name="numUnidad"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.numUnidad}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.tecnicas && errors.tecnicas)}
                        fullWidth
                        helperText={touched.tecnicas && errors.tecnicas}
                        label="Tecnicas Empleadas"
                        name="tecnicas"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.tecnicas}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.resultados && errors.resultados)}
                        fullWidth
                        helperText={touched.resultados && errors.resultados}
                        label="Resultados"
                        name="resultados"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.resultados}
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
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

HemotherapyExam.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  addApplication: PropTypes.func,
  getApplication: PropTypes.func
};

export default HemotherapyExam;
