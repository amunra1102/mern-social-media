import { GLOBAL_TYPES } from 'redux/types';

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;