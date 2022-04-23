import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import reducer from '../../../store/reducers';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import AdmissionHeader from "./AdmissionHeader"
import AdmissionToolbar from "./AdmissionToolbar"
import AdmissionForm from "./AdmissionForm"

const styles = (theme) => ({
  layoutRoot: {},
});

function Admission(props){
  const { classes } = props

  return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot,
			}}
			header={
				<AdmissionHeader />
			}
			contentToolbar={
				<AdmissionToolbar />
			}
			content={
				<div className='p-24'>
					<AdmissionForm />
				</div>
			}
		/>
  );
}

const mapStateToProps = ({deceasedApp, auth}) => {
  const { deceased } = deceasedApp
  return {
    searchText: deceased.searchText,
    user: auth.user.data,
  }
}

export default withReducer("deceasedApp", reducer)(withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Admission))));