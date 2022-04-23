import React, { useEffect } from 'react';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom";
import * as Actions from "../store/actions";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
} from '@material-ui/core';
import { FuseAnimate } from '@fuse';

const RelativeDetails = (props) => {
  const { getRelativeById } = props
  const relativesReducer = useSelector(({relativesApp}) => relativesApp.relatives);
  const relative = relativesReducer.relative
  const match = useRouteMatch();

  useEffect(() => {
    getRelativeById(match.params.id)
  }, [getRelativeById, match.params.id]);

  if(!relative) {
    return null
  }

  return (
    <div className=''>
      <div className='bg-white overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Applicant Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Personal details and application.
          </p>
        </div>
        <div className='border-t border-gray-200 mb-24'>
          <dl>
            <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Full name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.first_name}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Other name
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.other_name}
              </dd>
            </div>
            <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Last name
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.last_name}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.email}
              </dd>
            </div>
            <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Phone Number
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.phone_number}
              </dd>
            </div>
            
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Address</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.address}
              </dd>
            </div>
            <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Relationship with Deceased
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {relative?.relationship_with_deceased}
              </dd>
            </div>
          </dl>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-medium text-gray-900'
            >
              Deceased
            </Typography>
          </FuseAnimate>

          <Table className='simple mt-16'>
            <TableHead>
              <TableRow>
                <TableCell>Deceased Name</TableCell>
                <TableCell>Reference ID</TableCell>
                <TableCell align='right'>Age</TableCell>
                <TableCell align='right'>Place of Death</TableCell>
                <TableCell align='right'>Date of Death</TableCell>
                <TableCell align='right'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Emah Thompson</TableCell>
                <TableCell>00000789</TableCell>
                <TableCell align='right'>Age</TableCell>
                <TableCell align='right'>Lagos</TableCell>
                <TableCell align='right'>3rd July 2019</TableCell>
                <TableCell align='right'>Release</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-medium text-gray-900'
            >
              Invoice Summary
            </Typography>
          </FuseAnimate>

          <Table className='simple mt-16'>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>No. of Items</TableCell>
                <TableCell align='right'>Invoice Date</TableCell>
                <TableCell align='right'>Bill To</TableCell>
                <TableCell align='right'>Total Amount</TableCell>
                <TableCell align='right'>Amount Due</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>INV/0000001</TableCell>
                <TableCell>8</TableCell>
                <TableCell align='right'>3rd Jul 2019</TableCell>
                <TableCell align='right'>John Well</TableCell>
                <TableCell align='right'>NGN 600</TableCell>
                <TableCell align='right'>NGN 0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
