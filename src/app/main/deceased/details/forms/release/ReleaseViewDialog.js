import React, { useCallback, useEffect } from "react";
import { FuseAnimate } from "@fuse";
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import { useForm } from "@fuse/hooks";
import {
  Icon,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../store/actions";
import ReactToPdf from "react-to-pdf";



function ReleaseViewDialog(props) {
  const [selectedBranch, setSelectedBranch] = React.useState({});
  const dispatch = useDispatch();

  
  const match = useRouteMatch();

  const history = useHistory();
  const ref = React.createRef();
  const releaseFormDialog = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.releaseFormDialog
  );
  const deceased = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.deceased
  );
  const user = useSelector(({ auth }) => auth.user.data);

  const bankDetailsByBranch = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.bankDetailsByBranch
  );

  const branches = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.branches
  );



  // get  release form
   const releaseForm = useSelector(
     ({ deceasedApp }) => deceasedApp.deceased.summaryReleased
   );

  //  console.log(deceased, "deceased232");

  //  console.log({releaseForm,releaseFormDialog}, 'releaseForm232');
  

  const options = {
    orientation: "portrait",
    unit: "in",
    format: [9, 14],
  };

  useEffect(() => {
    (async () => {
      try {
        if (user?.organisation?.id) {
          await dispatch(
            Actions.getBranches({
              orgId: user?.organisation?.id,
            })
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (deceased?.customer?.branchId) {
      const selectedBranch = branches.find(
        (branch) => branch.id === deceased.customer?.branchId
      );
      setSelectedBranch(selectedBranch);
    }
  }, [deceased, branches]);

  useEffect(() => {
    (async () => {
      try {
        if (deceased.customer?.branchId) {
          await dispatch(
            Actions.getBankDetailsByBranch({
              branchId: deceased.customer?.branchId,
            })
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [deceased]);

  const bankDetails = [...bankDetailsByBranch].map((bankDetail, index) => {
    return (
      <div key={index} className="text-red font-bold">
        <dt>{bankDetail?.accountName}</dt>
        <dt>{bankDetail?.bank?.name}</dt>
        <dt>{bankDetail?.accountNumber}</dt>
        <dt>
          <hr className="my-16 border-0 border-t border-grey-darkest" />
        </dt>
      </div>
    );
  });

  // get REleased by Deceased id.

  useEffect(() => {
    dispatch(Actions.getReleasedByDeceased_id(match.params.id));
    dispatch(Actions.getReleasedFormById(match.params.id));
    dispatch(Actions.getReleasedForms());

  }, [dispatch, match.params.id]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (releaseFormDialog.props.open) {
     
    
    }
  }, [releaseFormDialog.props.open]);

  function closeComposeDialog() {
    dispatch(Actions.closeReleaseFormDialog());
    history.push(`/deceased/${deceased?.id}`);
  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...releaseFormDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex justify-between">
          <Typography variant="subtitle1" color="inherit">
            Release Form Summary
          </Typography>
          <div className="flex items-center" aria-label="Toggle star">
            <FuseAnimate animation="transition.expandIn" delay={100}>
              <IconButton color="inherit" onClick={() => {}}>
                <Icon>mail</Icon>
              </IconButton>
            </FuseAnimate>
            <FuseAnimate animation="transition.expandIn" delay={100}>
              <ReactToPdf
                targetRef={ref}
                filename={`${releaseFormDialog.data?.nameOfDeceased}.pdf`}
                options={options}
                x={0.1}
                y={0.1}
                scale={0.94}
              >
                {({ toPdf }) => (
                  <IconButton
                    color="inherit"
                    disabled={!releaseFormDialog.data}
                    onClick={toPdf}
                  >
                    <Icon className="text-white">print</Icon>
                  </IconButton>
                )}
              </ReactToPdf>
            </FuseAnimate>
          </div>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: "p-24" }}>
        <FuseAnimate delay={100}>
          <div className="flex flex-wrap mt-0 mb-24" ref={ref}>
            <div className="w-10/12 mx-auto bg-white overflow-hidden sm:rounded-lg">
              <div className="flex justify-between px-4 py-0 sm:px-6">
                <h1>
                  <img
                    className="h-96"
                    src="/assets/images/profile/omega-homes.svg"
                    alt=""
                  />
                </h1>
                <div>
                  <dl className="space-y-16 text-right text-xs">
                    <div>
                      {/*  <dt className='capitalize'>
                        {user.organisation?.city} Location
                      </dt> */}
                      <dt>{user.organisation?.companyName}</dt>
                      <dt>{selectedBranch?.name} Branch</dt>
                      <dt>{selectedBranch?.address}</dt>
                      {/* <dt>{user.organisation?.address}</dt>
                      <dt>
                        {user.organisation?.city}, {user.organisation?.state}
                      </dt>
                      <dt>{user.organisation?.country}</dt> */}
                      <dt>
                        <div className="space-x-8">
                          <span>{user.organisation?.phoneNumber}</span>
                          <span>{user.organisation?.contactPersonPhone}</span>
                          <span>{user.organisation?.contactPersonTel}</span>
                        </div>
                      </dt>
                      <dt>{user.organisation?.emailAddress}</dt>
                      <dt>
                        <hr className="my-16 border-0 border-t border-solid border-grey-light" />
                      </dt>
                      {!Boolean(bankDetailsByBranch.length) ? (
                        <dt>No bank info</dt>
                      ) : (
                        bankDetails
                      )}
                    </div>
                    <div className="text-gray-600">
                      <dt>{moment().format("dddd, MMMM Do, YYYY")}</dt>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="text-center">
                <h2 className="uppercase text-lg italic text-gray-900">
                  Release Form
                </h2>
              </div>

              <div className="p-24 border border-solid border-grey-light">
                <dl>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Name of deceased
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.nameOfDeceased
                        ? releaseFormDialog?.data?.nameOfDeceased
                        : releaseForm?.nameOfDeceased}
                        
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">Age</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.age
                        ? releaseFormDialog?.data?.age
                        : releaseForm?.age}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.gender
                        ? releaseFormDialog?.data?.gender
                        : releaseForm?.gender}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Place of death
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.placeOfDeath
                        ? releaseFormDialog?.data?.placeOfDeath
                        : releaseForm?.placeOfDeath}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Death certified by
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.deathCertifiedBy
                        ? releaseFormDialog?.data?.deathCertifiedBy
                        : releaseForm?.deathCertifiedBy}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Date admitted
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.dateAdmitted
                        ? moment(releaseFormDialog?.data?.dateAdmitted).format(
                            "Do MMM, yyyy"
                          )
                        : moment(releaseForm?.dateAdmitted).format(
                            "Do MMM, yyyy"
                          )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Date discharged
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.discharged
                        ? moment(releaseFormDialog?.data?.discharged).format("Do MMM, yyyy")
                        : moment(releaseForm?.discharged).format("Do MMM, yyyy")}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Corps collected by
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.corpsCollectedBy
                        ? releaseFormDialog?.data?.corpsCollectedBy
                        : releaseForm?.corpsCollectedBy}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Address of collector
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.addressOfCollector
                        ? releaseFormDialog?.data?.addressOfCollector
                        : releaseForm?.addressOfCollector}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Relationship with deceased
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.relationshipWithDeceased
                        ? releaseFormDialog?.data?.relationshipWithDeceased
                        : releaseForm?.relationshipWithDeceased}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Destination of corpse
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.destinationOfCorpse
                        ? releaseFormDialog?.data?.destinationOfCorpse
                        : releaseForm?.destinationOfCorpse}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Corpse recieved by —{" "}
                      <em className="text-gray-800">Name</em>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.corpseRecievedByName
                        ? releaseFormDialog?.data?.corpseRecievedByName
                        : releaseForm?.corpseRecievedByName}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Corpse recieved by —{" "}
                      <em className="text-gray-800">Signature</em>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.corpseRecievedBySignature
                        ? releaseFormDialog?.data?.corpseRecievedBySignature
                        : releaseForm?.corpseRecievedBySignature}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Corpse released by —{" "}
                      <em className="text-gray-800">Name</em>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.corpseReleasedByName
                        ? releaseFormDialog?.data?.corpseReleasedByName
                        : releaseForm?.corpseReleasedByName}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold text-gray-600">
                      Corpse released by —{" "}
                      <em className="text-gray-800">Signature</em>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {releaseFormDialog?.data?.corpseReleasedBySignature
                        ? releaseFormDialog?.data?.corpseReleasedBySignature
                        : releaseForm?.corpseReleasedByName}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col space-y-1 mt-16 text-red font-bold uppercase text-xs">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </FuseAnimate>
      </DialogContent>

      <DialogActions className="pr-24 justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={closeComposeDialog}
          type="submit"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReleaseViewDialog;
