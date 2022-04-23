import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducers from './store/reducers';
import * as Actions from './store/actions';
import * as appActions from './../../store/actions';
import { FusePageCarded } from '@fuse';
import InvoicesHeader from './invoices/InvoicesHeader';
import InvoiceHeader from './invoice/InvoiceHeader';
import InvoiceList from './invoice/InvoiceList';
import InvoicesList from './invoices/InvoicesList';
import InvoicesToolbar from './invoices/InvoicesToolbar';
import InvoiceToolbar from './invoice/InvoiceToolbar';
import SendInvoiceDialog from './dialog/SendInvoiceDialog';
import RecordPaymentDialog from './dialog/RecordPaymentDialog';
import AddServicesDialog from './dialog/AddServicesDialog';



const styles = (theme) => ({
  layoutRoot: {},
});

class InvoiceApp extends Component {
  componentDidMount() {
    this.props.getCustomers();
    this.props.getServices();
    this.props.getDiscounts();
    this.props.getBranches();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.getBranches();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
            root: classes.layoutRoot,
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-130',
          }}
          header={
            this.props.match.params.id ? <InvoiceHeader /> : <InvoicesHeader />
          }
          contentToolbar={
            this.props.match.params.id ? (
              <InvoiceToolbar />
            ) : (
              <InvoicesToolbar />
            )
          }
          content={
            <div className='w-full'>
              {this.props.match.params.id ? <InvoiceList /> : <InvoicesList />}
            </div>
          }
          innerScroll
        />
        <SendInvoiceDialog />
        <RecordPaymentDialog />
        <AddServicesDialog />
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getInvoices: Actions.getInvoices,
      getCustomers: Actions.getCustomers,
      getServices: Actions.getServices,
      getDiscounts: Actions.getDiscounts,
      getBranches: appActions.getBranches,
    },
    dispatch
  );
};

export default withReducer(
  'invoicesApp',
  reducers
)(
  withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(InvoiceApp)
  )
);
