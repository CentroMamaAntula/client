import React, { useState } from 'react';
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
  TextField,
  makeStyles,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent
} from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles(() => ({
  actions: {
    justifyContent: 'flex-end'
  }
}));

const NutritionEvolution = ({
  className,
  user,
  paciente,
  data,
  addEvolution,
  getEvolution,
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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Nutricion"
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
              evolution: ''
            }}
            validationSchema={Yup.object().shape({
              evolution: Yup.string()
                .required()
                .min(5, 'No puede ser menor a 5')
                .max(10000, 'No puede ser mayor a 10000')
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
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
                    Nutrición
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <TextField
                      error={Boolean(touched.evolution && errors.evolution)}
                      fullWidth
                      multiline
                      rows={15}
                      helperText={touched.evolution && errors.evolution}
                      label="Evolución"
                      name="evolution"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.evolutiom}
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
          <Box>
            <Grid container justify="space-between" spacing={1}>
              {data !== null &&
                data.evolutions.map(product => (
                  <Grid item key={product._id} md={6} xs={12}>
                    <ProductCard
                      className={classes.productCard}
                      product={product}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

NutritionEvolution.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addEvolution: PropTypes.func,
  getEvolution: PropTypes.func
};

export default NutritionEvolution;
