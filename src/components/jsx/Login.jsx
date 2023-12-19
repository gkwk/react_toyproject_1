import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import FastApiErrorMessage from './FastApiErrorMessage';
import Header from './Header';

function Login() {
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');

  const [errorDetail, set_errorDetail] = useState({ detail: [] });

  function changeUsername(event) {
    set_username(event.target.value);
  }
  function changePassword(event) {
    set_password(event.target.value);
  }

  const navigate = useNavigate();

  function submitLoginFormApi(event) {
    event.preventDefault();

    FastApi(
      'POST',
      `api/user/login`,
      'application/x-www-form-urlencoded',
      { username: username, password: password },
      (json) => {
        localStorage.setItem('name', json.user_name);
        localStorage.setItem('accessToken', json.access_token);
        navigate('/');
      },
      (json) => {
        set_errorDetail(json);
      },
      false,
    );
  }

  function loginForm() {
    return (
      <form method="post">
        <div className="mb-3">
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={changeUsername}
            value={username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={changePassword}
            value={password}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitLoginFormApi}
          >
            로그인
          </button>
        </div>
      </form>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <h5 className="my-3 border-bottom pb-2">로그인</h5>
        {FastApiErrorMessage(errorDetail)}
        {loginForm()}
      </div>
    </Fragment>
  );
}

export default Login;
