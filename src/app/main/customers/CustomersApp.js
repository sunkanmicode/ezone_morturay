import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import * as appActions from 'app/store/actions';
import { FusePageCarded } from '@fuse';
import CustomersHeader from './customers/CustomersHeader';
import CustomerHeader from './customer/CustomerHeader';
import CustomerToolbar from './customer/CustomerToolbar';
import CustomersList from './customers/CustomersList';
import CustomerDetails from './customer/CustomerDetails';
import CreateCustomer from './new-customer/CreateCustomer';
import AddServicesDialog from '../invoice/dialog/AddServicesDialog';

const styles = (theme) => ({
  layoutRoot: {},
});

class CustomerApp extends Component {
  componentDidMount() {
    this.props.getCustomers();
    this.props.getBranches();
  }

  render() {
    const { match } = this.props;

    if (match.params.id === 'new') {
      return <CreateCustomer />;
    }

    return (
      <>
        <FusePageCarded
          classes={{
            content: "flex",
            header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
          }}
          header={match.params.id ? <CustomerHeader /> : <CustomersHeader />}
          contentToolbar={match.params.id ? <CustomerToolbar /> : null}
          content={
            <div className="w-full">
              {match.params.id ? <CustomerDetails /> : <CustomersList />}
            </div>
          }
          innerScroll
        />
        {/* <AddServicesDialog /> */}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomers: Actions.getCustomers,
      getBranches: appActions.getBranches,
    },
    dispatch
  );
};

export default withReducer(
  'customerApp',
  reducer
)(
  withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(CustomerApp)
  )
);
