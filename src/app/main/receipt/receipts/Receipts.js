import React from 'react';
import { FusePageSimple } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import InvoicesList from './ReceiptsList';
import InvoicesHeader from './ReceiptsHeader';

const styles = (theme) => ({
  layoutRoot: {},
});

function Receipts(props) {
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
export default withStyles(styles, { withTheme: true })(Receipts);
