import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Epicrisis = ({ open, user, paciente, handleClickEpicrisis }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={'xl'}
      scroll="paper"
      onClose={handleClickEpicrisis}
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-dialog-title" />
      <Container maxWidth="xl">
        <Formik
          initialValues={{
            date_admission: new Date().toJSON().slice(0, 10),
            date_egress: new Date().toJSON().slice(0, 10),
            presumptive_diagnosis: '',
            final_diagnosis: '',
            treatment: '',
            treatment_outpatient: '',
            action: '',
            observations: ''
          }}
          validationSchema={Yup.object().shape({
            date_admission: Yup.date('Debe ingresar fecha valida').required(
              'Es requerido'
            ),
            date_egress: Yup.date('Debe ingresar fecha valida').required(
              'Es requerido'
            ),
            presumptive_diagnosis: Yup.string('').required('Es requerido'),
            final_diagnosis: Yup.string('').required('Es requerido'),
            treatment_outpatient: Yup.string('').required('Es requerido'),
            action: Yup.string('').required(),
            observations: Yup.string('')
          })}
          onSubmit={values => {
            values = {
              ...values,
              paciente,
              user
            };
            localStorage.setItem('epicrisis', JSON.stringify(values));
            window.open('/print/epicrisis');
            handleClickEpicrisis();
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
                  Epicrisis
                </Typography>
              </Box>
              <Grid container justify="center" spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(
                      touched.date_admission && errors.date_admission
                    )}
                    fullWidth
                    helperText={touched.date_admission && errors.date_admission}
                    label="Fecha de Ingeso"
                    name="date_admission"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                    value={values.date_admission}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(touched.date_egress && errors.date_egress)}
                    fullWidth
                    helperText={touched.date_egress && errors.date_egress}
                    label="Fecha de Egreso"
                    name="date_egress"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                    value={values.date_egress}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={Boolean(touched.action && errors.action)}
                    fullWidth
                    helperText={touched.action && errors.action}
                    label="Motivo"
                    name="action"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    select
                    value={values.action}
                    variant="outlined"
                  >
                    <MenuItem value="Derivación">Derivación</MenuItem>
                    <MenuItem value="Alta">Alta</MenuItem>
                    <MenuItem value="Continua Internado">
                      Continua Internado
                    </MenuItem>
                    <MenuItem value="Óbito">Óbito</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(
                      touched.presumptive_diagnosis &&
                        errors.presumptive_diagnosis
                    )}
                    fullWidth
                    helperText={
                      touched.presumptive_diagnosis &&
                      errors.presumptive_diagnosis
                    }
                    label="Diagnostico Presuntivo"
                    name="presumptive_diagnosis"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.presumptive_diagnosis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(
                      touched.final_diagnosis && errors.final_diagnosis
                    )}
                    fullWidth
                    helperText={
                      touched.final_diagnosis && errors.final_diagnosis
                    }
                    label="Diagnostico Final"
                    name="final_diagnosis"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.final_diagnosis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    error={Boolean(touched.treatment && errors.treatment)}
                    fullWidth
                    helperText={touched.treatment && errors.treatment}
                    label="Tratamiento"
                    name="treatment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    multiline
                    rows={10}
                    value={values.treatment}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    error={Boolean(
                      touched.treatment_outpatient &&
                        errors.treatment_outpatient
                    )}
                    fullWidth
                    helperText={
                      touched.treatment_outpatient &&
                      errors.treatment_outpatient
                    }
                    label="Tratamiento Ambulatorio"
                    name="treatment_outpatient"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    multiline
                    rows={10}
                    value={values.treatment_outpatient}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    error={Boolean(touched.observations && errors.observations)}
                    fullWidth
                    helperText={touched.observations && errors.observations}
                    label="Observaciones"
                    name="observations"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    multiline
                    rows={3}
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
                  GENERAR
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Dialog>
  );
};

export default Epicrisis;
