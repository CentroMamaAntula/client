import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TextField,
  makeStyles,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CardContent,
  TablePagination,
  TableFooter,
  TableRow,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TablePaginationActions from 'src/components/TablePaginationActions';
import VCV from './vcv';
import PCV from './pcv';
import CPAP from './cpap';

const useStyles = makeStyles(() => ({
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MechanicVentilation = ({
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
  const [openMV, setOpenMV] = useState(false);
  const [mechanic_ventilation, setMechanicVentilation] = useState('');
  const [evolution, setEvolution] = useState({});

  const handleChange = e => {
    setMechanicVentilation(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = dataTwo => {
    setEvolution(dataTwo);
    setOpenMV(true);
  };

  const handleCloseMV = () => {
    setOpenMV(false);
  };

  const handleChangePage = (event, newPage) => {
    getEvolution({
      id_paciente: paciente._id,
      newPage: newPage + 1
    });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title="Ventilacion Mecanica"
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
          <Box mb={2}>
            <Typography color="textPrimary" variant="h3">
              Ventilacion Mecanica
            </Typography>
          </Box>
          <Box mb={2} style={{ width: 'auto' }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Ventilacion Mecanica"
                name="mechanic_ventilation"
                type="text"
                select
                onChange={handleChange}
                value={mechanic_ventilation}
              >
                <MenuItem value="VCV">VCV</MenuItem>
                <MenuItem value="PCV">PCV</MenuItem>
                <MenuItem value="CPAP">CPAP</MenuItem>
              </TextField>
            </Grid>
          </Box>

          <Grid container justify="center" spacing={1} alignItems="center">
            {mechanic_ventilation === 'VCV' ? (
              <VCV
                user={user}
                paciente={paciente}
                addEvolution={addEvolution}
                handleClose={handleClose}
              />
            ) : mechanic_ventilation === 'PCV' ? (
              <PCV
                user={user}
                paciente={paciente}
                addEvolution={addEvolution}
                handleClose={handleClose}
              />
            ) : mechanic_ventilation === 'CPAP' ? (
              <CPAP
                user={user}
                paciente={paciente}
                addEvolution={addEvolution}
                handleClose={handleClose}
              />
            ) : null}
          </Grid>
        </Container>
      </Dialog>
      <CardContent>
        <List>
          {data !== null &&
            data.evolutionMVs.map((element, i) => (
              <ListItem
                divider={i < data.evolutionMVs.length - 1}
                key={element._id}
              >
                <ListItemText
                  primary={`${new Date(element.date).toLocaleDateString()} 
                  ${new Date(element.date).toLocaleTimeString()}`}
                  secondary={`Tipo: ${element.type}`}
                />
                <IconButton
                  edge="end"
                  size="small"
                  onClick={e => handleClick(element)}
                >
                  <PostAddRoundedIcon />
                </IconButton>
              </ListItem>
            ))}
        </List>
        <PerfectScrollbar>
          <Box style={{ height: 'auto' }}>
            <Table>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPage={5}
                    rowsPerPageOptions={['']}
                    count={data ? data.total : 1}
                    page={data ? data.currentPage - 1 : 1}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
      {/* Dialog con evolucion vent mecanica */}
      <Dialog
        fullWidth
        scroll="paper"
        maxWidth={'md'}
        open={openMV}
        onClose={handleCloseMV}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {`${new Date(evolution.date).toLocaleDateString()} 
            ${new Date(evolution.date).toLocaleTimeString()}
          `}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h2" color="initial">
                {evolution.type}
              </Typography>
            </Grid>
            {evolution.FiO2 ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'FiO2'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.FiO2}
                </Typography>
              </Grid>
            ) : null}
            {evolution.onda ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'ONDA'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.onda}
                </Typography>
              </Grid>
            ) : null}
            {evolution.time_ins ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'T INSPIRATORIO'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.time_ins}
                </Typography>
              </Grid>
            ) : null}
            {evolution.breathing_frequency ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'FREC RESPIRATORIA'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.breathing_frequency}
                </Typography>
              </Grid>
            ) : null}
            {evolution.tidal_volumen ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'VOL TIDAL '}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.tidal_volumen}
                </Typography>
              </Grid>
            ) : null}
            {evolution.PEEP ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'PEEP'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.PEEP}
                </Typography>
              </Grid>
            ) : null}
            {evolution.peak_pressure ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'P PICO'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.peak_pressure}
                </Typography>
              </Grid>
            ) : null}
            {evolution.plateau_pressure ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'P PLATEAU'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.plateau_pressure}
                </Typography>
              </Grid>
            ) : null}
            {evolution.base_pressure ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'P BASE'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.base_pressure}
                </Typography>
              </Grid>
            ) : null}
            {evolution.compliance ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'COMPLIANCE'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.compliance}
                </Typography>
              </Grid>
            ) : null}
            {evolution.v_minute ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'V MINUTO'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.v_minute}
                </Typography>
              </Grid>
            ) : null}
            {evolution.r_time ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'R TIME'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.r_time}
                </Typography>
              </Grid>
            ) : null}
            {evolution.frequency ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'FRECUENCIA'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.frequency}
                </Typography>
              </Grid>
            ) : null}
            {evolution.control_pressure ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'P CONTROL'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.control_pressure}
                </Typography>
              </Grid>
            ) : null}
            {evolution.sensitivity ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'SENSIBILIDAD'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.sensitivity}
                </Typography>
              </Grid>
            ) : null}
            {evolution.subtype ? (
              <Grid item xs={3}>
                <Typography variant="h5" color="initial">
                  {'TIPO'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.subtype}
                </Typography>
              </Grid>
            ) : null}
            {evolution.professional_name ? (
              <Grid item xs={12}>
                <Typography variant="h5" color="initial">
                  {'Profesional:'}
                </Typography>
                <Typography variant="h6" color="initial">
                  {evolution.professional_name.name}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMV} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

MechanicVentilation.propTypes = {
  className: PropTypes.string,
  paciente: PropTypes.object,
  data: PropTypes.object,
  addEvolution: PropTypes.func,
  getEvolution: PropTypes.func
};

export default MechanicVentilation;
