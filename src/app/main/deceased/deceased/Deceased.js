import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FusePageSimple } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from "./../store/actions";
import * as appActions from "app/store/actions";
import DeceasedList from './DeceasedList';
import DeceasedHeader from './DeceasedHeader';

const styles = (theme) => ({
  layoutRoot: {},
});

// function Deceased(props) {
//   const { classes } = props;


//   return (
//     <FusePageSimple
//       classes={{
//         root: classes.layoutRoot,
//       }}
//       header={
//         <div className='px-24'>
//           <DeceasedHeader />
//         </div>
//       }
//       content={<DeceasedList />}
//     />
//   );
// }


// export default withReducer('deceasedApp', reducer)(withStyles(styles, { withTheme: true })(Deceased));

class Deceased extends Component {
  componentDidMount() {
    this.props.getAllDeceased()
    this.props.getBranches();
  }

  render() {
    const { classes, match } = this.props;

      return (
        <FusePageSimple
          classes={{
            root: classes.layoutRoot,
          }}
          header={
            <div className='px-24'>
              <DeceasedHeader />
            </div>
          }
          content={<DeceasedList />}
        />
      );
    }
  }


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllDeceased: Actions.getAllDeceased,
      getBranches: appActions.getBranches,
    },
    dispatch
  );
};

export default withReducer(
  "Deceased",
  reducer
)(
  withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(Deceased)
  )
);

