import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales'

import FastApi from '../../api/FastApi';

function ToDoDetail() {
  const { id } = useParams();

  const [toDoDetail, set_toDoDetail] = useState([]);

  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  moment.locale('ko');

  function getToDoDetail() {
    FastApi(
      'get',
      `api/todo/detail/${userId}/${id}`,
      null,
      (json) => {
        set_toDoDetail([...json]);
      },
      null,
    );
  }

  function detailToDo() {
    return (
      <Fragment>
        {toDoDetail.map((todo) => {
          return (
            <Fragment key={todo.id}>
              <h2 className="border-bottom py-2">{todo.todo_name}</h2>
              <div className="card my-3">
                <div className="card-body">
                  <div className="card-text">{todo.text}</div>
                  <div className="d-flex justify-content-end">
                    <div className="badge bg-light text-dark p-2">
                      {moment(todo.create_date).format("YYYY년 MM월 DD일 hh:mm a")}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }

  useEffect(() => {
    getToDoDetail();
  }, []);

  return (
    <div className="container">
      {detailToDo()}

      <div className="text-center">
        <Link to={'/'}>
          <button className="btn btn-primary">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default ToDoDetail;
