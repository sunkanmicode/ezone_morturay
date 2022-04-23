import React, {useEffect} from 'react';
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { FuseAnimate, FuseUtils } from '@fuse';
import * as Actions from "../../store/actions"
import { types } from "./../Services"

function ServiceDetails(props) {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const branches = useSelector(({ezone}) => ezone.branches.branches)
  const servicesReducer = useSelector(({inventoryApp}) => inventoryApp.services)
  const service = servicesReducer.service

  useEffect(() => {
    dispatch(Actions.getServiceById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <div className="p-24">
      <div className='flex items-center justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <FuseAnimate delay={100}>
            <div className='flex flex-wrap mt-0'>
              <div className='w-full bg-white overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-2 sm:px-6'>
                  <h3 className='text-lg leading-6 font-bold text-gray-900'>
                    Product / Service Details
                  </h3>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Product/Service name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.service_name}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Product/Service type
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {_.find(types, {id: Number(service?.service_type)})?.label}
                      </dd>
                    </div>
                    <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Amount
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {FuseUtils.formatCurrency(service?.amount || 0)}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Created by
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.created_by}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Branch
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {_.find(branches, {id: service?.branch_id})?.name}
                      </dd>
                    </div>
                    <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Admission
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.is_admisson? "Required" : "Not required"}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>Customer image</dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.is_customer_image? "Required" : "Not required"}
                      </dd>
                    </div>

                    <div className='bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-600'>
                        Customer signature
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {service?.request_customer_signature? "Required" : "Not required"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
