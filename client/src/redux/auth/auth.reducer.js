import { GLOBAL_TYPES } from 'redux/types';

const initialState = {};

const authReducer = (state = initialState, action) => {
  console.log(9, action);
  switch (action.type) {
    case GLOBAL_TYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
