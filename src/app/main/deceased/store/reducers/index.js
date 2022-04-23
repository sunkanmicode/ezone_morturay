import { combineReducers } from 'redux';
import deceased from './deceased.reducer';
import services from './services.reducer';
import discounts from './discounts.reducer';
import relatives from './relatives.reducer';

const reducer = combineReducers({
  deceased,
  services,
  discounts,
  relatives,
});

export default reducer;
