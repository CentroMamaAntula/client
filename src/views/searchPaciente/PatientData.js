import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import calculateAge from 'src/utils/calculateAge';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Table,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  CardHeader,
  Container,
  TextField,
  MenuItem
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DialogData from './DialogData';
import storage from '../../config/firebaseConfig';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const PatientData = ({
  className,
  paciente,
  medicalHistory,
  editPaciente,
  addMedicalHistory,
  editMedicalHistory,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFiles, setOpenFiles] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenData = () => {
    setOpenData(true);
  };

  const handleCloseData = () => {
    setOpenData(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenFiles = () => {
    setOpenFiles(true);
  };

  const handleClickClose = () => {
    setOpenFiles(false);
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader
          title={paciente.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <Fragment>
              <Button
                endIcon={<AddBoxIcon />}
                color="secondary"
                variant="outlined"
                onClick={handleOpenFiles}
              >
                Archivos Adjuntos
              </Button>
              <Button
                endIcon={<AddBoxIcon />}
                color="secondary"
                variant="outlined"
                onClick={handleOpenEdit}
              >
                EDITAR ANTECEDENTES MÉDICOS
              </Button>
            </Fragment>
          }
        />
        <CardContent>
          <PerfectScrollbar>
            <Box minWidth={800}>
              <Table>
                <TableHead>
                  <TableRowCustom>
                    <TableCellCustom>DNI</TableCellCustom>
                    <TableCellCustom>Edad</TableCellCustom>
                    <TableCellCustom>Domicilio</TableCellCustom>
                    <TableCellCustom>Teléfono</TableCellCustom>
                    <TableCellCustom>Teléfono Familiar</TableCellCustom>
                    <TableCellCustom>Cobertura Social</TableCellCustom>
                    <TableCellCustom>Antecedentes Médicos</TableCellCustom>
                    <TableCellCustom>Editar</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  <TableRowCustom hover key={paciente._id}>
                    <TableCell>{paciente.dni}</TableCell>
                    <TableCell>{calculateAge(paciente.birthday)}</TableCell>
                    <TableCell>{paciente.domicile}</TableCell>
                    <TableCell>{paciente.phone}</TableCell>
                    <TableCell>{paciente.family_phone}</TableCell>
                    <TableCell>{paciente.social_coverage}</TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Button
                          disabled={medicalHistory === null}
                          color="primary"
                          endIcon={<ArrowRightIcon />}
                          size="small"
                          variant="outlined"
                          onClick={handleOpen}
                        >
                          Ver
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Button
                          color="primary"
                          endIcon={<ArrowRightIcon />}
                          size="small"
                          variant="outlined"
                          onClick={handleOpenData}
                        >
                          Editar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRowCustom>
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </CardContent>
      </Card>

      {/* edit datos filiatorios */}
      <DialogData
        open={openData}
        handleClose={handleCloseData}
        paciente={paciente}
        editPaciente={editPaciente}
      />

      {/* edit antecedentes */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              diabetes: medicalHistory ? medicalHistory.diabetes : 'Ninguno',
              obs_diabetes: medicalHistory ? medicalHistory.obs_diabetes : '',
              epoc_asma: medicalHistory ? medicalHistory.epoc_asma : 'Ninguno',
              obs_epoc: medicalHistory ? medicalHistory.obs_epoc : '',
              renal_cronica: medicalHistory
                ? medicalHistory.renal_cronica
                : 'Ninguno',
              obs_renal: medicalHistory ? medicalHistory.obs_renal : '',
              cardiovascular: medicalHistory
                ? medicalHistory.cardiovascular
                : 'Ninguno',
              obs_cardio: medicalHistory ? medicalHistory.obs_cardio : '',
              inmunocomprometido: medicalHistory
                ? medicalHistory.inmunocomprometido
                : 'Ninguno',
              obs_inmuno: medicalHistory ? medicalHistory.obs_inmuno : '',
              obesidad_morbida: medicalHistory
                ? medicalHistory.obesidad_morbida
                : 'Ninguno',
              obs_obesidad: medicalHistory ? medicalHistory.obs_obesidad : '',
              tabaquismo: medicalHistory
                ? medicalHistory.tabaquismo
                : 'Ninguno',
              obs_tabaquismo: medicalHistory
                ? medicalHistory.obs_tabaquismo
                : '',
              alcoholismo: medicalHistory
                ? medicalHistory.alcoholismo
                : 'Ninguno',
              obs_alcoholismo: medicalHistory
                ? medicalHistory.obs_alcoholismo
                : '',
              adiccion: medicalHistory ? medicalHistory.adiccion : 'Ninguno',
              obs_adiccion: medicalHistory ? medicalHistory.obs_adiccion : '',
              alergias: medicalHistory ? medicalHistory.alergias : 'Ninguno',
              obs_alergias: medicalHistory ? medicalHistory.obs_alergias : '',
              psicologicos_psiquiuatricos: medicalHistory
                ? medicalHistory.psicologicos_psiquiuatricos
                : 'Ninguno',
              obs_psi: medicalHistory ? medicalHistory.obs_psi : '',
              violencia: medicalHistory ? medicalHistory.violencia : 'Ninguno',
              obs_violencia: medicalHistory ? medicalHistory.obs_violencia : ''
            }}
            /* validationSchema={Yup.object().shape({
              diabetes: Yup.string(),
              obs_diabetes: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              epoc_asma: Yup.string(),
              obs_epoc: Yup.string().max(200, 'No exceder los 200 caracteres'),
              renal_cronica: 'Ninguno',
              obs_renal: Yup.string().max(200, 'No exceder los 200 caracteres'),
              cardiovascular: Yup.string(),
              obs_cardio: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              inmunocomprometido: Yup.string(),
              obs_inmuno: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              obesidad_morbida: Yup.string(),
              obs_obesidad: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              tabaquismo: Yup.string(),
              obs_tabaquismo: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              alcoholismo: Yup.string(),
              obs_alcoholismo: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              adiccion: Yup.string(),
              obs_adiccion: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              alergias: Yup.string(),
              obs_alergias: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              ),
              psicologicos_psiquiuatricos: Yup.string(),
              obs_psi: Yup.string().max(200, 'No exceder los 200 caracteres'),
              violencia: Yup.string(),
              obs_violencia: Yup.string().max(
                200,
                'No exceder los 200 caracteres'
              )
            })} */
            onSubmit={values => {
              values = {
                ...values,
                _id: medicalHistory ? medicalHistory._id : undefined,
                date: Date.now(),
                id_paciente: paciente._id
              };
              if (medicalHistory) {
                editMedicalHistory(values);
              } else {
                addMedicalHistory(values);
              }
              handleCloseEdit();
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
                    Antecedentes Médicos
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.diabetes && errors.diabetes)}
                      fullWidth
                      select
                      helperText={touched.diabetes && errors.diabetes}
                      label="Diabetes"
                      name="diabetes"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.diabetes}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_diabetes && errors.obs_diabetes
                      )}
                      fullWidth
                      helperText={touched.obs_diabetes && errors.obs_diabetes}
                      label="Observaciones"
                      name="obs_diabetes"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_diabetes}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.epoc_asma && errors.epoc_asma)}
                      fullWidth
                      select
                      helperText={touched.epoc_asma && errors.epoc_asma}
                      label="EPOC/ASMA"
                      name="epoc_asma"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.epoc_asma}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.obs_epoc && errors.obs_epoc)}
                      fullWidth
                      helperText={touched.obs_epoc && errors.obs_epoc}
                      label="Observaciones"
                      name="obs_epoc"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_epoc}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(
                        touched.renal_cronica && errors.renal_cronica
                      )}
                      fullWidth
                      select
                      helperText={touched.renal_cronica && errors.renal_cronica}
                      label="Enfermedad renal cronica"
                      name="renal_cronica"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.renal_cronica}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.obs_renal && errors.obs_renal)}
                      fullWidth
                      helperText={touched.obs_renal && errors.obs_renal}
                      label="Observaciones"
                      name="obs_renal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_renal}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(
                        touched.cardiovascular && errors.cardiovascular
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.cardiovascular && errors.cardiovascular
                      }
                      label="Enfermedad cardiovascular"
                      name="cardiovascular"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.cardiovascular}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.obs_cardio && errors.obs_cardio)}
                      fullWidth
                      helperText={touched.obs_cardio && errors.obs_cardio}
                      label="Observaciones"
                      name="obs_cardio"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_cardio}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(
                        touched.inmunocomprometido && errors.inmunocomprometido
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.inmunocomprometido && errors.inmunocomprometido
                      }
                      label="Inmunocomprometido"
                      name="inmunocomprometido"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.inmunocomprometido}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.obs_inmuno && errors.obs_inmuno)}
                      fullWidth
                      helperText={touched.obs_inmuno && errors.obs_inmuno}
                      label="Observaciones"
                      name="obs_inmuno"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_inmuno}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(
                        touched.obesidad_morbida && errors.obesidad_morbida
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.obesidad_morbida && errors.obesidad_morbida
                      }
                      label="Obesidad morbida"
                      name="obesidad_morbida"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.obesidad_morbida}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_obesidad && errors.obs_obesidad
                      )}
                      fullWidth
                      helperText={touched.obs_obesidad && errors.obs_obesidad}
                      label="Observaciones"
                      name="obs_obesidad"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_obesidad}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.tabaquismo && errors.tabaquismo)}
                      fullWidth
                      select
                      helperText={touched.tabaquismo && errors.tabaquismo}
                      label="Tabaquismo"
                      name="tabaquismo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.tabaquismo}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_tabaquismo && errors.obs_tabaquismo
                      )}
                      fullWidth
                      helperText={
                        touched.obs_tabaquismo && errors.obs_tabaquismo
                      }
                      label="Observaciones"
                      name="obs_tabaquismo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_tabaquismo}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.alcoholismo && errors.alcoholismo)}
                      fullWidth
                      select
                      helperText={touched.alcoholismo && errors.alcoholismo}
                      label="Alcoholismo"
                      name="alcoholismo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.alcoholismo}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_alcoholismo && errors.obs_alcoholismo
                      )}
                      fullWidth
                      helperText={
                        touched.obs_alcoholismo && errors.obs_alcoholismo
                      }
                      label="Observaciones"
                      name="obs_alcoholismo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_alcoholismo}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.adiccion && errors.adiccion)}
                      fullWidth
                      select
                      helperText={touched.adiccion && errors.adiccion}
                      label="Adicciones"
                      name="adiccion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.adiccion}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_adiccion && errors.obs_adiccion
                      )}
                      fullWidth
                      helperText={touched.obs_adiccion && errors.obs_adiccion}
                      label="Observaciones"
                      name="obs_adiccion"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_adiccion}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.alergias && errors.alergias)}
                      fullWidth
                      select
                      helperText={touched.alergias && errors.alergias}
                      label="Alergias"
                      name="alergias"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.alergias}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_alergias && errors.obs_alergias
                      )}
                      fullWidth
                      helperText={touched.obs_alergias && errors.obs_alergias}
                      label="Observaciones"
                      name="obs_alergias"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_alergias}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(
                        touched.psicologicos_psiquiuatricos &&
                        errors.psicologicos_psiquiuatricos
                      )}
                      fullWidth
                      select
                      helperText={
                        touched.psicologicos_psiquiuatricos &&
                        errors.psicologicos_psiquiuatricos
                      }
                      label="Psicologicos/Psiquiuatricos"
                      name="psicologicos_psiquiuatricos"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.psicologicos_psiquiuatricos}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(touched.obs_psi && errors.obs_psi)}
                      fullWidth
                      helperText={touched.obs_psi && errors.obs_psi}
                      label="Observaciones"
                      name="obs_psi"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_psi}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={5}>
                    <TextField
                      error={Boolean(touched.violencia && errors.violencia)}
                      fullWidth
                      select
                      helperText={touched.violencia && errors.violencia}
                      label="Violencia"
                      name="violencia"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.violencia}
                      variant="outlined"
                    >
                      <MenuItem value="Ninguno">Ninguno</MenuItem>
                      <MenuItem value="Familiares">Familiares</MenuItem>
                      <MenuItem value="Personales">Personales</MenuItem>
                      <MenuItem value="Ambos">Ambos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <TextField
                      error={Boolean(
                        touched.obs_violencia && errors.obs_violencia
                      )}
                      fullWidth
                      helperText={touched.obs_violencia && errors.obs_violencia}
                      label="Observaciones"
                      name="obs_violencia"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={3}
                      value={values.obs_violencia}
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

      {/* view antecedentes */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Antecedentes Médicos</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Diabetes"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.diabetes}. ${medicalHistory.obs_diabetes} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="EPOC/ASMA"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.epoc_asma}. ${medicalHistory.obs_epoc} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Enfermeda renal cronica"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.renal_cronica}. ${medicalHistory.obs_renal} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Enfermedad Cardiovascular"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.cardiovascular}. ${medicalHistory.obs_cardio} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inmunocomprometido"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.inmunocomprometido}. ${medicalHistory.obs_inmuno} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Obesidad morbida"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.obesidad_morbida}. ${medicalHistory.obs_obesidad} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tabaquismo"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.tabaquismo}. ${medicalHistory.obs_tabaquismo} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Alcoholismo"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.alcoholismo}. ${medicalHistory.obs_alcoholismo} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Adicciones"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.adiccion}. ${medicalHistory.obs_adiccion} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Alergias"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.alergias}. ${medicalHistory.obs_alergias} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Psicologicos/Psiquiuatricos"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.psicologicos_psiquiuatricos}. ${medicalHistory.obs_psi} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Violencia"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.violencia}. ${medicalHistory.obs_violencia} `
                    : 'Ninguno'
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog archivos adjuntos */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'lg'}
        open={openFiles}
        onClose={handleClickClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Archivos Adjuntos
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Formik
                initialValues={{
                  date: new Date().toJSON().slice(0, 16),
                  file: null,
                  description: ''
                }}
                validationSchema={Yup.object().shape({
                  date: Yup.date(),
                  file: Yup.object().required(),
                  description: Yup.string()
                    .max(10000, 'No exceder los 10000 caracteres')
                    .required('Observaciones es requerido')
                })}
                onSubmit={values => {
                  const file = values.files.files[0];
                  const ref = storage.ref();
                  ref.put(file).then((snapshot) => {
                    console.log(snapshot);
                  });
                  values = {
                    ...values,
                    name: '',
                    date: Date.now(),
                    extension: ''
                  };
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
                        Subir archivo
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
                          error={Boolean(touched.file && errors.file)}
                          fullWidth
                          helperText={touched.file && errors.file}
                          label="Archivo"
                          name="file"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="file"
                          value={values.file}
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
                {/* {application
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
                  : null} */}
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

PatientData.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  medicalHistory: PropTypes.object,
  editPaciente: PropTypes.func,
  addMedicalHistory: PropTypes.func,
  editMedicalHistory: PropTypes.func
};

export default PatientData;
