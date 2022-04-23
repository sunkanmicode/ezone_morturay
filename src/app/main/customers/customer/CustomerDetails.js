import React, { useEffect } from 'react';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useRouteMatch, Link } from "react-router-dom";
import * as Actions from "./../store/actions";
import moment from "moment";
import _ from "lodash";
import clsx from "clsx"
import {
  Avatar,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"
import { FuseAnimate, FuseUtils } from '@fuse';
import { Alert } from '@material-ui/lab';
import CustomerDialog from "./CustomerDialog"

const useStyles = makeStyles(theme => ({
  table: {
    "& .MuiTableRow-root": {
      borderLeft: `4px solid ${theme.palette.divider}`
    },
    "& .MuiTableCell-head": {
      fontWeight: theme.typography.fontWeightBold,
    }
  },
  cardMedia: {
    height: 200,
    backgroundSize: "cover"
  }
}))

const statuses = ['RELEASED', 'ADMITTED']

const CustomerDetails = (props) => {
  const { getCustomerById } = props
  const classes = useStyles()
  const branches = useSelector(({ezone}) => ezone.branches.branches);
  const customerReducer = useSelector(({customerApp}) => customerApp.customer);
  const customer = customerReducer.customer
  const match = useRouteMatch();

  // console.log(customer, "customer")

  useEffect(() => {
    getCustomerById(match.params.id)
  }, [getCustomerById, match.params.id]);

  return (
    <div className='p-16 sm:p-24'>
      <div className='bg-white overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-0 sm:px-6'>
          <h3 className='text-lg leading-6 font-bold text-gray-900'>
            Customer Information
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className='border-t border-gray-200 mb-24 col-span-2'>
            <dl>
              <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>Full name</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.first_name}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Other name
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.other_name}
                </dd>
              </div>
              <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Last name
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.last_name}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Email address
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.email}
                </dd>
              </div>
              <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Phone Number
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.phone_number}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>Address</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.address}
                </dd>
              </div>
              <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Relationship with Deceased
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {customer?.relationship_with_deceased}
                </dd>
              </div>
              <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-bold text-gray-600'>
                  Branch
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                  {_.find(branches, {id: customer?.branch_id})?.name}
                </dd>
              </div>
            </dl>
          </div>
          <div className='border-t border-gray-200 mb-24'>
            <Card className="w-192 border border-grey-light border-solid text-center mb-16" elevation={0}>
              <CardContent className="flex justify-center">
                {customer?.customer_image
                  ? <a href={customer?.customer_image || "/"} target="_blank" alt="" rel="noopener noreferrer">
                      <Avatar variant="rounded" src={customer?.customer_image} className="w-160 h-160" />
                    </a>
                  : <Avatar variant="rounded" className="w-160 h-160" />
                }
              </CardContent>
              <CardHeader className="text-center" title="Customer Image" titleTypographyProps={{variant: "subtitle2"}} />
            </Card>
            <Card className="w-192 border border-grey-light border-solid text-center" elevation={0}>
              {customer?.signature ?
                (
                  <CardMedia
                    component="a" 
                    target="_blank"
                    href={customer?.signature}
                    image={customer?.signature} 
                    className={classes.cardMedia} 
                  />
                ) :
                (
                  <CardContent>
                    <img src="/assets/images/icons/paper.svg" alt="" className="h-64 w-auto" />
                  </CardContent>
                )
              }
              <CardHeader className="text-center" title="Signature" titleTypographyProps={{variant: "subtitle2"}} />
            </Card>
          </div>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-bold text-gray-900'
            >
              Deceased
            </Typography>
          </FuseAnimate>

          <Table className={clsx(classes.table, 'simple mt-16')}>
            <TableHead>
              <TableRow>
                <TableCell>Deceased Name</TableCell>
                <TableCell>Reference ID</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Place of Death</TableCell>
                <TableCell>Date of Death</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer?.deceased.map(dsc => 
              <TableRow key={dsc.id}>
                <TableCell><Link to={`/deceased/${dsc.id}`}>{dsc.first_name}</Link></TableCell>
                <TableCell>{dsc.id}</TableCell>
                <TableCell>{dsc.age}</TableCell>
                <TableCell>{dsc.place_of_death}</TableCell>
                <TableCell>{moment(dsc.dateof_assertion).format("Do MMMM, YYYY")}</TableCell>
                <TableCell>{statuses[dsc.status]}</TableCell>
              </TableRow>
              )}

              {customer?.deceased?.length === 0 &&
                <TableRow>
                  <TableCell colSpan={6}>
                    <Alert severity="info">No deceased has been admitted by this customer</Alert>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>

        <div className='mb-24 px-4 py-5 sm:px-6'>
          <FuseAnimate>
            <Typography
              variant='subtitle1'
              className='text-lg leading-6 font-bold text-gray-900'
            >
              Invoice Summary
            </Typography>
          </FuseAnimate>

          <Table className={clsx(classes.table, 'simple mt-16')}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>No. of Products/Services</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Bill To</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Amount Due</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {customer?.invoice.map(inv => 
              <TableRow key={inv.id}>
                <TableCell><Link to={`/invoices/${inv.id}`}>{inv.invoice_number}</Link></TableCell>
                <TableCell>{inv?.service?.length}</TableCell>
                <TableCell>{moment(inv.invoice_date).format("Do MMMM, YYYY")}</TableCell>
                <TableCell>{inv.customer?.firstName}</TableCell>
                <TableCell>{FuseUtils.formatCurrency(inv.total_amount)}</TableCell>
                <TableCell>{FuseUtils.formatCurrency(inv.amount_due)}</TableCell>
              </TableRow>
            )}

            {customer?.invoice?.length === 0 &&
              <TableRow>
                <TableCell colSpan={6}>
                  <Alert severity="info">No Invoice has been generated for this customer</Alert>
                </TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </div>
      </div>

      <CustomerDialog />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCustomerById: Actions.getCustomerById,
    payForInvoice: Actions.payForInvoice,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(CustomerDetails);
