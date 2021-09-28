import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  MenuItem,
  makeStyles,
  Divider,
  FormControlLabel,
  Checkbox, DialogActions, DialogContent, DialogContentText, Table, TableHead, TableBody
} from '@material-ui/core';
import Tab from 'src/components/Tab';
import moment from 'moment';
import styled from 'styled-components';
import { display } from '@material-ui/system';
import TableRowCustom from 'src/components/TableRowlCustom';
import TableCellCustom from 'src/components/TableCellCustom';
import initialValues from '../utils';

const BoxPrint = styled('div')`${display}`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2.5),
  },
  subpaper: {
    paddingTop: theme.spacing(1),
  }
}));
const BloodTest = ({
  className,
  user,
  paciente,
  data,
  addReport,
  getReports,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openViewProgress, setOpenViewProgress] = useState(false);
  const [reportActual, setReportActual] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickViewProgress = () => {
    setOpenViewProgress(true);
  };

  const handleCloseViewProgress = () => {
    setOpenViewProgress(false);
  };
  const handleClickView = (e, item) => {
    setReportActual(item);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setReportActual({});
    setOpenView(false);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Laboratorio"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Fragment>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleClickViewProgress}
            >
              Historico
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleClickOpen}
            >
              Nuevo
            </Button>
          </Fragment>
        }
      />
      <CardContent>
        <Grid container spacing={1} p={2}>
          {data !== null &&
            data.reports.map((item) => (
              <Grid item xl={3} key={item._id}>
                <Box>
                  <Typography variant="h5">
                    {moment(item.date).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                  {item.report.map(report => (
                    <Typography variant="h4" key={report._id}>
                      {report.description}
                    </Typography>))}
                  <Typography variant="h6">
                    {`Bioquimico/a ${item.professional_name.name}`}
                  </Typography>
                </Box>
                <Box m={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={e => handleClickView(e, item)}
                  >
                    VER
                  </Button>
                </Box>
              </Grid>))}
        </Grid>
      </CardContent>

      {/* view report */}
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={openView}
        scroll={'body'}
        onClose={handleCloseView}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <BoxPrint display="none" displayPrint="block">
            <Typography variant="h1" color="initial">
              {'Laboratorio'}
            </Typography>
            <Typography variant="h2" color="initial">
              {'Centro de Salud Mama Antula'}
            </Typography>
          </BoxPrint>
          <Typography variant="h1" color="initial">
            {reportActual && `Analisís del ${new Date(reportActual.date).toLocaleString()}`}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
          >
            { reportActual.report &&
              reportActual.report.map(element => (
                <Grid container item xl={12} key={element._id}>
                  <Typography variant="h3" color="initial">
                    {element.description}
                  </Typography>
                  {element.sub.map(subelement => (
                    subelement.disabled
                    ?
                      <Grid item xs={12}>
                        <Typography variant="h4" color="initial" className={classes.subpaper}>
                          {subelement.description}
                        </Typography>
                      </Grid>
                    :
                      <Grid container item xs={12} m={4} key={subelement._id}>
                        <Grid item xl={4}>
                          <Typography variant="h5" color="initial" className={classes.paper}>
                            {subelement.description}
                          </Typography>
                        </Grid>
                        <Grid item xl={3}>
                          <Typography variant="h5" color="initial" className={classes.paper}>
                            {`${subelement.value} ${subelement.unit}`}
                          </Typography>
                        </Grid>
                        <Grid item xl={5}>
                          <Typography variant="h5" color="initial" className={classes.paper}>
                            {'VR '}
                            {subelement.type === 'text'
                              ? subelement.reference_values.map(value => `${value.type}: ${value.name}`)
                              : subelement.reference_values.map(value => `${value.type}: ${value.min ? `desde ${value.min}${subelement.unit}, ` : ''} ${value.max ? `hasta ${value.max}${subelement.unit} - ` : ''}`)}
                          </Typography>
                        </Grid>
                        <Divider />
                      </Grid>
                  ))}
                </Grid>
            ))}
            <Box display="flex" justifyContent="flex-end" m={2} p={1}>
              <Typography variant="h3" color="initial">
                {reportActual.professional_name && `Bioquimico ${reportActual.professional_name.name}`}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BoxPrint displayPrint="none">
            <Button onClick={handleCloseView} color="primary">
              Cerrar
            </Button>
            <Button onClick={window.print} color="primary">
              Imprimir
            </Button>
          </BoxPrint>
        </DialogActions>
      </Dialog>

      {/* view progresion */}
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={openViewProgress}
        scroll={'paper'}
        onClose={handleCloseViewProgress}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h1" color="initial">
            {}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
          >
            {
              data !== null &&
              data.reports.map((item) => (
                <Grid item xl={3} key={item._id}>
                  <Box>
                    <Typography variant="h5">
                      {moment(item.date).format('DD/MM/YYYY')}
                    </Typography>
                    {item.report.map(report => (
                      <Fragment>
                        <Typography variant="h4" key={report._id}>
                          {report.description}
                        </Typography>
                        <Box height="auto" display="flex" alignItems="center">
                          <Table>
                            <TableHead>
                              <TableRowCustom>
                                <TableCellCustom>Nombre</TableCellCustom>
                                {report.sub.map(item => (
                                  <TableCellCustom>{moment(item.date).format('DD/MM/YYYY')}</TableCellCustom>
                                ))}
                                <TableCellCustom>Nombre</TableCellCustom>
                              </TableRowCustom>
                            </TableHead>
                            <TableBody>
                              {/* <TableCellCustom>{}</TableCellCustom>
                              {data !== null &&
                                data.hisopados.map(hisopado => (
                                  <TableRowCustom hover key={hisopado._id}>
                                    <TableCellCustom>
                                      {new Date(hisopado.date)
                                        .toJSON()
                                        .slice(0, 10)
                                        .split('-')
                                        .reverse()
                                        .join('/')}
                                    </TableCellCustom>
                                  </TableRowCustom>
                                ))} */}
                            </TableBody>
                          </Table>
                        </Box>
                      </Fragment>
                      ))}
                  </Box>
                </Grid>))
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BoxPrint displayPrint="none">
            <Button onClick={handleCloseView} color="primary">
              Cerrar
            </Button>
            <Button onClick={window.print} color="primary">
              Imprimir
            </Button>
          </BoxPrint>
        </DialogActions>
      </Dialog>

      {/* nuevo */}
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="xl">
          <Formik
            initialValues={initialValues}
            /* validationSchema={Yup.object().shape(validationSchema)} */
            onSubmit={values => {
              values = values.filter(value => value.disabled);
              values.forEach(value => {
                value.sub = value.sub.filter(sub => sub.value !== '');
              });
              values = {
                date: Date.now(),
                report: values,
                id_paciente: paciente._id,
                professional_name: user._id
              };
              addReport(values);
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
                    Laboratorio
                  </Typography>
                </Box>
                <Tab
                  grid
                  tabs={values.map(item => item)}
                  tabPanel={
                    values.map((item, i) => (
                      <Fragment>
                        <Grid item xs={12} key={'a'.concat(i)}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values[i].disabled}
                                onChange={handleChange}
                                name={`[${i}].disabled`}
                                color="primary"
                              />
                            }
                            label="Incluir"
                          />
                        </Grid>
                        {item.sub.map((subitem, j) => (
                          subitem.disabled ?
                            (
                              <Grid mb={2} mt={4} item xs={12} key={'a'.concat(j + i)}>
                                <Typography color="textPrimary" variant="h4">
                                  {subitem.description}
                                </Typography>
                              </Grid>
                            )
                          : (
                            <Grid mb={2} item xl={6} md={12} key={'a'.concat(j + i)}>
                              <TextField
                                /* error={Boolean(touched[j] && errors[j])} */
                                fullWidth
                                /* helperText={touched[j] && errors[j]} */
                                label={`${values[i].sub[j].description} 
                                  || VR: ${values[i].sub[j].type === 'text'
                                    ?
                                      values[i].sub[j].reference_values.map(value => `${value.type}: ${value.name}`)
                                    :
                                      values[i].sub[j].reference_values.map(value => `${value.type}: ${value.min ? `desde ${value.min}` : ''}, ${value.max ? `hasta ${value.max}` : ''}`)}
                                  ${values[i].sub[j].unit}`}
                                name={`[${i}].sub[${j}].value`}
                                onBlur={handleBlur}
                                margin="normal"
                                disabled={!values[i].disabled}
                                onChange={handleChange}
                                type={values[i].sub[j].type ? values[i].sub[j].type : 'text'}
                                value={values[i].sub[j].value}
                                variant="outlined"
                                multiline={values[i].sub[j].multiline}
                                rows={values[i].sub[j].multiline ? 6 : 1}
                                select={values[i].sub[j].select}
                              >
                                {values[i].sub[j].select
                                  ? values[i].sub[j].items.map(option => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))
                                  : null}
                              </TextField>
                            </Grid>
                          )))}
                      </Fragment>
                    ))
                    }
                />
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

BloodTest.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addReport: PropTypes.func,
  getReports: PropTypes.func
};

export default BloodTest;
