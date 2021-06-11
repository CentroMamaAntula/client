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
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  MenuItem,
  Table,
  TableHead,
  TableBody
} from '@material-ui/core';

import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import { initialValues, validationSchema } from '../utils';

const BloodTest = ({
  className,
  user,
  paciente,
  data,
  addEvolution,
  getEvolutions,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  return (
    <Card className={clsx(className)} {...rest}>
      <CardHeader
        title="Laboratorio"
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
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" />
        <Container maxWidth="xl">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(validationSchema)}
            onSubmit={values => {
              values = {
                ...values,
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
                    Laboratorio
                  </Typography>
                </Box>
                <Grid
                  container
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item lg={4} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      label="Fecha"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="date"
                      value={values.date}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.rtoGr && errors.rtoGr)}
                      fullWidth
                      helperText={touched.rtoGr && errors.rtoGr}
                      label="Rto Globulos Rojos"
                      name="rtoGr"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.rtoGr}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.hb && errors.hb)}
                      fullWidth
                      helperText={touched.hb && errors.hb}
                      label="hb"
                      name="hb"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.hb}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.hto && errors.hto)}
                      fullWidth
                      helperText={touched.hto && errors.hto}
                      label="Hto"
                      name="hto"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.hto}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.rdw && errors.rdw)}
                      fullWidth
                      helperText={touched.rdw && errors.rdw}
                      label="rdw"
                      name="rdw"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.rdw}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.vmc && errors.vmc)}
                      fullWidth
                      helperText={touched.vmc && errors.vmc}
                      label="vmc"
                      name="vmc"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.vmc}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.hcm && errors.hcm)}
                      fullWidth
                      helperText={touched.hcm && errors.hcm}
                      label="hcm"
                      name="hcm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.hcm}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.chcm && errors.chcm)}
                      fullWidth
                      helperText={touched.chcm && errors.chcm}
                      label="CHCM"
                      name="chcm"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.chcm}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.rtogb && errors.rtogb)}
                      fullWidth
                      helperText={touched.rtogb && errors.rtogb}
                      label="Rto Globulos Blancos"
                      name="rtogb"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.rtogb}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.nj && errors.nj)}
                      fullWidth
                      helperText={touched.nj && errors.nj}
                      label="Nj"
                      name="nj"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.nj}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.e && errors.e)}
                      fullWidth
                      helperText={touched.e && errors.e}
                      label="E"
                      name="e"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.e}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.b && errors.b)}
                      fullWidth
                      helperText={touched.b && errors.b}
                      label="B"
                      name="b"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.b}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.m && errors.m)}
                      fullWidth
                      helperText={touched.m && errors.m}
                      label="M"
                      name="m"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.m}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.l && errors.l)}
                      fullWidth
                      helperText={touched.l && errors.l}
                      label="L"
                      name="l"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.l}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.rtoPlaq && errors.rtoPlaq)}
                      fullWidth
                      helperText={touched.rtoPlaq && errors.rtoPlaq}
                      label="Rto Plaquetas"
                      name="rtoPlaq"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.rtoPlaq}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.tp && errors.tp)}
                      fullWidth
                      helperText={touched.tp && errors.tp}
                      label="TP"
                      name="tp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.tp}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.porcAct && errors.porcAct)}
                      fullWidth
                      helperText={touched.porcAct && errors.porcAct}
                      label="% act"
                      name="porcAct"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.porcAct}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.kptt && errors.kptt)}
                      fullWidth
                      helperText={touched.kptt && errors.kptt}
                      label="KPTT"
                      name="kptt"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.kptt}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.rin && errors.rin)}
                      fullWidth
                      helperText={touched.rin && errors.rin}
                      label="RIN"
                      name="rin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.rin}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.dimenD && errors.dimenD)}
                      fullWidth
                      helperText={touched.dimenD && errors.dimenD}
                      label="Dimen D"
                      name="dimenD"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.dimenD}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.ferritina && errors.ferritina)}
                      fullWidth
                      helperText={touched.ferritina && errors.ferritina}
                      label="Ferritina"
                      name="ferritina"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.ferritina}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.glucemia && errors.glucemia)}
                      fullWidth
                      helperText={touched.glucemia && errors.glucemia}
                      label="Glucemia"
                      name="glucemia"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.glucemia}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.urea && errors.urea)}
                      fullWidth
                      helperText={touched.urea && errors.urea}
                      label="Urea"
                      name="urea"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.urea}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.creatinina && errors.creatinina)}
                      fullWidth
                      helperText={touched.creatinina && errors.creatinina}
                      label="Creatinina"
                      name="creatinina"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.creatinina}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.got && errors.got)}
                      fullWidth
                      helperText={touched.got && errors.got}
                      label="GOT"
                      name="got"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.got}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.gpt && errors.gpt)}
                      fullWidth
                      helperText={touched.gpt && errors.gpt}
                      label="GPT"
                      name="gpt"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.gpt}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.fal && errors.fal)}
                      fullWidth
                      helperText={touched.fal && errors.fal}
                      label="FAL"
                      name="fal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.fal}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.bilFoml && errors.bilFoml)}
                      fullWidth
                      helperText={touched.bilFoml && errors.bilFoml}
                      label="bilFoml"
                      name="bilFoml"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.bilFoml}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.BilD && errors.BilD)}
                      fullWidth
                      helperText={touched.BilD && errors.BilD}
                      label="BilD"
                      name="BilD"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.BilD}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.BilInd && errors.BilInd)}
                      fullWidth
                      helperText={touched.BilInd && errors.BilInd}
                      label="BilInd"
                      name="BilInd"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.BilInd}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.grupoSang && errors.grupoSang)}
                      fullWidth
                      select
                      helperText={touched.grupoSang && errors.grupoSang}
                      label="Grupo Sang"
                      name="grupoSang"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.grupoSang}
                      variant="outlined"
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="O">O</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.factorRH && errors.factorRH)}
                      fullWidth
                      select
                      helperText={touched.factorRH && errors.factorRH}
                      label="Factor RH"
                      name="factorRH"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.factorRH}
                      variant="outlined"
                    >
                      <MenuItem value="-">-</MenuItem>
                      <MenuItem value="+">+</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.vsg && errors.vsg)}
                      fullWidth
                      helperText={touched.vsg && errors.vsg}
                      label="vsg"
                      name="vsg"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.vsg}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.ldh && errors.ldh)}
                      fullWidth
                      helperText={touched.ldh && errors.ldh}
                      label="LDH"
                      name="ldh"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.ldh}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.pcr && errors.pcr)}
                      fullWidth
                      helperText={touched.pcr && errors.pcr}
                      label="PCR"
                      name="pcr"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.pcr}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.ph && errors.ph)}
                      fullWidth
                      helperText={touched.ph && errors.ph}
                      label="pH"
                      name="ph"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.ph}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.pCO2 && errors.pCO2)}
                      fullWidth
                      helperText={touched.pCO2 && errors.pCO2}
                      label="pCO2"
                      name="pCO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.pCO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.pO2 && errors.pO2)}
                      fullWidth
                      helperText={touched.pO2 && errors.pO2}
                      label="pO2"
                      name="pO2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.pO2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.sat && errors.sat)}
                      fullWidth
                      helperText={touched.sat && errors.sat}
                      label="Saturación"
                      name="sat"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.sat}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.HCO3 && errors.HCO3)}
                      fullWidth
                      helperText={touched.HCO3 && errors.HCO3}
                      label="HCO3-"
                      name="HCO3"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.HCO3}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.excB && errors.excB)}
                      fullWidth
                      helperText={touched.excB && errors.excB}
                      label="excB"
                      name="excB"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.excB}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.nat && errors.nat)}
                      fullWidth
                      helperText={touched.nat && errors.nat}
                      label="nat"
                      name="nat"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.nat}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.k && errors.k)}
                      fullWidth
                      helperText={touched.k && errors.k}
                      label="K+"
                      name="k"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.k}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.cl && errors.cl)}
                      fullWidth
                      helperText={touched.cl && errors.cl}
                      label="Cl-"
                      name="cl"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.cl}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={2} md={6} xs={10}>
                    <TextField
                      error={Boolean(touched.orina && errors.orina)}
                      fullWidth
                      helperText={touched.orina && errors.orina}
                      label="Orina"
                      name="orina"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.orina}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      multiline
                      rows={5}
                      helperText={touched.observations && errors.observations}
                      label="Observaciones"
                      name="observations"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
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
      <CardContent>
        <Box m={3}>
          <Grid container justify="center" spacing={1}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleClickView}
            >
              VER
            </Button>
          </Grid>
        </Box>
        <Dialog
          fullWidth
          maxWidth={'xl'}
          open={openView}
          onClose={handleCloseView}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" />
          <Container maxWidth="xl">
            <PerfectScrollbar>
              <Box display="flex" alignItems="center" m={3}>
                <Table>
                  <TableHead>
                    <TableRowCustom>
                      <TableCellCustom>Fecha</TableCellCustom>
                      <TableCellCustom>Rto Globulos Rojos</TableCellCustom>
                      <TableCellCustom>HB</TableCellCustom>
                      <TableCellCustom>Hto</TableCellCustom>
                      <TableCellCustom>RDW</TableCellCustom>
                      <TableCellCustom>VMC</TableCellCustom>
                      <TableCellCustom>HCM</TableCellCustom>
                      <TableCellCustom>CHCM</TableCellCustom>
                      <TableCellCustom>Rto Globulos Blancos</TableCellCustom>
                      <TableCellCustom>Nj</TableCellCustom>
                      <TableCellCustom>E</TableCellCustom>
                      <TableCellCustom>B</TableCellCustom>
                      <TableCellCustom>M</TableCellCustom>
                      <TableCellCustom>L</TableCellCustom>
                      <TableCellCustom>Rto Plaquetas</TableCellCustom>
                      <TableCellCustom>TP</TableCellCustom>
                      <TableCellCustom>% act</TableCellCustom>
                      <TableCellCustom>KPTT</TableCellCustom>
                      <TableCellCustom>RIN</TableCellCustom>
                      <TableCellCustom>Dimen D</TableCellCustom>
                      <TableCellCustom>Ferritina</TableCellCustom>
                      <TableCellCustom>Glucemia</TableCellCustom>
                      <TableCellCustom>Creatinina</TableCellCustom>
                      <TableCellCustom>GOT</TableCellCustom>
                      <TableCellCustom>GPT</TableCellCustom>
                      <TableCellCustom>FAL</TableCellCustom>
                      <TableCellCustom>Bil Foml</TableCellCustom>
                      <TableCellCustom>BilD</TableCellCustom>
                      <TableCellCustom>BilInd</TableCellCustom>
                      <TableCellCustom>Grupo Sang</TableCellCustom>
                      <TableCellCustom>Factor RH</TableCellCustom>
                      <TableCellCustom>VSG</TableCellCustom>
                      <TableCellCustom>LDH</TableCellCustom>
                      <TableCellCustom>PCR</TableCellCustom>
                      <TableCellCustom>pH</TableCellCustom>
                      <TableCellCustom>pCO2</TableCellCustom>
                      <TableCellCustom>pO2</TableCellCustom>
                      <TableCellCustom>Sat</TableCellCustom>
                      <TableCellCustom>HCO3</TableCellCustom>
                      <TableCellCustom>ExcB</TableCellCustom>
                      <TableCellCustom>Nat</TableCellCustom>
                      <TableCellCustom>K+</TableCellCustom>
                      <TableCellCustom>Cl-</TableCellCustom>
                      <TableCellCustom>Orina</TableCellCustom>
                      <TableCellCustom>Observaciones</TableCellCustom>
                    </TableRowCustom>
                  </TableHead>
                  <TableBody>
                    {data !== null &&
                      data.evolutions.map(evolution => (
                        <TableRowCustom hover key={evolution._id}>
                          <TableCellCustom>
                            {new Date(evolution.date)
                              .toJSON()
                              .slice(0, 10)
                              .split('-')
                              .reverse()
                              .join('/')}
                          </TableCellCustom>
                          <TableCellCustom>{evolution.rtoGr}</TableCellCustom>
                          <TableCellCustom>{evolution.hb}</TableCellCustom>
                          <TableCellCustom>{evolution.hto}</TableCellCustom>
                          <TableCellCustom>{evolution.rdw}</TableCellCustom>
                          <TableCellCustom>{evolution.vmc}</TableCellCustom>
                          <TableCellCustom>{evolution.hcm}</TableCellCustom>
                          <TableCellCustom>{evolution.chcm}</TableCellCustom>
                          <TableCellCustom>{evolution.rtogb}</TableCellCustom>
                          <TableCellCustom>{evolution.nj}</TableCellCustom>
                          <TableCellCustom>{evolution.e}</TableCellCustom>
                          <TableCellCustom>{evolution.b}</TableCellCustom>
                          <TableCellCustom>{evolution.m}</TableCellCustom>
                          <TableCellCustom>{evolution.l}</TableCellCustom>
                          <TableCellCustom>{evolution.rtoPlaq}</TableCellCustom>
                          <TableCellCustom>{evolution.tp}</TableCellCustom>
                          <TableCellCustom>{evolution.porcAct}</TableCellCustom>
                          <TableCellCustom>{evolution.kptt}</TableCellCustom>
                          <TableCellCustom>{evolution.rin}</TableCellCustom>
                          <TableCellCustom>{evolution.dimenD}</TableCellCustom>
                          <TableCellCustom>
                            {evolution.ferritina}
                          </TableCellCustom>
                          <TableCellCustom>
                            {evolution.glucemia}
                          </TableCellCustom>
                          <TableCellCustom>
                            {evolution.creatinina}
                          </TableCellCustom>
                          <TableCellCustom>{evolution.got}</TableCellCustom>
                          <TableCellCustom>{evolution.gpt}</TableCellCustom>
                          <TableCellCustom>{evolution.fal}</TableCellCustom>
                          <TableCellCustom>{evolution.bilFoml}</TableCellCustom>
                          <TableCellCustom>{evolution.BilD}</TableCellCustom>
                          <TableCellCustom>{evolution.BilInd}</TableCellCustom>
                          <TableCellCustom>
                            {evolution.grupoSang}
                          </TableCellCustom>
                          <TableCellCustom>
                            {evolution.factorRH}
                          </TableCellCustom>
                          <TableCellCustom>{evolution.vsg}</TableCellCustom>
                          <TableCellCustom>{evolution.ldh}</TableCellCustom>
                          <TableCellCustom>{evolution.pcr}</TableCellCustom>
                          <TableCellCustom>{evolution.ph}</TableCellCustom>
                          <TableCellCustom>{evolution.pCO2}</TableCellCustom>
                          <TableCellCustom>{evolution.pO2}</TableCellCustom>
                          <TableCellCustom>{evolution.sat}</TableCellCustom>
                          <TableCellCustom>{evolution.HCO3}</TableCellCustom>
                          <TableCellCustom>{evolution.excB}</TableCellCustom>
                          <TableCellCustom>{evolution.nat}</TableCellCustom>
                          <TableCellCustom>{evolution.k}</TableCellCustom>
                          <TableCellCustom>{evolution.cl}</TableCellCustom>
                          <TableCellCustom>{evolution.orina}</TableCellCustom>
                          <TableCellCustom>
                            {evolution.observations}
                          </TableCellCustom>
                        </TableRowCustom>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Container>
        </Dialog>
      </CardContent>
    </Card>
  );
};

BloodTest.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addEvolution: PropTypes.func,
  getEvolutionss: PropTypes.func
};

export default BloodTest;
