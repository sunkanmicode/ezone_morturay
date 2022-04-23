import React from 'react';
import { FusePageSimple } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import reducer from '../store/reducers';
import ReportsList from './ReportsList';
import ReportsHeader from './ReportsHeader';

const styles = (theme) => ({
  layoutRoot: {},
});

function Reports(props) {
  const { classes } = props;

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className='px-24'>
          <ReportsHeader />
        </div>
      }
      content={<ReportsList />}
    />
  );
}

// export default withReducer('eCommerceApp', reducer)(Deceased);
export default withStyles(styles, { withTheme: true })(Reports);
