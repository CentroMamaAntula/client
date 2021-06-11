import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  DialogContent,
  DialogActions,
  MenuItem,
  TablePagination,
  TableFooter,
  TableRow,
  Table
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const PhysicalExam = ({
  className,
  id,
  user,
  data,
  addPhysicalExam,
  getPhysicalExam,
  ...rest
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openPE, setOpenPE] = useState(false);
  const [physicalExam, setPhysicalExam] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenPE = () => {
    setOpenPE(true);
  };

  const handleClosePE = () => {
    setOpenPE(false);
  };

  const handleClick = dataTwo => {
    setPhysicalExam(dataTwo);
    handleClickOpenPE();
  };

  const handleChangePage = (event, newPage) => {
    getPhysicalExam({ id_paciente: id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Exámenes Fisicos"
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
      {/* list */}
      <CardContent>
        <List>
          {data !== null &&
            data.physicalExams.map((element, i) => (
              <ListItem
                divider={i < data.physicalExams.length - 1}
                key={element._id}
              >
                <ListItemText
                  primary={`${new Date(element.date).toLocaleDateString()} 
                  ${new Date(element.date).toLocaleTimeString()}`}
                  secondary={`Tipo de Examen: ${element.type}`}
                />
                <IconButton
                  edge="end"
                  size="small"
                  onClick={e => handleClick(element)}
                >
                  <PostAddRoundedIcon />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </CardContent>

      {/* paginacion */}
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={['']}
              count={data !== null ? data.total : 1}
              rowsPerPage={4}
              page={data !== null ? data.currentPage - 1 : 1}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
              labelDisplayedRows={handleLabelDisplay}
            />
          </TableRow>
        </TableFooter>
      </Table>

      {/* dialog con list */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={openPE}
        onClose={handleClosePE}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {`Exámen Médico ${new Date(physicalExam.date).toLocaleDateString()} 
                          ${new Date(physicalExam.date).toLocaleTimeString()}
          `}
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Temperatura"
                secondary={
                  physicalExam.temperature
                    ? physicalExam.temperature
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Presión arterial"
                secondary={
                  physicalExam.blood_pressure
                    ? physicalExam.blood_pressure
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Ritmo cardiaco"
                secondary={
                  physicalExam.heart_rate
                    ? physicalExam.heart_rate
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Frecuencia respiratoria"
                secondary={
                  physicalExam.breathing_frequency
                    ? physicalExam.breathing_frequency
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Saturometria"
                secondary={
                  physicalExam.saturometry
                    ? physicalExam.saturometry
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Partes Blandas"
                secondary={
                  physicalExam.soft_parts
                    ? physicalExam.soft_parts
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Observaciones en la Piel"
                secondary={
                  physicalExam.skin ? physicalExam.skin : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Entrada de aire"
                secondary={
                  physicalExam.air_entrance !== undefined
                    ? physicalExam.air_entrance
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tiempo/Espacio"
                secondary={
                  physicalExam.time_space !== undefined
                    ? physicalExam.time_space
                      ? 'Se orienta'
                      : 'No se orienta'
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Examen cardiovascular"
                secondary={
                  physicalExam.cardiovascular_exam
                    ? physicalExam.cardiovascular_exam
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Examen respiratorio"
                secondary={
                  physicalExam.respiratory_exam
                    ? physicalExam.respiratory_exam
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Examen neurologico"
                secondary={
                  physicalExam.neurological_exam
                    ? physicalExam.neurological_exam
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Observaciones"
                secondary={
                  physicalExam.observations
                    ? physicalExam.observations
                    : 'No evaluado'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  physicalExam.professional_name
                    ? physicalExam.professional_name.name
                    : ''
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePE} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

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
              temperature: '',
              skin: '',
              soft_parts: '',
              systolic_blood_pressure: '',
              diastolic_blood_pressure: '',
              heart_rate: '',
              cardiovascular_exam: '',
              breathing_frequency: '',
              saturometry: '',
              air_entrance: '',
              respiratory_exam: '',
              time_space: '',
              abdomen: '',
              neurological_exam: '',
              observations: ''
            }}
            validationSchema={Yup.object().shape({
              temperature: Yup.number()
                .min(30, 'No menor a los 30°C')
                .max(50, 'No exceder los 50°C'),
              skin: Yup.string().max(100, 'No exceder los 100 caracteres'),
              soft_parts: Yup.string().max(
                100,
                'No exceder los 100 caracteres'
              ),
              systolic_blood_pressure: Yup.number().max(
                450,
                'No exceder los 450 caracteres'
              ),
              diastolic_blood_pressure: Yup.number().max(
                450,
                'No exceder los 450 caracteres'
              ),
              heart_rate: Yup.number().max(
                500,
                'No exceder los 450 caracteres'
              ),
              cardiovascular_exam: Yup.string().max(
                450,
                'No exceder los 450 caracteres'
              ),
              breathing_frequency: Yup.number().max(
                450,
                'No exceder los 450 caracteres'
              ),
              saturometry: Yup.number().max(
                450,
                'No exceder los 450 caracteres'
              ),
              air_entrance: Yup.string().max(
                450,
                'No exceder los 450 caracteres'
              ),
              time_space: Yup.boolean(),
              abdomen: Yup.string().max(450, 'No exceder los 450 caracteres'),
              neurological_exam: Yup.string().max(
                450,
                'No exceder los 450 caracteres'
              ),
              observations: Yup.string().max(
                10000,
                'No exceder los 450 caracteres'
              )
            })}
            onSubmit={values => {
              Object.keys(values).forEach(key => {
                if (values[key] === null || values[key] === '') {
                  delete values[key];
                }
              });
              values = {
                ...values,
                date: Date.now(),
                id_paciente: id,
                blood_pressure: values.systolic_blood_pressure
                  ? `${values.systolic_blood_pressure}/${values.diastolic_blood_pressure}`
                  : undefined,
                type: user.role === 2 ? 'de Enfermería' : 'Médico',
                professional_name: user._id
              };
              addPhysicalExam(values);
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
                    Nuevo examen físico
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
                    <TextField
                      error={Boolean(touched.temperature && errors.temperature)}
                      fullWidth
                      helperText={touched.temperature && errors.temperature}
                      label="Temperatura °C"
                      name="temperature"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.temperature}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
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
                      label="Presión Arterial Sist(mmHg)"
                      name="systolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.systolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
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
                      label="Presión Arterial Diast(mmHg)"
                      name="diastolic_blood_pressure"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.diastolic_blood_pressure}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
                    <TextField
                      error={Boolean(touched.heart_rate && errors.heart_rate)}
                      fullWidth
                      helperText={touched.heart_rate && errors.heart_rate}
                      label="Ritmo cardiaco (BPM)"
                      name="heart_rate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.heart_rate}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
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
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
                    <TextField
                      error={Boolean(touched.saturometry && errors.saturometry)}
                      fullWidth
                      helperText={touched.saturometry && errors.saturometry}
                      label="Saturometría"
                      name="saturometry"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.saturometry}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
                    <TextField
                      error={Boolean(touched.soft_parts && errors.soft_parts)}
                      fullWidth
                      helperText={touched.soft_parts && errors.soft_parts}
                      label="Partes Blandas"
                      name="soft_parts"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.soft_parts}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
                    <TextField
                      error={Boolean(touched.skin && errors.skin)}
                      fullWidth
                      helperText={touched.skin && errors.skin}
                      label="Observaciones en la Piel"
                      name="skin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.skin}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={2} sm={6} xl={2} xs={12}>
                    <TextField
                      error={Boolean(
                        touched.air_entrance && errors.air_entrance
                      )}
                      fullWidth
                      helperText={touched.air_entrance && errors.air_entrance}
                      label="Miembros Inferiores"
                      name="air_entrance"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.air_entrance}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
                    <TextField
                      error={Boolean(touched.time_space && errors.time_space)}
                      fullWidth
                      select
                      helperText={touched.time_space && errors.time_space}
                      label="Tiempo/Espacio"
                      name="time_space"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.time_space}
                      variant="outlined"
                    >
                      <MenuItem value={false}>NO</MenuItem>
                      <MenuItem value={true}>SI</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={Boolean(touched.abdomen && errors.abdomen)}
                      fullWidth
                      helperText={touched.abdomen && errors.abdomen}
                      label="Abdomen"
                      name="abdomen"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.abdomen}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.cardiovascular_exam &&
                          errors.cardiovascular_exam
                      )}
                      fullWidth
                      helperText={
                        touched.cardiovascular_exam &&
                        errors.cardiovascular_exam
                      }
                      label="Examen Cardiovascular"
                      name="cardiovascular_exam"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.cardiovascular_exam}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.respiratory_exam && errors.respiratory_exam
                      )}
                      fullWidth
                      helperText={
                        touched.respiratory_exam && errors.respiratory_exam
                      }
                      label="Examen Respiratorio"
                      name="respiratory_exam"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.respiratory_exam}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.neurological_exam && errors.neurological_exam
                      )}
                      fullWidth
                      helperText={
                        touched.neurological_exam && errors.neurological_exam
                      }
                      label="Examen Neurológico"
                      name="neurological_exam"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.neurological_exam}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
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
                      rows={2}
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
    </Card>
  );
};

PhysicalExam.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  user: PropTypes.object,
  data: PropTypes.object,
  addPhysicalExam: PropTypes.func,
  getPhysicalExam: PropTypes.func
};

export default PhysicalExam;
