import React from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import RelativesList from './RelativesList';
import RelativesHeader from './RelativesHeader';

function Relatives() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<RelativesHeader />}
      content={<RelativesList />}
      innerScroll
    />
  );
}

export default withReducer('customerApp', reducer)(Relatives);