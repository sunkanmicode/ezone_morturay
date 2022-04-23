import React, { useEffect, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { FuseAnimate } from '@fuse';
import * as Actions from "./../store/actions"
import { Avatar, Card, CardContent, CardMedia, CardHeader } from '@material-ui/core';
import ReleaseViewDialog from './forms/release/ReleaseViewDialog';
import AddDeceasedDocuments from './AddDeceasedDocuments';




function DeceasedDetails(props) {
  

  const { getDeceasedById } = props
  const match = useRouteMatch();
  const deceasedReducer = useSelector(({deceasedApp}) => deceasedApp.deceased);
  const deceased = deceasedReducer.deceased
 

  useEffect(() => {
    getDeceasedById(match.params.id)
  }, [getDeceasedById, match.params.id]);

  if(!deceased){
    return null
  }

  return (
    // <form>
    <div className="p-24">
      <div className="flex items-center justify-between overflow-hidden">
        <div className="flex flex-col">
          <FuseAnimate delay={100}>
            <div className="flex flex-wrap mt-0">
              <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-0 sm:px-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Deceased Information
                  </h3>
                  <h6>
                    {" "}
                    SERIAL NUMBER:
                    <small> DSOHQOOOO{deceased?.id}</small>
                  </h6>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-t border-gray-200 col-span-2">
                    <dl>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          First name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.first_name}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Last Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.last_name}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Other name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.other_name}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Gender
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.gender}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">Age</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.age}
                        </dd>
                      </div>

                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.address}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <Card
                      elevation={0}
                      className="w-192 border border-solid border-grey-lighter"
                    >
                      <CardContent className="flex justify-center">
                        {deceased?.deceased_image ? (
                          <a
                            href={deceased?.deceased_image || "/"}
                            target="_blank"
                            alt=""
                            rel="noopener noreferrer"
                          >
                            <Avatar
                              variant="rounded"
                              src={deceased?.deceased_image}
                              className="w-160 h-160"
                            />
                          </a>
                        ) : (
                          <Avatar
                            src={deceased?.deceased_image}
                            className="w-160 h-160"
                          />
                        )}
                        
                      </CardContent>
                      <CardHeader
                        className="text-center"
                        title="Deceased Image"
                        titleTypographyProps={{ variant: "subtitle2" }}
                      />
                    </Card>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 pt-4 sm:px-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Date of Assertion
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-t border-gray-200 col-span-2">
                    <dl>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Place of death
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.place_of_death}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Date of Assertion
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.dateof_assertion}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Cause of death
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.cause_of_death}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Time
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.time_of_death}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          How was death ascertained?
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.how_was_death_assertained}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <Card
                      elevation={0}
                      className="w-192 border border-solid border-grey-lighter"
                    >
                      {deceased?.supporting_document.split(".").pop() ===
                      "pdf" ? (
                        <CardContent className="text-center">
                          <a
                            href={deceased?.supporting_document || "/"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/images/icons/paper.svg"
                              alt=""
                              className="h-60 w-auto"
                            />
                          </a>
                        </CardContent>
                      ) : (
                        <CardMedia
                          component="a"
                          target="_blank"
                          href={deceased?.supporting_document || "/"}
                          src={
                            deceased?.supporting_document ||
                            "/assets/images/icons/paper.svg"
                          }
                          className="w-full h-192"
                        />
                      )}
                      

                      <CardHeader
                        className="text-center"
                        title="Supporting document"
                        titleTypographyProps={{ variant: "subtitle2" }}
                      />
                    </Card>
                    
                  </div>
                </div>
              </div>

              <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div className="px-4 pt-4 sm:px-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Medical
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-t border-gray-200 col-span-2">
                    <dl>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Name of Hosipital
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.name_of_hospital}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Medical Attendant
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.medical_attendant_name}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-600">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {deceased?.hospital_address}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <Card
                      elevation={0}
                      className="w-192 border border-solid border-grey-lighter"
                    >
                      {deceased?.record_of_death_from_hospital
                        .split(".")
                        .pop() === "pdf" ? (
                        <CardContent className="text-center">
                          <a
                            href={
                              deceased?.record_of_death_from_hospital || "/"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/images/icons/paper.svg"
                              alt=""
                              className="h-60 w-auto"
                            />
                          </a>
                        </CardContent>
                      ) : (
                        <CardMedia
                          component="a"
                          target="_blank"
                          href={deceased?.record_of_death_from_hospital || "/"}
                          image={
                            deceased?.record_of_death_from_hospital ||
                            "/assets/images/icons/paper.svg"
                          }
                          className="w-full h-192"
                        />
                      )}
                      <CardHeader
                        className="text-center"
                        title="Record of death certificate"
                        titleTypographyProps={{ variant: "subtitle2" }}
                      />
                    </Card>
                   
                  </div>
                </div>
              </div>
            </div>
          </FuseAnimate>
        </div>
      </div>
      <ReleaseViewDialog />
      <AddDeceasedDocuments />
    </div>
    // </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDeceasedById: Actions.getDeceasedById
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeceasedDetails);
