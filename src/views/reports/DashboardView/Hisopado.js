import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Card,
  CardContent,
  colors,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  TableFooter,
  TableRow,
  TablePagination,
  IconButton
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import TablePaginationActions from 'src/components/TablePaginationActions';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const Hisopado = ({
  className,
  id,
  data,
  disabled,
  addHisopado,
  updateHisopado,
  getHisopado,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickEdit = hisopado => {
    setEdit(hisopado);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    getHisopado({ id_paciente: id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Hisopados"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button
            disabled={disabled}
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
            endIcon={<AddBoxIcon />}
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
              date: edit
                ? new Date(edit.date).toJSON().slice(0, 10)
                : new Date().toJSON().slice(0, 10),
              type: edit ? edit.type : '',
              sample: edit ? edit.sample : '',
              result: edit ? edit.result : '',
              observations: edit ? edit.observations : '',
              next: edit
                ? new Date(edit.next).toJSON().slice(0, 10)
                : new Date().toJSON().slice(0, 10)
            }}
            validationSchema={Yup.object().shape({
              type: Yup.string('Debe ser un lugar de procedencia valido'),
              sample: Yup.string('Debe ser un lugar de procedencia valido'),
              result: Yup.string('No superar los 600 caracteres'),
              observations: Yup.string('No superar los 600 caracteres'),
              next: Yup.date('Debe ingresar una fecha valida')
            })}
            onSubmit={values => {
              if (edit) {
                values = {
                  ...values,
                  _id: edit._id
                };
                updateHisopado(values);
              } else {
                values = {
                  ...values,
                  id_paciente: id
                };

                addHisopado(values);
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
                  <Typography color="textPrimary" variant="h3">
                    Hisopado
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={6} sm={6} md={4}>
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
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.type && errors.type)}
                      fullWidth
                      select
                      helperText={touched.type && errors.type}
                      label="Tipo"
                      name="type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.type}
                      variant="outlined"
                    >
                      <MenuItem value={'Hisopado'}>Hisopado</MenuItem>
                      <MenuItem value={'Aspirado'}>Aspirado</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.sample && errors.sample)}
                      fullWidth
                      select
                      helperText={touched.sample && errors.sample}
                      label="Muestra"
                      name="sample"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="boolean"
                      value={values.sample}
                      variant="outlined"
                    >
                      <MenuItem value={true}>Se tomo muestra</MenuItem>
                      <MenuItem value={false}>No se tomo muestra</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.result && errors.result)}
                      fullWidth
                      select
                      helperText={touched.result && errors.result}
                      label="Resultado"
                      name="result"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.result}
                      variant="outlined"
                    >
                      <MenuItem value={'Negativo'}>Negativo</MenuItem>
                      <MenuItem value={'Positivo'}>Positivo</MenuItem>
                      <MenuItem value={'Muestra Insuficiente'}>
                        Muestra Insuficiente
                      </MenuItem>
                      <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(touched.next && errors.next)}
                      fullWidth
                      helperText={touched.next && errors.next}
                      label="Próximo Hisopado"
                      name="next"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="date"
                      value={values.next}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={4}>
                    <TextField
                      error={Boolean(
                        touched.observations && errors.observations
                      )}
                      fullWidth
                      helperText={touched.observations && errors.observations}
                      label="Observaciones"
                      name="observations"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      multiline
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
        <PerfectScrollbar>
          <Box height="auto" display="flex" alignItems="center">
            <Table>
              <TableHead>
                <TableRowCustom>
                  <TableCellCustom>Fecha</TableCellCustom>
                  <TableCellCustom>Muestra</TableCellCustom>
                  <TableCellCustom>Resultado</TableCellCustom>
                  <TableCellCustom>Próximo</TableCellCustom>
                  <TableCellCustom>Observaciones</TableCellCustom>
                  <TableCellCustom>Editar</TableCellCustom>
                </TableRowCustom>
              </TableHead>
              <TableBody>
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
                      <TableCellCustom>
                        {hisopado.sample ? 'SI' : 'NO'}
                      </TableCellCustom>
                      <TableCellCustom>{hisopado.result}</TableCellCustom>
                      <TableCellCustom>
                        {hisopado.next
                          ? new Date(hisopado.next)
                              .toJSON()
                              .slice(0, 10)
                              .split('-')
                              .reverse()
                              .join('/')
                          : ''}
                      </TableCellCustom>
                      <TableCellCustom>{hisopado.observations}</TableCellCustom>
                      <TableCellCustom>
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={e => handleClickEdit(hisopado)}
                        >
                          <PostAddRoundedIcon />
                        </IconButton>
                      </TableCellCustom>
                    </TableRowCustom>
                  ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={['']}
                    count={data !== null ? data.total : 1}
                    rowsPerPage={2}
                    page={data !== null ? data.currentPage - 1 : 1}
                    onChangePage={handleChangePage}
                    /*ActionsComponent={TablePaginationActions}*/
                    labelDisplayedRows={handleLabelDisplay}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

Hisopado.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  addHisopado: PropTypes.func,
  getHisopado: PropTypes.func
};

export default Hisopado;
