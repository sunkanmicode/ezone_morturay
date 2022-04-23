import { combineReducers } from 'redux';
import relatives from './relatives.reducer';

const reducer = combineReducers({
  relatives,
});

export default reducer;
