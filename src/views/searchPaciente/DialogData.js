import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  MenuItem
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';
import calculateAge from 'src/utils/calculateAge';
import localidades from './localidades';

const DialogData = ({
  open,
  handleClose,
  addPaciente,
  editPaciente,
  paciente = null
}) => {
  const [ageState, setAgeState] = useState(0);

  const handleAge = date => {
    const age = calculateAge(date);
    setAgeState(age);
  };
  return (
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
            dni: paciente ? paciente.dni : '',
            name: paciente ? paciente.name : '',
            birthday: paciente
              ? new Date(paciente.birthday)
                  .toJSON()
                  .slice(0, 10)
                  .replace('/', '-')
              : new Date()
                  .toJSON()
                  .slice(0, 10)
                  .replace('/', '-'),
            age: ageState,
            domicile: paciente ? paciente.domicile : '',
            location: paciente ? paciente.location : '',
            job: paciente ? paciente.job : '',
            phone: paciente ? paciente.phone : 0,
            family_phone: paciente ? paciente.family_phone : 0,
            social_coverage: paciente ? paciente.social_coverage : ''
          }}
          validationSchema={Yup.object().shape({
            dni: Yup.string()
              .min(7, 'Minimo 7 caracteres')
              .max(8, 'Maximo 8 caracteres')
              .required('DNI es requerido'),
            name: Yup.string()
              .max(255)
              .required('Nombre es requerido'),
            birthday: Yup.date().required('Fecha de nacimiento es requerido'),
            domicile: Yup.string()
              .max(100)
              .required('El domicilio es requerido'),
            location: Yup.string().required('La localidad es requerido'),
            job: Yup.string().max(100),
            phone: Yup.number().required('El telefono es requerido'),
            family_phone: Yup.string().required(
              'Telefono familiar es requerido'
            ),
            social_coverage: Yup.string()
              .max(100)
              .required('Cobertura Social es requerido')
          })}
          onSubmit={values => {
            if (paciente === null) {
              addPaciente(values);
            } else {
              values = {
                ...values,
                _id: paciente._id
              };
              editPaciente(values);
            }
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
                <Typography color="textPrimary" variant="h2">
                  Admisión
                </Typography>
              </Box>
              <Grid container justify="center" spacing={1}>
                <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    error={Boolean(touched.dni && errors.dni)}
                    fullWidth
                    helperText={touched.dni && errors.dni}
                    label="N° de documento"
                    margin="normal"
                    name="dni"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.dni}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Nombre completo"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    error={Boolean(touched.birthday && errors.birthday)}
                    fullWidth
                    helperText={touched.birthday && errors.birthday}
                    label="Fecha de nacimiento"
                    margin="normal"
                    name="birthday"
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e);
                      handleAge(e.target.value);
                    }}
                    type="date"
                    value={values.birthday}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={1}>
                  <TextField
                    readOnly
                    error={Boolean(touched.age && errors.age)}
                    fullWidth
                    helperText={touched.age && errors.age}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Edad"
                    margin="normal"
                    name="age"
                    type="number"
                    value={ageState}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    error={Boolean(touched.domicile && errors.domicile)}
                    fullWidth
                    helperText={touched.domicile && errors.domicile}
                    label="Domicilio"
                    margin="normal"
                    name="domicile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.domicile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    error={Boolean(touched.location && errors.location)}
                    fullWidth
                    select
                    helperText={touched.location && errors.location}
                    label="Localidad"
                    margin="normal"
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.location}
                    variant="outlined"
                  >
                    {localidades.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    error={Boolean(touched.job && errors.job)}
                    fullWidth
                    helperText={touched.job && errors.job}
                    label="Ocupacion"
                    margin="normal"
                    name="job"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.job}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Teléfono"
                    margin="normal"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <TextField
                    error={Boolean(touched.family_phone && errors.family_phone)}
                    fullWidth
                    helperText={touched.family_phone && errors.family_phone}
                    label="Teléfono familiar"
                    margin="normal"
                    name="family_phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.family_phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    error={Boolean(
                      touched.social_coverage && errors.social_coverage
                    )}
                    fullWidth
                    helperText={
                      touched.social_coverage && errors.social_coverage
                    }
                    label="Cobertura Social"
                    margin="normal"
                    name="social_coverage"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.social_coverage}
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
  );
};

export default DialogData;
