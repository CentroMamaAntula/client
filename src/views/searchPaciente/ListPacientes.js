import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ListPacientes = ({ className, pacientes, select, ...rest }) => {
  const classes = useStyles();

  const handleClick = data => {
    select(data);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Pacientes" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
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
              {pacientes.map(paciente => (
                <TableRow hover key={paciente._id}>
                  <TableCell>{paciente.dni}</TableCell>
                  <TableCell>{paciente.name}</TableCell>
                  <TableCell>{paciente.domicile}</TableCell>
                  <TableCell>{paciente.phone}</TableCell>
                  <TableCell>{paciente.family_phone}</TableCell>
                  <TableCell>{paciente.social_coverage}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        color="primary"
                        endIcon={<ArrowRightIcon />}
                        size="small"
                        variant="outlined"
                        onClick={e => handleClick(paciente)}
                      >
                        Ver
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ListPacientes.propTypes = {
  className: PropTypes.string,
  pacientes: PropTypes.array,
  select: PropTypes.func,
};

export default ListPacientes;
