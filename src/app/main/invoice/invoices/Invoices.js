import React from 'react';
import { FusePageSimple } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import InvoicesList from './InvoicesList';
import InvoicesHeader from './InvoicesHeader';

const styles = (theme) => ({
  layoutRoot: {},
});

function Invoices(props) {
  const { classes } = props;

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <InvoicesHeader />
        </div>
      }
      content={<InvoicesList />}
    />
  );
}

// export default withReducer('eCommerceApp', reducer)(Deceased);
export default withStyles(styles, { withTheme: true })(Invoices);
