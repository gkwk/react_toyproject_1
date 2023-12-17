import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import Header from './Header';

function ToDoDetail() {
  const { id } = useParams();

  const [toDoDetail, set_toDoDetail] = useState({});

  const navigate = useNavigate();

  moment.locale('ko');

  function getToDoDetail() {
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

  function detailToDo() {
    return (
      <Fragment key={toDoDetail.id}>
        <h2 className="border-bottom py-2">{toDoDetail.todo_name}</h2>
        <div className="card my-3">
          <div className="card-body">
            <div className="card-text">{toDoDetail.text}</div>
            <div className="d-flex justify-content-end">
              <div className="badge bg-light text-dark p-2">
                {moment(toDoDetail.create_date).format(
                  'YYYY년 MM월 DD일 hh:mm a',
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  useEffect(() => {
    getToDoDetail();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        {detailToDo()}

        <div className="text-center">
          <Link to={'/'}>
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ToDoDetail;
