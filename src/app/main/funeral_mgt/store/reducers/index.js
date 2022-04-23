import { combineReducers } from 'redux';
import plots from './plots.reducer';
import vaults from './vaults.reducer';
import vouchers from './vouchers.reducer';

const reducer = combineReducers({
  plots,
  vaults,
  vouchers,
});

export default reducer;
