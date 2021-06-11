import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import { SALUD_MENTAL } from 'src/utils/role';

const Notifications = ({
  user,
  paciente,
  mentalQueryOpen,
  mentalQuerys,
  mentalEvolutions,
  addMentalQuery,
  selectMentalQuery,
  addMentalEvolutions,
  getMentalEvolutions
}) => {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const handleOpen = element => {
    selectMentalQuery(element);
    getMentalEvolutions(element._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  return (
    <Card>
      <CardHeader
        title="Historial de consultas"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button
            disabled={user.role !== SALUD_MENTAL}
            endIcon={<HighlightOffIcon />}
            color="secondary"
            variant="outlined"
            onClick={handleOpenNew}
          >
            Nueva Consulta
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <List>
          {mentalQuerys.map((element, i) => (
            <ListItem divider={i < mentalQuerys.length - 1} key={element._id}>
              <ListItemText
                primary={
                  <Typography variant="h4">
                    {`Motivo de la Consulta: ${element.reason}`}
                  </Typography>
                }
                secondary={moment(element.date).format('DD/MM/YYYY HH:mm')}
              />
              <IconButton
                edge="end"
                size="small"
                onClick={e => handleOpen(element)}
              >
                <PostAddRoundedIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </CardContent>

      {/* dialog para las evoluciones, lista de evoluciones y al final se puede agregar */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        {mentalQueryOpen ? (
          <DialogTitle>
            <Typography variant="h3">
              {`Motivo de consulta ${mentalQueryOpen.reason}`}
            </Typography>
          </DialogTitle>
        ) : null}
        <Container maxWidth="md">
          <List>
            {mentalEvolutions.map((element, i) => (
              <ListItem
                divider={i < mentalEvolutions.length - 1}
                key={element._id}
              >
                <ListItemText
                  primary={
                    <Typography variant="h4">
                      Evolución:
                      {element.evolution
                        ? element.evolution
                        : 'Historial de Evoluciones'}
                    </Typography>
                  }
                  secondary={
                    <Fragment>
                      <Typography>{element.indications}</Typography>
                      {' - '}
                      {`${new Date(element.date).toLocaleDateString()} 
                        ${new Date(element.date).toLocaleTimeString()}`}
                      {' - '}
                      {element.professional_name.name}
                    </Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
          {user.role === SALUD_MENTAL ? (
            <Formik
              initialValues={{
                evolution: '',
                indications: ''
              }}
              validationSchema={Yup.object().shape({
                evolution: Yup.string().required(),
                indications: Yup.string().required()
              })}
              onSubmit={values => {
                values = {
                  ...values,
                  date: Date.now(),
                  professional_name: user._id,
                  id_mentalquery: mentalQueryOpen._id
                };
                addMentalEvolutions(values);
                values = {
                  evolution: '',
                  indications: ''
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
                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={6} sm={6} md={4}>
                      <TextField
                        error={Boolean(touched.evolution && errors.evolution)}
                        fullWidth
                        helperText={touched.evolution && errors.evolution}
                        label="Evolucion"
                        name="evolution"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        multiline
                        rows={3}
                        value={values.evolution}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                      <TextField
                        error={Boolean(
                          touched.indications && errors.indications
                        )}
                        fullWidth
                        helperText={touched.indications && errors.indications}
                        label="Indicaciones"
                        name="indications"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        multiline
                        rows={3}
                        value={values.indications}
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
          ) : null}
        </Container>
      </Dialog>

      {/* dialog para agregar nueva consulta */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={openNew}
        onClose={handleCloseNew}
      >
        <DialogTitle>
          <Typography variant="h3">Nueva consulta</Typography>
        </DialogTitle>
        <Container maxWidth="md">
          <Formik
            initialValues={{
              reason: '',
              background: ''
            }}
            validationSchema={Yup.object().shape({
              reason: Yup.string().required(),
              background: Yup.string().required()
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                id_paciente: paciente._id
              };
              addMentalQuery(values);
              handleCloseNew();
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
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.reason && errors.reason)}
                      fullWidth
                      helperText={touched.reason && errors.reason}
                      label="Motivo de Consulta"
                      name="reason"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.reason}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      error={Boolean(touched.background && errors.background)}
                      fullWidth
                      helperText={touched.background && errors.background}
                      label="Antecedentes"
                      name="background"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
                      rows={2}
                      value={values.background}
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
        </Container>
      </Dialog>
    </Card>
  );
};

Notifications.propTypes = {
  paciente: PropTypes.object,
  user: PropTypes.object,
  getMentalEvolutions: PropTypes.func
};

export default Notifications;
