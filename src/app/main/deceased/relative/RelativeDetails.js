import React, { useEffect } from 'react';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom";
import * as Actions from "../store/actions";

const RelativeDetails = (props) => {
  const { getRelativeById } = props
  const relativesReducer = useSelector(({deceasedApp}) => deceasedApp.relatives);
  const relative = relativesReducer.relative
  const match = useRouteMatch();

  useEffect(() => {
    getRelativeById(match.params.relativeId)
  }, [getRelativeById, match.params.relativeId]);

  return (
    <div className=''>
      <div className='bg-white overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-0 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Relative Information
          </h3>
        </div>
        <div className='border-t border-gray-200 mb-24'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>Full name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.first_name}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                Other name
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.other_name}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                Last name
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.last_name}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.email}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                Phone Number
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.phone_number}
              </dd>
            </div>
            
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>Address</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.address}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-600'>
                Relationship with Deceased
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.relationship_with_deceased}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRelativeById: Actions.getRelativeById
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(RelativeDetails);
