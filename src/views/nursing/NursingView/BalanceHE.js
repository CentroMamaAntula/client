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
  IconButton,
  Collapse
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const BalanceHE = ({
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    getNursingExam({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Balance Hidroelectrolitico"
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
              gout: '',
              jar: '',
              typeP: '',
              start: '',
              end: '',
              typeE: '',
              cant: '',
              diet: '',
              sng: '',
              vosolution: '',
              //egresos
              diuresis: '',
              sngE: '',
              lu: '',
              loquios: '',
              heces: '',
              drains: ''
            }}
            validationSchema={Yup.object().shape({
              date: Yup.date(),
              gout: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              jar: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              typeP: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              start: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              end: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              typeE: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              cant: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              diet: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              sng: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              vosolution: Yup.number()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              diuresis: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              sngE: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              lu: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              loquios: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              heces: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              drains: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(400, 'No puede ser mayor a 400'),
              observations: Yup.string()
                .min(0, 'No puede ser menor a 0')
                .max(50000, 'No puede ser mayor a 50000')
            })}
            onSubmit={values => {
              values = {
                ...values,
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
                    Balance Hidroelectrolitico
                  </Typography>
                </Box>
                <Box mt={2} mb={1}>
                  <Typography color="textPrimary" variant="h4">
                    Ingresos
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography color="textPrimary" variant="h5">
                    Via Parenteral
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
                      error={Boolean(touched.gout && errors.gout)}
                      fullWidth
                      helperText={touched.gout && errors.gout}
                      label="Gota"
                      name="gout"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.gout}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.jar && errors.jar)}
                      fullWidth
                      helperText={touched.jar && errors.jar}
                      label="Frasco"
                      name="jar"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.jar}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.typeP && errors.typeP)}
                      fullWidth
                      helperText={touched.typeP && errors.typeP}
                      label="Tipo"
                      name="typeP"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.typeP}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.start && errors.start)}
                      fullWidth
                      helperText={touched.start && errors.start}
                      label="Inicio"
                      name="start"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.start}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.end && errors.end)}
                      fullWidth
                      helperText={touched.end && errors.end}
                      label="Fin"
                      name="end"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.end}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={1} mb={1}>
                  <Typography color="textPrimary" variant="h5">
                    Via Enteral
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.typeE && errors.typeE)}
                      fullWidth
                      helperText={touched.typeE && errors.typeE}
                      label="Tipo"
                      name="typeE"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.typeE}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.cant && errors.cant)}
                      fullWidth
                      helperText={touched.cant && errors.cant}
                      label="Cantidad"
                      name="cant"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.cant}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={1} mb={1}>
                  <Typography color="textPrimary" variant="h5">
                    Alimentación
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.diet && errors.diet)}
                      fullWidth
                      helperText={touched.diet && errors.diet}
                      label="Dieta"
                      name="diet"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.diet}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.sng && errors.sng)}
                      fullWidth
                      helperText={touched.sng && errors.sng}
                      label="SNG"
                      name="sng"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.sng}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={1} mb={1}>
                  <Typography color="textPrimary" variant="h5">
                    Hidratación
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item sm={4} xs={6}>
                    <TextField
                      error={Boolean(touched.vosolution && errors.vosolution)}
                      fullWidth
                      helperText={touched.vosolution && errors.vosolution}
                      label="V.O. Solución"
                      name="vosolution"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.vosolution}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={4} mb={2}>
                  <Typography color="textPrimary" variant="h4">
                    Egresos
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
                      error={Boolean(touched.diuresis && errors.diuresis)}
                      fullWidth
                      helperText={touched.diuresis && errors.diuresis}
                      label="Diuresis"
                      name="diuresis"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.diuresis}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.sngE && errors.sngE)}
                      fullWidth
                      helperText={touched.sngE && errors.sngE}
                      label="SNG"
                      name="sngE"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.sngE}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.lu && errors.lu)}
                      fullWidth
                      helperText={touched.lu && errors.lu}
                      label="LU"
                      name="lu"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.lu}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.loquios && errors.loquios)}
                      fullWidth
                      helperText={touched.loquios && errors.loquios}
                      label="Loquios"
                      name="loquios"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.loquios}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.heces && errors.heces)}
                      fullWidth
                      helperText={touched.heces && errors.heces}
                      label="Heces"
                      name="heces"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.heces}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={4} xl={2} xs={6}>
                    <TextField
                      error={Boolean(touched.drains && errors.drains)}
                      fullWidth
                      helperText={touched.drains && errors.drains}
                      label="Drenajes"
                      name="drains"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.drains}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={4} xs={6}>
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
                  <Grid item sm={8} xs={6}>
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
                  <TableCellCustom>Ingresos</TableCellCustom>
                  <TableCellCustom>Egresos</TableCellCustom>
                  <TableCellCustom>Fecha</TableCellCustom>
                  <TableCellCustom>Observaciones</TableCellCustom>
                  <TableCellCustom>Evaluado por</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.balanceHEs.map(balanceHE => (
                    <Row key={balanceHE._id} balanceHE={balanceHE} />
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
  );
};

