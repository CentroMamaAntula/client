import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button,
  TableContainer,
  Toolbar
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  results,
  selectPaciente,
  getClinicHistory,
  ...rest
}) => {
  const classes = useStyles();
  const [push, setPush] = useState(false);

  const handleClick = paciente => {
    selectPaciente(paciente);
    getClinicHistory(paciente._id);
    setPush(true);
  };

  return push ? (
    <Navigate to="/app/dashboard" />
  ) : (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <TableContainer>
            <Toolbar>
              <Typography
                variant="h4"
                color="initial"
                component="div"
                align="left"
              >
                {`Total: ${results.length}`}
              </Typography>
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>DNI</TableCell>
                  <TableCell>Nombre y Apellido</TableCell>
                  <TableCell>Domicilio</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Telefono Familiar</TableCell>
                  <TableCell>Cobertura Social</TableCell>
                  <TableCell>Seleccionar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.length !== 0 ? (
                  results.map(result => (
                    <TableRow hover key={result._id}>
                      {/* <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="h3">
                          {result.number}
                          </Typography>
                      </Box>
                    </TableCell> */}
                      <TableCell>
                        {new Date(result.date)
                          .toJSON()
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('/')}
                      </TableCell>
                      <TableCell>{result.type}</TableCell>
                      <TableCell>{result.id_paciente.dni}</TableCell>
                      <TableCell>{result.id_paciente.name}</TableCell>
                      <TableCell>{result.id_paciente.domicile}</TableCell>
                      <TableCell>{result.id_paciente.phone}</TableCell>
                      <TableCell>{result.id_paciente.family_phone}</TableCell>
                      <TableCell>
                        {result.id_paciente.social_coverage}
                      </TableCell>
                      <TableCell>
                        <Box display="flex">
                          <Button
                            color="primary"
                            endIcon={<ArrowRightIcon />}
                            size="small"
                            variant="outlined"
                            onClick={e => handleClick(result.id_paciente)}
                          >
                            Ver
                          </Button>
                        </Box>
                      </TableCell>
                      {/*<TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow hover>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="h6">
                          No hay pacientes
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
  selectPaciente: PropTypes.func,
  getClinicHistory: PropTypes.func
};

export default Results;
