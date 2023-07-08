import { combineReducers } from 'redux';

const initialFormState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  companyName: '',
  email: '',
  freeSpace: '',
  agreeToTerms: false,
  passType: '',
};

const formReducer = (state = initialFormState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, ...action.payload };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
});

export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';
export const RESET_FORM = 'RESET_FORM';

// Action creators
export const updateFormData = (data) => ({
  type: UPDATE_FORM_DATA,
  payload: data,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export default rootReducer;
