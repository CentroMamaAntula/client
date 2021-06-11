import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { List } from 'react-virtualized';

const ListboxComponent = React.forwardRef((props, ref) => {
  const { children, role, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 50;

  return (
    <div ref={ref}>
      <div {...other}>
        <List
          height={250}
          width={800}
          rowHeight={itemSize}
          overscanCount={5}
          rowCount={itemCount}
          rowRenderer={props => {
            return React.cloneElement(children[props.index], {
              style: props.style
            });
          }}
          role={role}
        />
      </div>
    </div>
  );
});

const VirtualizedAutocomplete = ({
  data,
  touched,
  errors,
  setValues,
  handleBlur
}) => {
  const handleChange = (e, v, r) => {
    setValues(v);
  };
  return (
    <Autocomplete
      disableListWrap
      freeSolo
      onChange={handleChange}
      ListboxComponent={ListboxComponent}
      options={data}
      getOptionLabel={option => option.description}
      renderInput={params => (
        <TextField
          {...params}
          error={Boolean(touched.temperature && errors.temperature)}
          fullWidth
          helperText={touched.temperature && errors.temperature}
          label="Diagnosticos CIE-10"
          onBlur={handleBlur}
          variant="outlined"
        />
      )}
    />
  );
};

export default VirtualizedAutocomplete;
