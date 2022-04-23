import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import { FusePageCarded } from '@fuse';
import RelativesHeader from './relatives/RelativesHeader';
import RelativeHeader from './relative/RelativeHeader';
import RelativeToolbar from './relative/RelativeToolbar';
import RelativesList from './relatives/RelativesList';
import RelativeDetails from './relative/RelativeDetails';
// import CreateCustomer from './new-customer/CreateCustomer';

const styles = (theme) => ({
  layoutRoot: {},
});

class RelativesApp extends Component {

  componentDidMount() {
    this.props.getRelatives()
  }

  render() {
    const { match } = this.props;

    // if (match.params.id === 'new') {
    //   return <CreateCustomer />;
    // }

    return (
      <FusePageCarded
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={match.params.id ? <RelativeHeader /> : <RelativesHeader />}
        contentToolbar={match.params.id ? <RelativeToolbar /> : null}
        content={
          <div className='p-16 sm:p-24 w-full'>
            {match.params.id ? <RelativeDetails /> : <RelativesList />}
          </div>
        }
        innerScroll
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRelatives: Actions.getRelatives
  }, dispatch)
}

export default withReducer("relativesApp", reducer)(withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(RelativesApp)));
