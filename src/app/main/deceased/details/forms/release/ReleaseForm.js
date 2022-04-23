import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouteMatch } from "react-router-dom";
import {
  Button,
  MenuItem,
  TextField,
  IconButton,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import { FuseAnimate } from "@fuse";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as Actions from "../../../store/actions";
import reducer from "../../../store/reducers";
import { connect } from "react-redux";
import ReactToPdf from "react-to-pdf";
import withReducer from "app/store/withReducer";


const defaultFormState = {
  address: "",
  address_of_collector: "",
  age: "",
  gender: "",
  branch_id: "",
  corps_collected_by: "",
  corpse_recieved_by_name: "",
  corpse_recieved_by_signature: "",
  corpse_released_by_name: "",
  corpse_released_by_signature: "",
  date_admitted: null,
  death_certified_by: "",
  deceased_id: 30,
  destination_of_corpse: "",
  discharged: null,
  name_of_deceased: "",
  place_of_death: "",
  relationship_with_deceased: "",
};

const relationships = [
  "Brother",
  "Sister",
  "Mother",
  "Father",
  "Son",
  "Daughter",
  "Others",
].map((r) => ({
  label: r,
  value: r,
}));

function ReleaseForm(props) {
  const { loading, user, deceased, bankDetailsByBranch, branches } = props;
  const [selectedBranch, setSelectedBranch] = React.useState({});
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const ref = React.createRef();

  const { handleChange, form, setForm } = useForm({
    ...defaultFormState,
  });


  useEffect(() => {
    dispatch(Actions.getDeceasedById(match.params.id));
    dispatch(Actions.getReleasedByDeceased_id(match.params.id));
    //just added
		// dispatch(Actions.getReleasedFormById(match.params.id));
  }, [dispatch, match.params.id]);

  



  useEffect(() => {
    if (deceased) {
      setForm((state) => ({
        ...defaultFormState,
        ...state,
        deceased_id: deceased.id,
        name_of_deceased: deceased.first_name + " " + deceased.last_name,
        place_of_death: deceased.place_of_death,
        address: deceased.address,
        age: deceased.age,
        gender: deceased.gender,
        death_certified_by: deceased.name_of_hospital,
        date_admitted: deceased.dateof_assertion,
        
      }));
    }
  }, [deceased, setForm]);
 

  useEffect(() =>  {
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
  }, [user])


  useEffect(() => {
   
    if (deceased?.customer?.branchId) {
     const selectedBranch = branches.find(branch =>  branch.id === deceased.customer?.branchId);
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

  const handleDateChange = (name) => (date) => {
    setForm({ ...form, [name]: moment(date).format("YYYY-MM-DDTHH:mm:ss") });
  };

  const handleSubmit = () => {
    dispatch(Actions.addReleaseForm(form, form.deceased_id));
   
  };


  const options = {
    orientation: "portrait",
    unit: "in",
    format: [9, 14],
  };

  return (
    <div className="flex flex-col bg-white p-24">
      <FuseAnimate delay={100}>
        <div className="flex flex-col flex-wrap mt-0 mb-24 relative">
          <div className="absolute right-0 top-0 bg-orange-lighter">
            <ReactToPdf
              targetRef={ref}
              filename={`Corpse Release of ${form["name_of_deceased"]}`}
              options={options}
              x={0.4}
              y={0.4}
              scale={0.92}
            >
              {({ toPdf }) => (
                <IconButton disabled={false} onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              )}
            </ReactToPdf>
          </div>

          <div
            className="w-9/12 mx-auto overflow-hidden sm:rounded-lg"
            ref={ref}
          >
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
                    {/* <dt className='capitalize'>
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
                      <hr className="my-16 border-0 border-t border-grey-darkest" />
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
              {/* <p className='text-xs text-gray-600'>DSOHQ00001850</p> */}
              <h1 className="text-xl leading-6 uppercase font-bold italic text-gray-900">
                Corpse Release Form
              </h1>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Name of deceased
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="name_of_deceased"
                      value={form.name_of_deceased}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Address of deceased
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Age of deceased
                  </dt>
                  <dd className="mt-1 sm:grid sm:grid-cols-2 gap-x-8 col-span-2 text-sm text-gray-900 sm:mt-0">
                    <TextField
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      margin="none"
                      fullWidth
                    />
                    <div className="w-full flex items-end space-x-2">
                      <span className="text-sm font-bold text-gray-600">
                        Sex
                      </span>
                      <TextField
                        select
                        name="sex"
                        value={form.gender}
                        margin="none"
                        fullWidth
                      >
                        <MenuItem value="">Select Sex</MenuItem>
                        {["Male", "Female"].map((sex) => (
                          <MenuItem key={sex} value={sex}>
                            {sex}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Place of Death
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="place_of_death"
                      value={form.place_of_death}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>

                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 items-end sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Death certified by
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="death_certified_by"
                      value={form.death_certified_by}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Date Admitted
                  </dt>
                  <dd className="flex space-x-2 sm:col-span-2">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        id="date-admitted"
                        value={form.date_admitted}
                        onChange={handleDateChange("date_admitted")}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <div className="flex items-end space-x-2">
                      <span className="text-sm font-bold text-gray-600">
                        Discharge
                      </span>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          format="dd/MM/yyyy"
                          id="date-discharged"
                          value={form.discharged}
                          onChange={handleDateChange("discharged")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Corpse collected by
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="corps_collected_by"
                      value={form.corps_collected_by}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Address of collector
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="address_of_collector"
                      value={form.address_of_collector}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Relationship with deceased
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      select
                      name="relationship_with_deceased"
                      value={form.relationship_with_deceased}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value="">
                        Select relationship with deceased
                      </MenuItem>
                      {relationships.map((rel) => (
                        <MenuItem key={rel.value} value={rel.value}>
                          {rel.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-end sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Destination of Corpse
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <TextField
                      name="destination_of_corpse"
                      value={form.destination_of_corpse}
                      onChange={handleChange}
                      fullWidth
                    />
                  </dd>
                </div>
                <div className="bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Corpse Received By
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="px-1 py-1 flex justify-between items-end space-x-4">
                      <span className="text-sm font-bold text-gray-600">
                        Name
                      </span>
                      <TextField
                        name="corpse_recieved_by_name"
                        value={form.corpse_recieved_by_name}
                        onChange={handleChange}
                        fullWidth
                      />
                    </div>
                    <div className="px-1 py-1 flex justify-between items-end space-x-4 sm:px-0">
                      <span className="text-sm font-bold text-gray-600">
                        Signature
                      </span>
                      <TextField
                        name="corpse_recieved_by_signature"
                        value={form.corpse_recieved_by_signature}
                        onChange={handleChange}
                        fullWidth
                      />
                    </div>
                  </dd>
                </div>
                <div className="bg-white px-1 py-1 sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-0">
                  <dt className="text-sm font-bold text-gray-600">
                    Corpse Released By
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="px-1 py-1 flex justify-between items-end space-x-4 sm:px-0">
                      <span className="text-sm font-bold text-gray-600">
                        Name
                      </span>
                      <TextField
                        name="corpse_released_by_name"
                        value={form.corpse_released_by_name}
                        onChange={handleChange}
                        fullWidth
                      />
                    </div>
                    <div className="px-1 py-1 flex justify-between items-end space-x-4 sm:px-0">
                      <span className="text-sm font-bold text-gray-600">
                        Signature
                      </span>
                      <TextField
                        name="corpse_released_by_signature"
                        value={form.corpse_released_by_signature}
                        onChange={handleChange}
                        fullWidth
                      />
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="flex justify-end items-center space-x-8">
                <p className="text-xs italic text-orange-darker">
                  {deceased?.deceasedInvoiceStatus !== 1 && (
                    <span>
                      Deceased can only be released after
                      <br /> payment have been made fully
                    </span>
                  )}
                </p>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    loading ? loading : !deceased?.deceasedInvoiceStatus === 1
                  }
                  endIcon={loading && <CircularProgress size={16} />}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

const mapStateToProps = ({ deceasedApp, auth }) => {
  const { deceased } = deceasedApp;
  return {
    loading: deceased.loading,
    searchText: deceased.searchText,
    deceased: deceased.deceased,
    bankDetailsByBranch: deceased.bankDetailsByBranch,
    user: auth.user.data,
    branches: deceased.branches,
  };
};

export default withReducer(
  "deceasedApp",
  reducer
)(withRouter(connect(mapStateToProps)(ReleaseForm)));
