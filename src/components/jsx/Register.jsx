import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import FastApiErrorMessage from './FastApiErrorMessage';
import Header from './Header';

function Register() {
  const [username, set_username] = useState('');
  const [password1, set_password1] = useState('');
  const [password2, set_password2] = useState('');
  const [email, set_email] = useState('');

  const [errorDetail, set_errorDetail] = useState({ detail: [] });

  function changeUsername(event) {
    set_username(event.target.value);
  }
  function changePassword1(event) {
    set_password1(event.target.value);
  }
  function changePassword2(event) {
    set_password2(event.target.value);
  }
  function changeEmail(event) {
    set_email(event.target.value);
  }

  const navigate = useNavigate();

  function submitRegisterFormApi(event) {
    event.preventDefault();

    FastApi(
      'POST',
      `api/user/register`,
      null,
      {
        name: username,
        password1: password1,
        password2: password2,
        email: email,
      },
      () => {
        navigate('/');
      },
      (json) => {
        set_errorDetail(json);
      },
      false,
    );
  }

  function registerForm() {
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
            id="password1"
            onChange={changePassword1}
            value={password1}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            onChange={changePassword2}
            value={password2}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={changeEmail}
            value={email}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitRegisterFormApi}
          >
            가입
          </button>
        </div>
      </form>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <h5 className="my-3 border-bottom pb-2">회원가입</h5>
        {FastApiErrorMessage(errorDetail)}
        {registerForm()}
      </div>
    </Fragment>
  );
}

export default Register;
