import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {`${new Date(product.date).toLocaleDateString()} 
              ${new Date(product.date).toLocaleTimeString()}`}
          </Typography>
        </Box>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.evolution}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid className={classes.statsItem} item>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              {product.professional_name.name}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