BalanceHE.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addNursingExam: PropTypes.func,
  getNursingExam: PropTypes.func
};

export default BalanceHE;

function Row(props) {
  const { balanceHE } = props;
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  return (
    <Fragment>
      <TableRowCustom hover>
        <TableCellCustom>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCellCustom>
        <TableCellCustom>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenTwo(!openTwo)}
          >
            {openTwo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCellCustom>
        <TableCellCustom>
          {`${new Date(balanceHE.date).toLocaleDateString()} 
             ${new Date(balanceHE.date).toLocaleTimeString()}`}
        </TableCellCustom>
        <TableCellCustom>{balanceHE.observations}</TableCellCustom>
        <TableCellCustom>{balanceHE.id_nurse.name}</TableCellCustom>
      </TableRowCustom>
      <TableRowCustom>
        <TableCellCustom
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Via Parenteral
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCellCustom>Gota</TableCellCustom>
                    <TableCellCustom>Frasco</TableCellCustom>
                    <TableCellCustom>Tipo de Solucion</TableCellCustom>
                    <TableCellCustom>Inicio</TableCellCustom>
                    <TableCellCustom>Fin</TableCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCellCustom>{balanceHE.gout}</TableCellCustom>
                  <TableCellCustom>{balanceHE.jar}</TableCellCustom>
                  <TableCellCustom>{balanceHE.typeP}</TableCellCustom>
                  <TableCellCustom>{balanceHE.start}</TableCellCustom>
                  <TableCellCustom>{balanceHE.end}</TableCellCustom>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Via Enteral
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCellCustom>Tipo de Solución</TableCellCustom>
                    <TableCellCustom>Cantidad</TableCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCellCustom>{balanceHE.typeE}</TableCellCustom>
                  <TableCellCustom>{balanceHE.cant}</TableCellCustom>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Alimentación
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCellCustom>Dieta</TableCellCustom>
                    <TableCellCustom>SNG</TableCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCellCustom>{balanceHE.diet}</TableCellCustom>
                  <TableCellCustom>{balanceHE.sng}</TableCellCustom>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Hidratación
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCellCustom>V.O. Solución</TableCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCellCustom>{balanceHE.vosolutions}</TableCellCustom>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCellCustom>
      </TableRowCustom>
      <TableRowCustom>
        <TableCellCustom
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={openTwo} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Egresos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCellCustom>Diuresis</TableCellCustom>
                    <TableCellCustom>SNG</TableCellCustom>
                    <TableCellCustom>LU</TableCellCustom>
                    <TableCellCustom>Loquios</TableCellCustom>
                    <TableCellCustom>Heces</TableCellCustom>
                    <TableCellCustom>Drenajes</TableCellCustom>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCellCustom>{balanceHE.diuresis}</TableCellCustom>
                  <TableCellCustom>{balanceHE.sngE}</TableCellCustom>
                  <TableCellCustom>{balanceHE.lu}</TableCellCustom>
                  <TableCellCustom>{balanceHE.loquios}</TableCellCustom>
                  <TableCellCustom>{balanceHE.heces}</TableCellCustom>
                  <TableCellCustom>{balanceHE.drains}</TableCellCustom>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCellCustom>
      </TableRowCustom>
    </Fragment>
  );
}
