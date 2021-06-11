import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
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
  Dialog,
  DialogTitle,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent
} from '@material-ui/core';
import TableRowCustom from 'src/components/TableRowlCustom';
import TableCellCustom from 'src/components/TableCellCustom';
import moment from 'moment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Formik } from 'formik';

const useStyles = makeStyles({
  root: {},
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px'
  }
});

const OrderRX = ({
  className,
  user,
  paciente,
  dataOrders,
  report,
  addOrder,
  getReport,
  ...rest
}) => {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (report) {
      setUrlImage(
        `https://firebasestorage.googleapis.com/v0/b/mamantulahc.appspot.com/o/${report.plate}.${report.extension}?alt=media&token=e510d0c1-129a-4049-bda7-c951a4feae97`
      );
    }
  }, [report]);

  const handleClickAdd = () => {
    setOpenAdd(!openAdd);
  };
  const handleClickView = () => {
    setOpenView(!openView);
  };
  const handleClick = order => {
    getReport(order._id);
    handleClickView();
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Estudios del paciente"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button color="secondary" variant="outlined" onClick={handleClickAdd}>
            Nuevo
          </Button>
        }
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
                  <TableCellCustom>Informe Rx</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {dataOrders.map(order => (
                  <TableRowCustom hover key={order._id}>
                    <TableCellCustom>
                      {moment(order.date).format('DD/MM/YYYY HH:mm')}
                    </TableCellCustom>
                    <TableCellCustom>
                      {order.urgent ? 'SI' : 'NO'}
                    </TableCellCustom>
                    <TableCellCustom>
                      {`${order.type} ( ${order.subtype} )`}
                    </TableCellCustom>
                    <TableCellCustom>
                      {order.state ? 'REALIZADO' : 'NO REALIZADO'}
                    </TableCellCustom>
                    <TableCellCustom>
                      <Box display="flex">
                        <Button
                          disabled={!order.state}
                          color="primary"
                          endIcon={<ArrowRightIcon />}
                          size="small"
                          variant="outlined"
                          onClick={e => handleClick(order)}
                        >
                          Ver
                        </Button>
                      </Box>
                    </TableCellCustom>
                  </TableRowCustom>
                ))}
              </TableBody>
              {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={['']}
                      count={data.total}
                      rowsPerPage={3}
                      page={data.currentPage - 1}
                      onChangePage={handleChangePage}
                      ActionsComponent={TablePaginationActions}
                      labelDisplayedRows={handleLabelDisplay}
                    />
                  </TableRow>
                </TableFooter> */}
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>

      {/* dialog para agregar pedido de informe */}
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={openAdd}
        onClose={handleClickAdd}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              type: '',
              subtype: '',
              urgent: false,
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              type: Yup.string().required('Tipo es requerido'),
              subtype: Yup.string().required('Subtipo es requerido'),
              urgent: Yup.bool(),
              observations: Yup.string()
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                professional_name: user._id,
                id_paciente: paciente._id
              };
              addOrder(values);
              handleClickAdd();
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
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h3">
                    Solicitar Informe Rx
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
                      error={Boolean(touched.type && errors.type)}
                      fullWidth
                      select
                      helperText={touched.type && errors.type}
                      label="Tipo"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.type}
                      variant="outlined"
                    >
                      <MenuItem value={'Torax'}>Torax</MenuItem>
                      <MenuItem value={'Craneo'}>Craneo</MenuItem>
                      <MenuItem value={'Columna - Cervical'}>
                        Columna-Cervical
                      </MenuItem>
                      <MenuItem value={'Columna - Dorsal'}>
                        Columna-Dorsal
                      </MenuItem>
                      <MenuItem value={'Columna - LumboSacra'}>
                        Columna-LumboSacra
                      </MenuItem>
                      <MenuItem value={'Abdomen'}>Abdomen</MenuItem>
                      <MenuItem value={'MS - Hombro'}>MS-Hombro</MenuItem>
                      <MenuItem value={'MS - Codo'}>MS-Codo</MenuItem>
                      <MenuItem value={'MS - Antebrazo'}>MS-Antebrazo</MenuItem>
                      <MenuItem value={'MS - Mano'}>MS-Mano</MenuItem>
                      <MenuItem value={'MI - Pelvis'}>MI-Pelvis</MenuItem>
                      <MenuItem value={'MI - Femur'}>MI-Femur</MenuItem>
                      <MenuItem value={'MI - Rodilla'}>MI-Rodilla</MenuItem>
                      <MenuItem value={'MI - Pierna'}>MI-Pierna</MenuItem>
                      <MenuItem value={'MI - Pie'}>MI-Pie</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.subtype && errors.subtype)}
                      fullWidth
                      select
                      helperText={touched.subtype && errors.subtype}
                      label="(F) - (P) - (O)"
                      name="subtype"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.subtype}
                      variant="outlined"
                    >
                      <MenuItem value={'frente'}>Frente</MenuItem>
                      <MenuItem value={'perfil'}>Perfil</MenuItem>
                      <MenuItem value={'oblicuo'}>Oblicuo</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.urgent && errors.urgent)}
                      fullWidth
                      select
                      helperText={touched.urgent && errors.urgent}
                      label="¿Urgente?"
                      name="urgent"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.urgent}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO</MenuItem>
                      <MenuItem>SI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      multiline
                      rows={2}
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

      {/* dialog para ver el informe */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={openView}
        onClose={handleClickView}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Informe en base al estudio pedido
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Diagnostico"
                secondary={report ? ` ${report.diagnostic}` : ''}
              />
            </ListItem>
            <ListItem>
              <img className={classes.img} src={urlImage} alt="PLACA" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickView} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

OrderRX.propTypes = {
  //medico puede ver los informes pedidos, agregar un pedido y ver el informe
  className: PropTypes.string,
  user: PropTypes.object,
  paciente: PropTypes.object,
  dataOrders: PropTypes.array,
  report: PropTypes.object,
  addOrder: PropTypes.func,
  getReport: PropTypes.func
};

export default OrderRX;
