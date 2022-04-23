import React, { useEffect, Fragment } from 'react';
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as appActions from 'app/store/actions';
import * as Actions from '../store/actions';
import ServicesList from './services/ServicesList';
import ServiceDetails from './service/ServiceDetails';
import ServicesHeader from './services/ServicesHeader';
import ServiceHeader from './service/ServiceHeader';
import ServiceToolbar from './service/ServiceToolbar';
import AddService from './AddService';
import ServiceDialog from "./ServiceDialog"
import ConfirmDialog from "./ConfirmDialog"

export const types = ["Fixed", "Recurrent"].map((type, i) => ({
  id: i+1,
  label: type,
  value: type.toUpperCase(),
}));

const styles = (theme) => ({
  layoutRoot: {},
});

function Services(props) {
  const { classes, match } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getServices())
    dispatch(appActions.getBranches())
  }, [dispatch])

  if(match.params.id === "new"){
    return <AddService />
  }

  return (
    <Fragment>
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={
          props.match.params.id ? <ServiceHeader /> : <ServicesHeader />
        }
        contentToolbar={
          props.match.params.id ? <ServiceToolbar /> : ""
        }
        content={
          <div className='w-full'>
            {props.match.params.id ? <ServiceDetails /> : <ServicesList />}
          </div>
        }
        innerScroll
      />

      <ServiceDialog />
      <ConfirmDialog />
    </Fragment>
  );
}

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(Services)));
