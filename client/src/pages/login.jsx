import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { login } from 'redux/auth/auth.action';

const Login = () => {
  const initialState = { email: '', password: '' };

  const [userData, setUserData] = useState(initialState);
  const [typePass, setTypePass] = useState(false);

  const { email, password } = userData;

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth.token) {
      history.push("/home");
    }
  }, [auth, history]);

  console.log(auth.token);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Social Media</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={email}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
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
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          You don't have an account? <Link to="/register" style={{ color: "crimson" }}>Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
