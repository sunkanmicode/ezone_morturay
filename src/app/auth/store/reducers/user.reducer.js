import * as Actions from '../actions';

const initialState = {
  role: ['user'], //guest
  data: {
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    employeeImage: 'assets/images/avatars/Velazquez.jpg',
    email: '',
    organisation: {
      id: '',
      logo: null,
      orgId: '',
      companyName: '',
      companyShortName: '',
      emailAddress: '',
      phoneNumber: '',
      website: '',
      city: '',
      state: '',
      country: '',
    },
    role: '',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload,
        // role: action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
