import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import Header from './Header';
import FastApiErrorMessage from './FastApiErrorMessage';

function ToDoEdit() {
  moment.locale('ko');

  const { id } = useParams();

  const [toDoDetail, set_toDoDetail] = useState({});
  const [toDoName, set_toDoName] = useState('');
  const [toDoContent, set_toDoText] = useState('');

  const [errorDetail, set_errorDetail] = useState({ detail: [] });

  function changeTodoName(event) {
    set_toDoName(event.target.value);
  }
  function changeTodoContent(event) {
    set_toDoText(event.target.value);
  }

  const navigate = useNavigate();

  useEffect(() => {
    getToDoDetailApi();
  }, []);

  useEffect(() => {
    set_toDoName(toDoDetail.name);
    set_toDoText(toDoDetail.content);
  }, [toDoDetail]);

  function getToDoDetailApi() {
    FastApi(
      'get',
      `api/todo/detail/${id}`,
      null,
      null,
      (json) => {
        set_toDoDetail({ ...json });
      },
      null,
      true,
    );
  }

  function updateTodoApi(event) {
    event.preventDefault();

    FastApi(
      'PUT',
      `api/todo/update`,
      null,
      { name: toDoName, content: toDoContent, id: id },
      () => {
        navigate(`/todo/${id}`);
      },
      (json) => {
        set_errorDetail(json);
      },
      true,
    );
  }

  function updateTodoForm() {
    return (
      <Fragment>
        <h2 className="border-bottom py-2">
          <input
            type="text"
            className="form-control"
            id="toDoName"
            value={toDoName || ''}
            onChange={changeTodoName}
          />
        </h2>
        <div className="card my-3">
          <div className="card-body">
            <textarea
              className="form-control"
              rows="10"
              id="toDoText"
              value={toDoContent || ''}
              onChange={changeTodoContent}
            />
          </div>
        </div>
      </Fragment>
    );
  }

  function navigationBar() {
    return (
      <ul className="d-flex flex-nowrap justify-content-center list-unstyled">
        <li>
          <button className="btn btn-primary" onClick={updateTodoApi}>
            Confirm
          </button>
        </li>
        <li className="ps-2">
          <Link to={`/todo/${id}`}>
            <button className="btn btn-primary">Back</button>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        {FastApiErrorMessage(errorDetail)}
        {updateTodoForm()}
        {navigationBar()}
      </div>
    </Fragment>
  );
}

export default ToDoEdit;
