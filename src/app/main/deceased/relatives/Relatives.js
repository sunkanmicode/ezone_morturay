import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import RelativesList from './RelativesList';
import RelativesHeader from './RelativesHeader';

function Relatives(props) {
  const dispatch = useDispatch()
  const match = useRouteMatch()

  useEffect(() => {
    dispatch(Actions.getDeceasedRelatives(match.params.id));
  }, [dispatch, match.params.id]);

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

export default withReducer('deceasedApp', reducer)(Relatives);