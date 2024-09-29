import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Copyright(props) {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        align="center"
        {...props}
        sx={[
          {
            color: 'text.secondary',
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
      >
        {'Developed by: '}
        <Link color="inherit" href="mailto:aisa@ucdenver.edu">
          AI Student Association
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </React.Fragment>
  );
}

Copyright.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // Validate sx prop
};
