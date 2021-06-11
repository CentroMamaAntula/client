import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import calculateAge from 'src/utils/calculateAge';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardContent,
  colors,
  Table,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  CardHeader
} from '@material-ui/core';
import TableCellCustom from 'src/components/TableCellCustom';
import TableRowCustom from 'src/components/TableRowlCustom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const PatientData = ({ className, paciente, medicalHistory, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader
          title={paciente.name}
          titleTypographyProps={{ variant: 'h2' }}
        />
        <CardContent>
          <PerfectScrollbar>
            <Box minWidth={800}>
              <Table>
                <TableHead>
                  <TableRowCustom>
                    <TableCellCustom>DNI</TableCellCustom>
                    <TableCellCustom>Edad</TableCellCustom>
                    <TableCellCustom>Domicilio</TableCellCustom>
                    <TableCellCustom>Teléfono</TableCellCustom>
                    <TableCellCustom>Teléfono Familiar</TableCellCustom>
                    <TableCellCustom>Cobertura Social</TableCellCustom>
                    <TableCellCustom>Antecedentes Médicos</TableCellCustom>
                  </TableRowCustom>
                </TableHead>
                <TableBody>
                  <TableRowCustom hover key={paciente._id}>
                    <TableCell>{paciente.dni}</TableCell>
                    <TableCell>{calculateAge(paciente.birthday)}</TableCell>
                    <TableCell>{paciente.domicile}</TableCell>
                    <TableCell>{paciente.phone}</TableCell>
                    <TableCell>{paciente.family_phone}</TableCell>
                    <TableCell>{paciente.social_coverage}</TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Button
                          disabled={medicalHistory === null}
                          color="primary"
                          endIcon={<ArrowRightIcon />}
                          size="small"
                          variant="outlined"
                          onClick={handleOpen}
                        >
                          Ver
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRowCustom>
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </CardContent>
      </Card>

      {/* view antecedentes */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Antecedentes Médicos</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Diabetes"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.diabetes}. ${medicalHistory.obs_diabetes} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="EPOC/ASMA"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.epoc_asma}. ${medicalHistory.obs_epoc} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Enfermeda renal cronica"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.renal_cronica}. ${medicalHistory.obs_renal} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Enfermedad Cardiovascular"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.cardiovascular}. ${medicalHistory.obs_cardio} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Inmunocomprometido"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.inmunocomprometido}. ${medicalHistory.obs_inmuno} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Obesidad morbida"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.obesidad_morbida}. ${medicalHistory.obs_obesidad} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tabaquismo"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.tabaquismo}. ${medicalHistory.obs_tabaquismo} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Alcoholismo"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.alcoholismo}. ${medicalHistory.obs_alcoholismo} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Adicciones"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.adiccion}. ${medicalHistory.obs_adiccion} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Alergias"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.alergias}. ${medicalHistory.obs_alergias} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Psicologicos/Psiquiuatricos"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.psicologicos_psiquiuatricos}. ${medicalHistory.obs_psi} `
                    : 'Ninguno'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Violencia"
                secondary={
                  medicalHistory
                    ? ` ${medicalHistory.violencia}. ${medicalHistory.obs_violencia} `
                    : 'Ninguno'
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

PatientData.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  medicalHistory: PropTypes.object
};

export default PatientData;
