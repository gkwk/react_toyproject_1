import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import Header from './Header';

import '../css/Custom.css';

function ToDoDetail() {
  moment.locale('ko');

  const { id } = useParams();

  const [toDoDetail, set_toDoDetail] = useState({});
  const [toDoIsFinished, set_toDoIsFinished] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getToDoDetailApi();
  }, []);

  useEffect(() => {
    set_toDoIsFinished(toDoDetail.is_finished);
  }, [toDoDetail]);

  function changeToDoIsFinished(event) {
    set_toDoIsFinished(() => event.target.checked);
    const params = {
      name: toDoDetail.name,
      content: toDoDetail.content,
      id: id,
      is_finished: event.target.checked,
    };
    updateTodoApi(params);
  }

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

  function updateTodoApi(params) {
    FastApi(
      'PUT',
      `api/todo/update`,
      null,
      params,
      () => {},
      (json) => {
        set_errorDetail(json);
      },
      true,
    );
  }

  function deleteTodoApi(event) {
    event.preventDefault();

    FastApi(
      'DELETE',
      `api/todo/delete`,
      null,
      { id: id },
      () => {
        navigate(`/`);
      },
      (json) => {
        set_errorDetail(json);
      },
      true,
    );
  }

  function showTodoDetail() {
    return (
      <Fragment key={toDoDetail.id}>
        <h2 className="border-bottom py-2 custom-title">
          {toDoDetail.name}
        </h2>
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <input
                type="checkbox"
                checked={toDoIsFinished || false}
                onChange={changeToDoIsFinished}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <div className="d-flex justify-content-end">
              <div className="badge bg-light text-dark p-2">
                {moment(toDoDetail.create_date).format(
                  'YYYY년 MM월 DD일 hh:mm a',
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div
                className="badge bg-light text-dark p-2"
                hidden={toDoDetail.update_date === null ? true : false}
              >
                수정됨 -{' '}
                {moment(toDoDetail.update_date).format(
                  'YYYY년 MM월 DD일 hh:mm a',
                )}
              </div>
            </div>
            <div className="card-text">{toDoDetail.content}</div>
          </div>
        </div>
      </Fragment>
    );
  }

  function navigationBar() {
    return (
      <ul className="d-flex flex-nowrap justify-content-center list-unstyled">
        <li>
          <Link to={`/todo/edit/${id}`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
        </li>
        <li className="ps-2">
          <button className="btn btn-primary" onClick={deleteTodoApi}>
            Delete
          </button>
        </li>
        <li className="ps-2">
          <Link to={'/'}>
            <button className="btn btn-primary">Back</button>
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        {showTodoDetail()}
        {navigationBar()}
      </div>
    </Fragment>
  );
}

export default ToDoDetail;
