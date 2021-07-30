import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
  Grid,
  Table,
  TableHead,
  TableBody,
  TextField,
  Typography,
  TableFooter,
  TablePagination,
  TableRow
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';
import AddBoxIcon from '@material-ui/icons/AddBox';

const HistoryCurrent = ({
  className,
  id,
  user,
  data,
  addHistoryCurrent,
  getHistoryCurrent,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getHistoryCurrent({ id_paciente: id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card {...rest}>
      <CardHeader
        title="Antecedentes de enfermedad actual"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button
            endIcon={<AddBoxIcon />}
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
          >
            NUEVO
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
              date: new Date()
                .toJSON()
                .slice(0, 10)
                .replace('/', '-'),
              disease: '',
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              date: Yup.date(),
              disease: Yup.string()
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
                professional_name: user._id
              };
              addHistoryCurrent(values);
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
                    Antecedentes de enfermedad actual
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      label="Fecha"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="date"
                      value={values.date}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <TextField
                      error={Boolean(touched.disease && errors.disease)}
                      fullWidth
                      helperText={touched.disease && errors.disease}
                      label="Enfermedad"
                      name="disease"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.disease}
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
                      rows={15}
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
          <Box height="auto" position="relative">
            <Table>
              <TableHead>
                <TableRowCustom>
                  <TableCellCustom>Fecha</TableCellCustom>
                  <TableCellCustom>Enfermedad</TableCellCustom>
                  <TableCellCustom>Observaciones</TableCellCustom>
                  <TableCellCustom>Nombre del Profesional</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.historyCurrents.map(historyCurrent => (
                    <TableRowCustom hover key={historyCurrent._id}>
                      <TableCellCustom>
                        {new Date(historyCurrent.date)
                          .toJSON()
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('/')}
                      </TableCellCustom>
                      <TableCellCustom>
                        {historyCurrent.disease}
                      </TableCellCustom>
                      <TableCellCustom>
                        {historyCurrent.observations}
                      </TableCellCustom>
                      <TableCellCustom>
                        {'Dr/a '}
                        {historyCurrent.professional_name.name}
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={['']}
                    count={data !== null ? data.total : 1}
                    rowsPerPage={3}
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
  );
};

HistoryCurrent.propTypes = {
  className: PropTypes.string
};

export default HistoryCurrent;
