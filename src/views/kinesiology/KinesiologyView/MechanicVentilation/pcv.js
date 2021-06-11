import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Grid } from '@material-ui/core';

const PCV = ({ user, paciente, addEvolution, handleClose }) => {
  return (
    <Formik
      initialValues={{
        FiO2: '',
        breathing_frequency: '',
        v_minute: '',
        r_time: '',
        time_ins: '',
        frequency: '',
        control_pressure: '',
        PEEP: '',
        sensitivity: '',
        peak_pressure: '',
        plateau_pressure: '',
        base_pressure: '',
        compliance: ''
      }}
      validationSchema={Yup.object().shape({
        FiO2: Yup.number()
          .min(0, 'No puede ser menor a 21')
          .max(400, 'No puede ser mayor a 100'),
        breathing_frequency: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        v_minute: Yup.number()
          .min(0, 'No puede ser menor a 85')
          .max(400, 'No puede ser mayor a 98'),
        r_time: Yup.number()
          .min(0, 'No puede ser menor a 5')
          .max(400, 'No puede ser mayor a 45'),
        time_ins: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        frequency: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        control_pressure: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        PEEP: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        sensitivity: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        peak_pressure: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        plateau_pressure: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        base_pressure: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        compliance: Yup.number()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400')
      })}
      onSubmit={values => {
        values = {
          ...values,
          date: Date.now(),
          type: 'PCV',
          professional_name: user._id,
          id_paciente: paciente._id
        };
        addEvolution(values);
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
              PCV
            </Typography>
          </Box>
          <Grid container justify="center" spacing={1} alignItems="center">
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.FiO2 && errors.FiO2)}
                fullWidth
                helperText={touched.FiO2 && errors.FiO2}
                label="FiO2"
                name="FiO2"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.FiO2}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(
                  touched.breathing_frequency && errors.breathing_frequency
                )}
                fullWidth
                helperText={
                  touched.breathing_frequency && errors.breathing_frequency
                }
                label="Frec Respiratoria"
                name="breathing_frequency"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.breathing_frequency}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.v_minute && errors.v_minute)}
                fullWidth
                helperText={touched.v_minute && errors.v_minute}
                label="V minuto"
                name="v_minute"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.v_minute}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.r_time && errors.r_time)}
                fullWidth
                helperText={touched.r_time && errors.r_time}
                label="R time"
                name="r_time"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.r_time}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.time_ins && errors.time_ins)}
                fullWidth
                helperText={touched.time_ins && errors.time_ins}
                label="Tiempo Inspiratorio"
                name="time_ins"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.time_ins}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.frequency && errors.frequency)}
                fullWidth
                helperText={touched.frequency && errors.frequency}
                label="Frecuencia"
                name="frequency"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.frequency}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(
                  touched.control_pressure && errors.control_pressure
                )}
                fullWidth
                helperText={touched.control_pressure && errors.control_pressure}
                label="Presión Control"
                name="control_pressure"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.control_pressure}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.PEEP && errors.PEEP)}
                fullWidth
                helperText={touched.PEEP && errors.PEEP}
                label="PEEP"
                name="PEEP"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.PEEP}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.sensitivity && errors.sensitivity)}
                fullWidth
                helperText={touched.sensitivity && errors.sensitivity}
                label="Sennsibilidad"
                name="sensitivity"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.sensitivity}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.peak_pressure && errors.peak_pressure)}
                fullWidth
                helperText={touched.peak_pressure && errors.peak_pressure}
                label="Presión Pico"
                name="peak_pressure"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.peak_pressure}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={2} xs={6}>
              <TextField
                error={Boolean(touched.base_pressure && errors.base_pressure)}
                fullWidth
                helperText={touched.base_pressure && errors.base_pressure}
                label="P Base"
                name="base_pressure"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.base_pressure}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={2} xs={6}>
              <TextField
                error={Boolean(
                  touched.plateau_pressure && errors.plateau_pressure
                )}
                fullWidth
                helperText={touched.plateau_pressure && errors.plateau_pressure}
                label="P Plateau"
                name="plateau_pressure"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.plateau_pressure}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={2} xs={6}>
              <TextField
                error={Boolean(touched.compliance && errors.compliance)}
                fullWidth
                helperText={touched.compliance && errors.compliance}
                label="Compliance"
                name="compliance"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.compliance}
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
  );
};

PCV.propTypes = {
  user: PropTypes.object,
  paciente: PropTypes.object,
  addEvolution: PropTypes.func,
  handleClose: PropTypes.func
};

export default PCV;
