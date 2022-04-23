import { combineReducers } from 'redux';
import receipts from './receipts.reducer';

const reducer = combineReducers({
  receipts,
});

export default reducer;
