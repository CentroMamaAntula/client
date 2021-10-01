import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import cie10 from 'src/utils/cie10';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  Container,
  List,
  ListItem,
  ListItemText,
  TablePagination,
  TableFooter,
  TableRow,
  Table
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TablePaginationActions from 'src/components/TablePaginationActions';
import VirtualizedAutocomplete from './VirtualizedAutocomplete';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Diagnostic = ({
  className,
  id,
  user,
  data,
  disabled,
  addDiagnostic,
  getDiagnostic,
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

  const handleChangePage = (event, newPage) => {
    getDiagnostic({ id_paciente: id, newPage: newPage + 1 });
  };

  const handleLabelDisplay = ({ from, to, count }) => {
    return `Mostrando desde ${from} a ${to} de ${count}`;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Diagnosticos"
        titleTypographyProps={{ variant: 'h3' }}
        action={
          <Button
            disabled={disabled}
            endIcon={<AddBoxIcon />}
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
          >
            NUEVO
          </Button>
        }
      />
      {/* list */}
      <CardContent>
        <List>
          {data !== null &&
            data.diagnostics.map((element, i) => (
              <ListItem
                divider={i < data.diagnostics.length - 1}
                key={element._id}
              >
                <ListItemText
                  primary={
                    <Box mb={1}>
                      <Typography variant="h5">
                        {moment(element.date).format('DD/MM/YYYY HH:mm')}
                      </Typography>
                      <Typography variant="h4">
                        {element.description}
                      </Typography>
                    </Box>
                  }
                  secondary={`Codigo: ${element.code}
                   ${element.code_0 ? element.code_0 : ''}
                   ${element.code_1 ? element.code_1 : ''}
                   ${element.code_2 ? element.code_2 : ''}
                   ${element.code_3 ? element.code_3 : ''}
                   ${element.code_4 ? element.code_4 : ''}
                  `}
                />
              </ListItem>
            ))}
        </List>
      </CardContent>

      {/* paginacion */}
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={3}
              rowsPerPageOptions={['']}
              count={data ? data.total : 1}
              page={data ? data.currentPage - 1 : 1}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

      {/* dialog con form */}
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
              description: ''
            }}
            validationSchema={Yup.object().shape({
              description: Yup.string().max(
                450,
                'No exceder los 450 caracteres'
              )
            })}
            onSubmit={values => {
              values = {
                ...values,
                date: Date.now(),
                id_paciente: id,
                professional_name: user._id
              };
              addDiagnostic(values);
              handleClose();
            }}
          >
            {({
              errors,
              handleBlur,
              setValues,
              handleSubmit,
              isSubmitting,
              touched
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                  <Typography color="textPrimary" variant="h3">
                    Nuevo Diagnostico
                  </Typography>
                </Box>
                <Grid container justify="center" spacing={1}>
                  <Grid item lg={8} md={8} sm={8} xl={8} xs={12}>
                    <VirtualizedAutocomplete
                      data={cie10}
                      touched={touched}
                      errors={errors}
                      setValues={setValues}
                      handleBlur={handleBlur}
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
    </Card>
  );
};

Diagnostic.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  user: PropTypes.object,
  data: PropTypes.object,
  disabled: PropTypes.bool,
  addPhysicalExam: PropTypes.func,
  getPhysicalExam: PropTypes.func
};

export default Diagnostic;
