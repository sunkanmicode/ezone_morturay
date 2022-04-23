import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import withReducer from 'app/store/withReducer';
import reducers from './store/reducers';
import * as appActions from 'app/store/actions';
import * as Actions from './store/actions';
import { FusePageCarded } from '@fuse';
import InvoicesHeader from './invoices/InvoicesHeader';
import InvoiceHeader from './invoice/InvoiceHeader';
import InvoiceList from './invoice/InvoiceList';
import InvoicesList from './invoices/InvoicesList';
import InvoiceToolbar from './invoice/InvoiceToolbar';
import NewProformaInvoice from './new-invoice/AddInvoice';
import ProformaInvoiceDialog from "./dialog/ProformaInvoiceDialog"

const styles = (theme) => ({
  layoutRoot: {},
});

class ProformaInvoiceApp extends Component {

  componentDidMount() {
    this.props.getInvoices()
    this.props.getCustomers()
    this.props.getServices()
    this.props.getDiscounts()
    this.props.getBranches()
  }

  render() {
    const { classes, match } = this.props;

    if(match.params.id === "new") {
      return (
        <React.Fragment>
          <NewProformaInvoice />
          <ProformaInvoiceDialog />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
            root: classes.layoutRoot,
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          }}
          header={
            match.params.id ? <InvoiceHeader /> : <InvoicesHeader />
          }
          contentToolbar={
            match.params.id ? <InvoiceToolbar /> : null
          }
          content={
            <div className='w-full'>
              {match.params.id ? <InvoiceList /> : <InvoicesList />}
            </div>
          }
          innerScroll
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInvoices: Actions.getProformaInvoices,
    getCustomers: Actions.getCustomers,
    getServices: Actions.getServices,
    getDiscounts: Actions.getDiscounts,
    getBranches: appActions.getBranches,
  }, dispatch)
}

export default withReducer(
  'proformaApp',
  reducers
)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(ProformaInvoiceApp)));
