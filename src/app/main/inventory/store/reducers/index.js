import { combineReducers } from 'redux';
import services from './services.reducer';
import items from './items.reducer';
import discounts from './discounts.reducer';

const reducer = combineReducers({
  services,
  items,
  discounts,
});

export default reducer;
