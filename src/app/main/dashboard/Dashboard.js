import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import withReducer from "./../../store/withReducer"
import reducers from "./store/reducers"
import * as Actions from "./store/actions"
import * as GlobalAction from '../../store/actions'
import DashboardContent from './components/DashboardContent';

const styles = (theme) => ({
  layoutRoot: {},
});

class Example extends Component {

  componentDidMount() {
    this.props.getCustomers()
    this.props.getInvoices()
    this.props.getServices()
    this.props.getBranches()
  }

  render() {
    const { classes } = this.props;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <div className='px-24'>
            <h4 className='text-lg'>Dashboard</h4>
          </div>
        }
        // contentToolbar={<div className='px-24'></div>}
        content={
          <div className='p-24'>
            <DashboardContent />
          </div>
        }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCustomers: Actions.getCustomers,
    getInvoices: Actions.getInvoices,
    getServices: Actions.getServices,
    getBranches: GlobalAction.getBranches,
  }, dispatch)
}

export default withReducer("dashboardApp", reducers)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Example)));
