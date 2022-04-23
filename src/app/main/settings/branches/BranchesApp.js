import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import * as appActions from '../../../store/actions';
import { FusePageCarded } from '@fuse';
import BranchesHeader from './BranchesHeader';
import BranchesList from './BranchesList';
import BranchDetails from './BranchDetails';
import { bindActionCreators } from 'redux';

const styles = (theme) => ({
  layoutRoot: {},
});

class BranchesApp extends Component {
  componentDidMount() {
    this.props.getBranches();
    this.props.getBanks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.getBranches();
    }
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
        header={<BranchesHeader />}
        content={
          <div className='w-full px-24'>
            {this.props.match.params.id ? <BranchDetails /> : <BranchesList />}
          </div>
        }
        innerScroll
      />
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
      getBranches: appActions.getBranches,
      getBanks: Actions.getBanks,
    },
    dispatch
  );
};

export default withReducer(
  'settingsApp',
  reducer
)(
  withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(BranchesApp)
  )
);
