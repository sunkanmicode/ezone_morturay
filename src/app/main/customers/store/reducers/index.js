import { combineReducers } from 'redux';
import customer from './customer.reducer';
import services from './services.reducer';
import discounts from './discounts.reducer';
import relatives from './relatives.reducer';
import invoices from './invoices.reducer';
import payments from './payments.reducer';

const reducer = combineReducers({
  customer,
  services,
  discounts,
  relatives,
  invoices,
  payments,
});

export default reducer;
