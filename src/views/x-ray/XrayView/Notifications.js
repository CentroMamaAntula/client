import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  Container,
  Grid,
  Typography,
  TextField
} from '@material-ui/core';
import TableRowCustom from 'src/components/TableRowlCustom';
import TableCellCustom from 'src/components/TableCellCustom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TablePaginationActions from 'src/components/TablePaginationActions';
import { Formik } from 'formik';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Notifications = ({
  className,
  user,
  orders,
  totalPages,
  currentPage,
  count,
  getOrders,
  editOrder,
  addReport,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderSelect, setOrderSelect] = useState(null);

  const handleOpen = order => {
    setOrderSelect(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getOrders({ newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, countTwo }) => {
    return `Mostrando desde ${from} a ${to} de ${countTwo}`;
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader="Pedidos o estudios pendientes"
          title="Notificaciones"
        />
        <Divider />
        <CardContent>
          <PerfectScrollbar>
            <Box height={400}>
              <Table>
                <TableHead>
                  <TableRowCustom>
                    <TableCellCustom>Fecha</TableCellCustom>
                    <TableCellCustom>URGENTE</TableCellCustom>
                    <TableCellCustom>Tipo</TableCellCustom>
                    <TableCellCustom>Estado</TableCellCustom>
                    <TableCellCustom>Observaciones</TableCellCustom>
                    <TableCellCustom>
                      Identificación del Paciente
                    </TableCellCustom>
                    <TableCellCustom>Informar</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  {orders.map(order => (
                    <TableRowCustom hover key={order._id}>
                      <TableCellCustom>
                        {moment(order.date).format('DD/MM/YYYY HH:mm')}
                      </TableCellCustom>
                      <TableCellCustom>
                        {order.urgent ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>{`${order.type} (${order.subtype})`}</TableCellCustom>
                      <TableCellCustom>
                        {order.state ? 'COMPLETADO' : 'NO COMPLETADO'}
                      </TableCellCustom>
                      <TableCellCustom>{order.observations}</TableCellCustom>
                      <TableCellCustom>{`${order.id_paciente.dni} ${order.id_paciente.name}`}</TableCellCustom>
                      <TableCellCustom>
                        <Box display="flex">
                          <Button
                            disabled={order.state}
                            color="primary"
                            endIcon={<ArrowRightIcon />}
                            size="small"
                            variant="outlined"
                            onClick={e => handleOpen(order)}
                          >
                            Informar
                          </Button>
                        </Box>
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={['']}
                      count={count}
                      rowsPerPage={5}
                      page={currentPage - 1}
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
        <Divider />
      </Card>

      {/* dalog para informar */}
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
              diagnostic: '',
              plate: ''
            }}
            validationSchema={Yup.object().shape({
              diagnostic: Yup.string().required('Diagnostico es requerido'),
              plate: Yup.mixed().required('Placa es requerido')
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                extension: values.plate.name.split('.').pop(),
                professional_name: user._id,
                id_order: orderSelect._id
              };
              editOrder({ ...orderSelect, state: true });
              addReport(values);
              handleClose();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h3">
                    Informe Rx
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item lg={8} md={6} sm={6} xl={8} xs={12}>
                    <TextField
                      error={Boolean(touched.diagnostic && errors.diagnostic)}
                      fullWidth
                      multiline
                      rows={3}
                      helperText={touched.diagnostic && errors.diagnostic}
                      label="Diagnostico"
                      name="diagnostic"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.diagnostic}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={4} md={6} sm={6} xl={4} xs={12}>
                    <input
                      hidden
                      accept="image/*, application/pdf"
                      name="plate"
                      id="contained-button-file"
                      type="file"
                      onChange={event => {
                        setFieldValue('plate', event.currentTarget.files[0]);
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        PLACA
                      </Button>
                    </label>
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
        </Container>
      </Dialog>
    </div>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  data: PropTypes.object,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  count: PropTypes.number,
  getOrders: PropTypes.func,
  editOrder: PropTypes.func,
  addReport: PropTypes.func
};

export default Notifications;
