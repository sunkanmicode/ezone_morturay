import React from 'react';
import {useSelector} from "react-redux"
import { Widget1, Widget2, Widget3 } from './widgets';
import RegistrationsList from './RegistrationsList';

function DashboardContent(props) {
  const customerReducer = useSelector(({dashboardApp}) => dashboardApp.customer.customers)
  const servicesReducer = useSelector(({dashboardApp}) => dashboardApp.services.services)
  const invoicesReducer = useSelector(({dashboardApp}) => dashboardApp.invoices.invoices)

  return (
    <div className='w-full'>
      <div className='flex md:flex-row flex-col justify-between md:space-x-16 space-y-16 md:space-y-0'>
        <Widget1 count={customerReducer.count} />
        <Widget2 count={invoicesReducer.totalItems}  />
        <Widget3 count={servicesReducer.count}  />
      </div>

      <RegistrationsList />
    </div>
  );
}

export default DashboardContent;
