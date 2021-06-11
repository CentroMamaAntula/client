import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Typography,
  Button,
  MenuItem
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, getActivityFromTo, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Formik
              initialValues={{
                type: '',
                from: new Date().toJSON().slice(0, 10),
                to: new Date().toJSON().slice(0, 10)
              }}
              validationSchema={Yup.object().shape({
                type: Yup.string().required('Tipo es requerido'),
                from: Yup.date().required('Fecha'),
                to: Yup.date().required('Fecha')
              })}
              onSubmit={values => {
                getActivityFromTo(values);
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
                    <Typography color="textPrimary" variant="h2">
                      Filtrar
                    </Typography>
                  </Box>
                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        error={Boolean(touched.type && errors.type)}
                        fullWidth
                        helperText={touched.type && errors.type}
                        label="Tipo"
                        margin="normal"
                        name="type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        select
                        value={values.type}
                        variant="outlined"
                      >
                        <MenuItem value="Alta">Alta</MenuItem>
                        <MenuItem value="Ingreso">Ingreso</MenuItem>
                        <MenuItem value="Derivacion">Derivacion</MenuItem>
                        <MenuItem value="Obito">Obito</MenuItem>
                        <MenuItem value="Triaje">Triaje</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        error={Boolean(touched.from && errors.from)}
                        fullWidth
                        helperText={touched.from && errors.from}
                        label="Desde"
                        margin="normal"
                        name="from"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                        value={values.from}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        error={Boolean(touched.to && errors.to)}
                        fullWidth
                        helperText={touched.to && errors.to}
                        label="Hasta"
                        margin="normal"
                        name="to"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                        value={values.to}
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
                      Filtrar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            {/* <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              /> */}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
