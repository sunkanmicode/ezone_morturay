import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import withReducer from 'app/store/withReducer';
import reducers from './../store/reducers';
import * as Actions from './../store/actions';
import * as appActions from './../../../store/actions';
import { FusePageCarded } from '@fuse';
import VaultsHeader from './VaultsHeader';
import VaultHeader from './vault/VaultHeader';
import VaultsList from './VaultsList';
import VaultDetails from './vault/VaultDetails';
import VaultToolbar from './vault/VaultToolbar';

const styles = (theme) => ({
  layoutRoot: {},
});

class VaultsApp extends Component {

  componentDidMount() {
    this.props.getVaults()
    this.props.getPlots()
    this.props.getBranches()
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
            match.params.id ? <VaultHeader /> : <VaultsHeader />
          }
          contentToolbar={
            match.params.id ? <VaultToolbar /> : null
          }
          content={
            <div className='w-full'>
              {match.params.id ? <VaultDetails /> : <VaultsList />}
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
    getVaults: Actions.getVaults,
    getPlots: Actions.getPlots,
    getBranches: appActions.getBranches,
  }, dispatch)
}

export default withReducer(
  'vaultsApp',
  reducers
)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(VaultsApp)));
