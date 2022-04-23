import React from 'react';
import { IconButton, Icon } from '@material-ui/core';
import ReactToPdf from 'react-to-pdf';

const Button = React.forwardRef((props, ref) => {
  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [10, 16],
  };

  return (
    <ReactToPdf
      targetRef={ref}
      filename={`vault-report.pdf`}
      options={options}
      x={0.1}
      y={0.1}
      scale={0.8}
    >
      {({ toPdf }) => (
        <IconButton onClick={toPdf}>
          <Icon>cloud_download</Icon>
        </IconButton>
      )}
    </ReactToPdf>
  );
});

export default Button;
