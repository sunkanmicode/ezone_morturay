import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import withReducer from 'app/store/withReducer';
import reducers from './../store/reducers';
import * as appActions from './../../../store/actions';
import { FusePageCarded } from '@fuse';
import VouchersHeader from './vouchers/VouchersHeader';
import VoucherHeader from './voucher/VoucherHeader';
import VoucherList from './voucher/VoucherList';
import VouchersList from './vouchers/VouchersList';
import VoucherToolbar from './voucher/VoucherToolbar';
import NewVoucher from './new-voucher/AddVoucher';
import VoucherDialog from "./VoucherDialog"

const styles = (theme) => ({
  layoutRoot: {},
});

class VouchersApp extends Component {

  componentDidMount() {
    this.props.getBranches()
  }

  render() {
    const { classes, match } = this.props;

    if(match.params.id === "new" || match.params.id === "edit") {
      return (
        <React.Fragment>
          <NewVoucher />
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
            match.params.id ? <VoucherHeader /> : <VouchersHeader />
          }
          contentToolbar={
            match.params.id ? <VoucherToolbar /> : null
          }
          content={
            <div className='w-full'>
              {match.params.id ? <VoucherList /> : <VouchersList />}
            </div>
          }
          innerScroll
        />

        <VoucherDialog />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBranches: appActions.getBranches
  }, dispatch)
}

export default withReducer(
  'vouchersApp',
  reducers
)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(VouchersApp)));
