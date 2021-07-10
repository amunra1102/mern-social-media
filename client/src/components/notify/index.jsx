import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GLOBAL_TYPES } from 'redux/types';
import Loading from './loading';
import Toast from './toast';

const Notify = () => {
  const { alert } = useSelector(state => state);
  const dispatch = useDispatch();

  console.log(88, alert);

  return (
    <div>
      {alert.loading && <Loading />}

      {
        alert.error &&
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {}
          })}
          bgColor="bg-danger"
        />
      }

      {
        alert.success &&
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {}
          })}
          bgColor="bg-success"
        />
      }
    </div>
  );
};

export default Notify;
