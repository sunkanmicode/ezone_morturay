import React, { Fragment } from 'react';
import { Icon, Button } from '@material-ui/core';

function InvoiceUploadImage(props) {
  return (
    <Fragment>
      <input
        accept='image/*'
        className='hidden'
        id='button-file'
        type='file'
        name="file"
        onChange={props.handleImageUpload}
      />
      <label htmlFor='button-file'>
        <Button className='' component='span' variant='outlined'>
          Attach <Icon fontSize='small'>attach_file</Icon>
        </Button>
      </label>
    </Fragment>
  );
}

export default InvoiceUploadImage;
