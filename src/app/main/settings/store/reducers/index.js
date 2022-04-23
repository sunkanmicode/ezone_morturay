import { combineReducers } from 'redux';
import reports from './reports.reducer';
import banks from './banks.reducer';
import branch from './branch.reducer';

const reducer = combineReducers({
  reports,
  banks,
  branch,
});

export default reducer;
