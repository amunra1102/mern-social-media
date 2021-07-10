import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { register } from 'redux/auth/auth.action';

const Register = () => {
  const { auth, alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  };
  const [userData, setUserData] = useState(initialState);
  const { fullName, username, email, password, confirmPassword } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);


  const handleChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(register(userData));
  };

  console.log(1111, alert);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Media</h3>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={fullName}
            style={{ background: `${alert.fullName ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.fullName ? alert.fullName : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            value={username.toLowerCase().replace(/ /g, '')}
            style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.username ? alert.username : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChange}
            value={email}
            style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.email ? alert.email : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">

            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange}
              value={password}
              name="password"
              style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <div className="pass">

            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              onChange={handleChange}
              value={confirmPassword}
              name="confirmPassword"
              style={{ background: `${alert.confirmPassword ? '#fd2d6a14' : ''}` }}
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? 'Hide' : 'Show'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.confirmPassword ? alert.confirmPassword : ''}
          </small>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male: <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChange}
            />
          </label>

          <label htmlFor="female">
            Female: <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="other">
            Other: <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account? <Link to="/" style={{ color: "crimson" }}>Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
