import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import * as Actions from "./../store/actions"
import { FuseAnimate } from '@fuse';

function ItemDetails(props) {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const itemReducer = useSelector(({inventoryApp}) => inventoryApp.items)
  const item = itemReducer.item

  console.log(item, "item in item details")

  useEffect(() => {
    dispatch(Actions.getItemById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <div>
      <div className='flex items-center justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <FuseAnimate delay={100}>
            <div className='flex flex-wrap mt-8'>
              <div className='w-full bg-white shadow overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Item Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    Details of item
                  </p>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Item name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {item?.item_name}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Item ID
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {item?.item_id}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Unit Price
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {item?.unit_price}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Stock at hand
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {item?.stock_at_hand}
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

export default ItemDetails;
