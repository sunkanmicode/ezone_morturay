import React from 'react';
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import InvoiceDetails from './InvoiceDetails';
import InvoiceHeader from './InvoiceHeader';
import InvoiceToolbar from './InvoiceToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

function InvoiceAdvice(props) {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<InvoiceHeader />}
      contentToolbar={<InvoiceToolbar /> }
      content={
        <div className='p-16 sm:p-24 w-full'>
          {<InvoiceDetails />}
        </div>
      }
      innerScroll
    />
  );
}

export default withStyles(styles, { withTheme: true })(withReducer('customerApp', reducer)(InvoiceAdvice));
