import React, { useEffect } from 'react';
import { Icon, IconButton, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"
import { FuseScrollbars, FuseAnimate, FuseUtils } from '@fuse';
import { withRouter, useRouteMatch } from 'react-router-dom';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import converter from "number-to-words"
import moment from "moment"
import _ from "lodash"
import Pdf from "react-to-pdf"

const useStyles = makeStyles(theme => ({
  table: {
    "& td, & th": {
      border: `1px solid ${theme.palette.divider}`
    }
  }
}))

function ReceiptDetails(props) {
  const dispatch = useDispatch();
  const classes = useStyles()
  const match = useRouteMatch();
  const printRef = React.createRef();

  const receipt = useSelector(({receiptsApp}) => receiptsApp.receipts.receipt)

  console.log(receipt, "receipt details")

  useEffect(() => {
    dispatch(Actions.getReceiptById(match.params.id));
  }, [dispatch, match.params.id]);

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,14]
  };

  return (
    <div className='flex flex-col p-24'>
      <FuseAnimate delay={100}>
        <div className='flex flex-wrap mt-8 mb-24 relative'>

          <div className="absolute right-0 top-0 bg-orange-lighter">
            <Pdf targetRef={printRef} filename={`${receipt?.receiptNumber}.pdf`} options={options} x={.4} y={.4} scale={0.92}>
              {({ toPdf }) => 
                <IconButton onClick={toPdf}>
                  <Icon>cloud_download</Icon>
                </IconButton>
              }
            </Pdf>
          </div>

          <div className='w-9/12 mx-auto bg-white overflow-hidden sm:rounded-lg' ref={printRef}>
            <div className='px-4 py-5 sm:px-6'>
              <h1>
                <img
                  className='h-72'
                  src='/assets/images/profile/omega-homes.svg'
                  alt=''
                />
              </h1>
              <h3 className='text-xl leading-6 font-bold text-gray-900'>
                Receipt
              </h3>
              <dl>
                <div className='bg-gray-50 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-bold text-gray-600'>
                    Receipt Number
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    #{receipt?.receiptNumber}
                  </dd>
                </div>
              </dl>
            </div>
            <div className='border-t border-gray-200'>
              <Table className={classes.table} size='small'>
                <TableBody>
                  <TableRow className='h-64'>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Bill to:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {receipt?.billTo}
                          </dd>
                        </div>
                        <div className='bg-white px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Payment date:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {moment(receipt?.created_at).format("Do MMM, YYYY")}
                          </dd>
                        </div>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Payment Method:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {receipt?.paymentMethod}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <div className='flex flex-col space-y-2 bg-blue px-16 py-24 rounded-md text-white text-center'>
                        <span className='text-lg'>Payment Amount</span>
                        <span className='text-6xl font-black'>{FuseUtils.formatCurrency(receipt?.paymentAmount || 0)}</span>
                        <span className='text-sm font-bold'>
                          ({receipt?.paymentAmount ? _.startCase(converter.toWords(receipt?.paymentAmount)) : 0} naira only)
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <FuseScrollbars className='flex-grow overflow-x-auto mb-24'>
              <Table className='min-w-xl' size='small'>
                <TableBody>
                  <TableRow className='h-64'>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Invoice Number:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {receipt?.invoiceNumber}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Invoice Amount:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {FuseUtils.formatCurrency(receipt?.invoiceAmount || 0)}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                  </TableRow>
                  <TableRow className='h-64'>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Invoice Date:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {moment(receipt?.invoiceDate).format("Do MMM, YYYY")}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <dl>
                        <div className='bg-gray-100 px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                          <dt className='text-sm font-bold text-gray-900'>
                            Payment Amount:
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {FuseUtils.formatCurrency(receipt?.paymentAmount || 0)}
                          </dd>
                        </div>
                      </dl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </FuseScrollbars>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

export default withRouter(ReceiptDetails);
