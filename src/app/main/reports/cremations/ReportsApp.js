import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as appActions from './../../../store/actions';
import { FusePageCarded } from '@fuse';
import ReportsHeader from './ReportsHeader';
import ReportsList from './ReportsList';
import ReportDetails from './ReportDetails';

const styles = (theme) => ({
  layoutRoot: {},
});

class ReportsApp extends Component {
  componentDidMount() {
    this.props.getBranches();
  }

  render() {
    const { classes } = this.props;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<ReportsHeader />}
        content={
          <div className='p-24 w-full'>
            {this.props.match.params.id ? <ReportDetails /> : <ReportsList />}
          </div>
        }
        innerScroll
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBranches: appActions.getBranches,
    },
    dispatch
  );
};

export default withReducer(
  'reportsApp',
  reducer
)(
  withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(ReportsApp)
  )
);
