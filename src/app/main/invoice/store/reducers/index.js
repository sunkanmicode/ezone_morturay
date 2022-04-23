import { combineReducers } from 'redux';
import invoices from './invoices.reducer';
import customer from './customer.reducer';
import services from './services.reducer';
import discounts from './discounts.reducer';
// import user from './user.reducer';

const reducer = combineReducers({
  invoices,
  customer,
  services,
  discounts,
  // user,
});

export default reducer;
