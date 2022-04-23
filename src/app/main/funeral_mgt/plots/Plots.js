import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import withReducer from 'app/store/withReducer';
import reducers from './../store/reducers';
import * as Actions from './../store/actions';
import { FusePageCarded } from '@fuse';
import PlotsHeader from './PlotsHeader';
import PlotsList from './PlotsList';
import PlotToolbar from './plot/PlotToolbar';
import PlotHeader from './plot/PlotHeader';
import PlotDetails from './plot/PlotDetails';
import PlotDialog from './PlotDialog';

const styles = (theme) => ({
  layoutRoot: {},
});

class PlotsApp extends Component {

  componentDidMount() {
    this.props.getPlots()
  }

  render() {
    const { classes, match } = this.props;

    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
            root: classes.layoutRoot,
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          }}
          header={
            match.params.id? <PlotHeader /> : <PlotsHeader />
          }
          contentToolbar={
            match.params.id ? <PlotToolbar /> : null
          }
          content={
            <div className='w-full'>
              {match.params.id? <PlotDetails /> : <PlotsList />}
            </div>
          }
          innerScroll
        />

        <PlotDialog />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      getPlots: Actions.getPlots
  }, dispatch)
}

export default withReducer(
  'plotsApp',
  reducers
)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(PlotsApp)));
