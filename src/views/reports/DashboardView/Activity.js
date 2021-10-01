import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {
  Box,
  Card,
  CardContent,
  colors,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  TableFooter,
  TableRow,
  TablePagination
} from '@material-ui/core';
/* import LocalHotelRoundedIcon from '@material-ui/icons/LocalHotelRoundedIcon';
import AirlineSeatFlatAngledRoundedIcon from '@material-ui/icons/AirlineSeatFlatAngledRounded';
*/ import Slide from '@material-ui/core/Slide';
/* import TablePaginationActions from 'src/components/TablePaginationActions'; */
import TableRowCustom from 'src/components/TableRowlCustom';
import TableCellCustom from 'src/components/TableCellCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';
import BedContext from '../../../context/bed/bedContext';
import Epicrisis from './epicrisis';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px'
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Activity = ({
  className,
  paciente,
  user,
  data,
  disabled,
  editPaciente,
  addActivity,
  getActivity,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [triaje, setTriaje] = useState(false);
  const [openAlta, setOpenAlta] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openEpicrisis, setOpenEpicrisis] = useState(false);

  const [urlImage, setUrlImage] = useState({
    url: '',
    type: ''
  });
  const bedContext = useContext(BedContext);

  const { unoccupied_beds, emptyBed, editBed, getBedUnoccupied } = bedContext;

  useEffect(() => {
    getBedUnoccupied();
    // eslint-disable-next-line
  }, []);

  const handleClickOpen = () => {
    if (paciente.internship) {
      setOpenAlta(true);
    } else {
      setOpen(true);
    }
  };

  const handleClickTriaje = () => {
    setTriaje(true);
  };

  const handleClose = () => {
    setOpenAlta(false);
    setOpen(false);
    setTriaje(false);
  };

  const handleClickImage = activity => {
    setUrlImage({
      url: `https://firebasestorage.googleapis.com/v0/b/mamantulahc.appspot.com/o/${activity.medical_referral}.${activity.extension}?alt=media&token=e510d0c1-129a-4049-bda7-c951a4feae97`,
      type: activity.extension === 'pdf' ? 'pdf' : 'image'
    });
    setOpenImage(true);
  };

  const handleClickImageClose = () => {
    setUrlImage({ url: '', type: '' });
    setOpenImage(false);
  };

  const handleClickEpicrisis = () => {
    setOpenEpicrisis(!openEpicrisis);
  };

  const handleChangePage = (event, newPage) => {
    getActivity({ id_paciente: paciente._id, newPage: newPage + 1 });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Ingresos/Egresos"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Grid container spacing={1}>
            <Grid item>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClickTriaje}
                disabled={paciente.internship || disabled}
                /*                 endIcon={<AirlineSeatFlatAngledRoundedIcon />} */
              >
                {'Triaje'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClickOpen}
                disabled={disabled}
                /*                 endIcon={<LocalHotelRoundedIcon />} */
              >
                {paciente.internship ? 'Dar Alta/Derivación/Óbito' : 'Internar'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClickOpen}
                disabled={!paciente.internship || disabled}
                /*                 endIcon={<AirlineSeatFlatAngledRoundedIcon />} */
              >
                {'Cambiar de Sector/Cama'}
              </Button>
            </Grid>
          </Grid>
        }
      />

      {/* forma para alta, derivacion, obito */}
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={openAlta}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              place: '',
              type: 'Alta',
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              place: Yup.string('Debe ser un lugar de procedencia valido'),
              type: Yup.string('Debe ser un tipo valido').required(
                'Debe ingresar Alta, Derivacion u Obito'
              ),
              observations: Yup.string('No superar los 600 caracteres')
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                id_paciente: paciente._id
              };
              paciente = {
                ...paciente,
                internship: false
              };
              emptyBed(paciente._id);
              addActivity(values);
              editPaciente(paciente);
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
                    Egreso
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.type && errors.type)}
                      fullWidth
                      select
                      helperText={touched.type && errors.type}
                      label="Tipo de Egreso"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.type}
                      variant="outlined"
                    >
                      <MenuItem value={'Alta'}>Alta</MenuItem>
                      <MenuItem value={'Derivacion'}>Derivacion</MenuItem>
                      <MenuItem value={'Obito'}>Obito</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.place && errors.place)}
                      fullWidth
                      helperText={touched.place && errors.place}
                      label="Lugar de Destino"
                      name="place"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.place}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      multiline
                      rows={3}
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

      {/* form para ingreso */}
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              place: '',
              observations: '',
              medical_referral: '',
              bed: ''
            }}
            validationSchema={Yup.object().shape({
              place: Yup.string('Debe ser un lugar de procedencia valido'),
              observations: Yup.string('No superar los 600 caracteres'),
              medical_referral: Yup.mixed(),
              bed: Yup.object().required(
                'Indicar la cama en que sera internado'
              )
            })}
            onSubmit={values => {
              let { bed } = values;
              values = {
                ...values,
                extension: values.file
                  ? values.file.name.split('.').pop()
                  : undefined,
                date: Date.now(),
                type: 'Ingreso',
                id_paciente: paciente._id
              };
              bed = {
                ...bed,
                id_paciente: paciente._id
              };
              paciente = {
                ...paciente,
                internship: true
              };
              addActivity(values);
              editBed(bed);
              editPaciente(paciente);
              handleClose();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h3">
                    Internar
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.place && errors.place)}
                      fullWidth
                      helperText={touched.place && errors.place}
                      label="Lugar de Procedencia"
                      name="place"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.place}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.bed && errors.bed)}
                      fullWidth
                      select
                      helperText={touched.bed && errors.bed}
                      label="Sector de internacion"
                      name="bed"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="object"
                      value={values.bed}
                      variant="outlined"
                    >
                      {unoccupied_beds.map(bed => (
                        <MenuItem value={bed} key={bed._id}>
                          {/* Cama {bed.number} - */}
                          {`Sector: ${bed.sector}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
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
                      rows={1}
                      value={values.observations}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <input
                      hidden
                      accept="image/*" /* "image/*, application/pdf" */
                      name="medical_ref"
                      id="contained-button-file"
                      type="file"
                      onChange={event => {
                        setFieldValue('file', event.currentTarget.files[0]);
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Hoja de Derivación
                      </Button>
                    </label>
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

      {/* forma para alta, derivacion, obito */}
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={triaje}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              place: '',
              type: 'Triaje',
              date: new Date().toJSON().slice(0, 16),
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              place: Yup.string('Debe ser un lugar de procedencia valido'),
              type: Yup.string('Debe ser un tipo valido').required(
                'Es requerido'
              ),
              date: Yup.date().required('Es requerido'),
              observations: Yup.string('No superar los 600 caracteres')
            })}
            onSubmit={values => {
              values = {
                ...values,
                id_paciente: paciente._id
              };
              addActivity(values);
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
                    Triaje
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={2}>
                  <Grid item lg={4} md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.type && errors.type)}
                      fullWidth
                      select
                      helperText={touched.type && errors.type}
                      margin="normal"
                      label="Triaje"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.type}
                      variant="outlined"
                    >
                      <MenuItem value={'Triaje'}>Triaje</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      margin="normal"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="datetime-local"
                      value={values.date}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      multiline
                      rows={5}
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

      {/* muestra la tabla de actividad */}
      <CardContent>
        <PerfectScrollbar>
          <Box height="auto" display="flex" alignItems="center">
            <Table>
              <TableHead>
                <TableRowCustom>
                  <TableCellCustom>Fecha/Hora</TableCellCustom>
                  <TableCellCustom>Tipo</TableCellCustom>
                  <TableCellCustom>Lugar de Procedencia</TableCellCustom>
                  <TableCellCustom>Observaciones</TableCellCustom>
                  <TableCellCustom>Referencia Médica</TableCellCustom>
                  <TableCellCustom>Epicrisis</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
                {data !== null &&
                  data.activitys.map(activity => (
                    <TableRowCustom hover key={activity._id}>
                      <TableCellCustom>
                        {moment(activity.date).format('DD/MM/YYYY HH:mm')}
                      </TableCellCustom>
                      <TableCellCustom>{activity.type}</TableCellCustom>
                      <TableCellCustom>{activity.place}</TableCellCustom>
                      <TableCellCustom>{activity.observations}</TableCellCustom>
                      <TableCellCustom>
                        <Button
                          disabled={activity.extension === undefined}
                          onClick={e => handleClickImage(activity)}
                        >
                          VER
                        </Button>
                      </TableCellCustom>
                      <TableCellCustom>
                        <Button
                          /*disabled={activity.type === 'Ingreso'}*/
                          onClick={e => handleClickEpicrisis()}
                        >
                          Generar Epicrisis
                        </Button>
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

      {/* dialog de hoja de derivacion */}
      <Dialog
        open={openImage}
        scroll="paper"
        onClose={handleClickImageClose}
        TransitionComponent={Transition}
      >
        {urlImage.type === 'pdf' ? (
          <Document
            file={{
              url: urlImage.url,
              httpHeaders: {
                'X-CustomHeader': '40359820958024350238508234'
              },
              withCredentials: false
            }}
            loading="Espere por favor"
          >
            <Page pageNumber={1} />
          </Document>
        ) : (
          <img
            className={classes.img}
            src={urlImage.url}
            alt="Referencia Medica"
          />
        )}
      </Dialog>

      {/* dialog epicrisis */}
      <Epicrisis
        open={openEpicrisis}
        user={user}
        paciente={paciente}
        handleClickEpicrisis={handleClickEpicrisis}
      />
    </Card>
  );
};

Activity.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  user: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  editPaciente: PropTypes.func,
  addActivity: PropTypes.func,
  getActivity: PropTypes.func
};

export default Activity;
