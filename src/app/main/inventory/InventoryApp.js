import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import DeceasedHeader from './deceased/DeceasedHeader';
import DeceasedList from './deceased/DeceasedList';
import DeceasedDetails from './deceased/DeceasedDetails';
import DeceasedToolbar from './deceased/DeceasedToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

class InventoryApp extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<DeceasedHeader />}
        contentToolbar={
          this.props.match.params.id ? <DeceasedToolbar /> : <DeceasedToolbar />
        }
        content={
          <div className='p-24'>
            {this.props.match.params.id ? (
              <DeceasedDetails />
            ) : (
              <DeceasedList />
            )}
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(InventoryApp);
