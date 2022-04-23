import { combineReducers } from 'redux';
import customer from './customer.reducer';
import invoices from './invoices.reducer';
import services from './services.reducer';
import relatives from './relatives.reducer';

const reducer = combineReducers({
  customer,
  invoices,
  services,
  relatives,
});

export default reducer;
