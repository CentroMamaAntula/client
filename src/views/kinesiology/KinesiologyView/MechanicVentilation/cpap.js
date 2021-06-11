import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem
} from '@material-ui/core';

const CPAP = ({ user, paciente, addEvolution, handleClose }) => {
  return (
    <Formik
      initialValues={{
        subtype: '',
        FiO2: '',
        sensitivity: '',
        PEEP: ''
      }}
      validationSchema={Yup.object().shape({
        subtype: Yup.string()
          .min(0, 'No puede ser menor a 0')
          .max(400, 'No puede ser mayor a 400'),
        FiO2: Yup.number()
          .min(21, 'No puede ser menor a 21')
          .max(100, 'No puede ser mayor a 100'),
        sensitivity: Yup.number()
          .min(5, 'No puede ser menor a 5')
          .max(45, 'No puede ser mayor a 45'),
        PEEP: Yup.number()
          .min(85, 'No puede ser menor a 85')
          .max(98, 'No puede ser mayor a 98')
      })}
      onSubmit={values => {
        values = {
          ...values,
          date: Date.now(),
          type: 'CPAP',
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
              CPAP
            </Typography>
          </Box>
          <Grid container justify="center" spacing={1} alignItems="center">
            <Grid item sm={3} xs={6}>
              <TextField
                error={Boolean(touched.subtype && errors.subtype)}
                fullWidth
                helperText={touched.subtype && errors.subtype}
                label=""
                name="subtype"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                select
                value={values.subtype}
                variant="outlined"
              >
                <MenuItem value="PSV">PSV</MenuItem>
                <MenuItem value="VCV">VCV</MenuItem>
              </TextField>
            </Grid>
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
                error={Boolean(touched.sensitivity && errors.sensitivity)}
                fullWidth
                helperText={touched.sensitivity && errors.sensitivity}
                label="Sensibilidad"
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
                error={Boolean(touched.PEEP && errors.PEEP)}
                fullWidth
                helperText={touched.PEEP && errors.PEEP}
                label="R time"
                name="PEEP"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.PEEP}
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

CPAP.propTypes = {
  user: PropTypes.object,
  paciente: PropTypes.object,
  addEvolution: PropTypes.func,
  handleClose: PropTypes.func
};

export default CPAP;
