import {combineReducers} from 'redux';
import branches from './branches.reducer';
import employees from './employees.reducer';

const ezoneReducers = combineReducers({
    branches,
    employees
});

export default ezoneReducers;
