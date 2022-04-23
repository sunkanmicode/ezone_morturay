import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from "./../store/reducers"
import { FusePageCarded } from '@fuse';
import ReportsHeader from './ReportsHeader';
import ReportsList from './ReportsList';
import ReportDetails from './ReportDetails';
import ReportsToolbar from './ReportsToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

class ReportsApp extends Component {
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
        contentToolbar={
          this.props.match.params.id ? <ReportsToolbar /> : <ReportsToolbar />
        }
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

export default withReducer("reportsApp", reducer)(withStyles(styles, { withTheme: true })(ReportsApp));
