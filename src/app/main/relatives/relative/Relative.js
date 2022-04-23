import React from 'react';
import { FusePageCarded } from '@fuse';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import CustomerHeader from './RelativeHeader';
import CustomerToolbar from './RelativeToolbar';
import CustomerDetails from './RelativeDetails';
import CreateCustomer from '../new-customer/CreateCustomer';

function Relative(props) {
  if (props.match.params.id === 'new') {
    return <CreateCustomer />;
  }

  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={props.match.params.id ? <CustomerHeader /> : <CustomerHeader />}
      contentToolbar={<CustomerToolbar />}
      content={
        <div className='p-16 sm:p-24 w-full'>
          <CustomerDetails />
        </div>
      }
      innerScroll
    />
  );
}

// export default withReducer('customerApp', reducer)(Customer);
export default Relative;
