import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import DialogData from './DialogData';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({
  className,
  addPaciente,
  newPaciente,
  getPaciente,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (isNaN(e.target.value)) {
        getPaciente(e.target.value);
      } else {
        getPaciente(e.target.value);
      }
    }
  };
  const handleChangeText = e => {
    setValue(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <DialogData
          open={open}
          handleClose={handleClose}
          addPaciente={addPaciente}
        />
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex" p={1}>
              <Box maxWidth={500} flexGrow={1} p={1}>
                <TextField
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
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChange={handleChangeText}
                  placeholder="Buscar Paciente"
                  variant="outlined"
                />
              </Box>
              {newPaciente ? (
                <Box p={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Nuevo Paciente
                  </Button>
                </Box>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  addPaciente: PropTypes.func,
  editPaciente: PropTypes.func,
  getPaciente: PropTypes.func,
  getData: PropTypes.func
};

export default Toolbar;
