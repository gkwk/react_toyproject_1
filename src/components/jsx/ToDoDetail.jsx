import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import Header from './Header';

import "../css/Custom.css"

function ToDoDetail() {
  const { id } = useParams();

  const [toDoDetail, set_toDoDetail] = useState({});
  const [toDoIsFinished, set_toDoIsFinished] = useState(false);

  function changeToDoIsFinished(event) {
    set_toDoIsFinished(() => (event.target.checked))
    const params = { todo_name: toDoDetail.todo_name, text: toDoDetail.text, todoId: id, is_finished : event.target.checked };
    updateTodo(params);
  }

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

  function updateTodo(params) {
    FastApi(
      'PUT',
      `api/todo/update`,
      null,
      params,
      (json) => {
      },
      (json) => {
        set_errorDetail(json);
      },
			true
    );
  }

  function deleteTodo(event) {
    event.preventDefault();

    FastApi(
      'DELETE',
      `api/todo/delete`,
      null,
      { todoId: id },
      (json) => {
        navigate(`/`)
      },
      (json) => {
        set_errorDetail(json);
      },
			true
    );
  }

  function detailToDo() {
    return (
      <Fragment key={toDoDetail.id}>
        <h2 className="border-bottom py-2 custom-title">{toDoDetail.todo_name}</h2>
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <input  type="checkbox" checked={toDoIsFinished || false} onChange={changeToDoIsFinished} style={{width:"50px",height:"50px"}}/>
            </div>
            <div className="d-flex justify-content-end">
              <div className="badge bg-light text-dark p-2">
                {moment(toDoDetail.create_date).format(
                  'YYYY년 MM월 DD일 hh:mm a',
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="badge bg-light text-dark p-2" hidden={(toDoDetail.update_date === null) ? true : false}>
                수정됨 - {moment(toDoDetail.update_date).format(
                  'YYYY년 MM월 DD일 hh:mm a',
                )}
              </div>
            </div>
            <div className="card-text">{toDoDetail.text}</div>
          </div>
        </div>
      </Fragment>
    );
  }

  useEffect(() => {
    getToDoDetail();
  }, []);

  useEffect(() => {
    set_toDoIsFinished(toDoDetail.is_finished);
  }, [toDoDetail]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        {detailToDo()}

        <ul className="d-flex flex-nowrap justify-content-center list-unstyled">
          <li>
            <Link to={`/todo/edit/${id}`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          </li>
          <li className='ps-2'>
            <button className="btn btn-primary" onClick={deleteTodo}>Delete</button>
          </li>
          <li className='ps-2'>
            <Link to={'/'}>
              <button className="btn btn-primary">Back</button>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ToDoDetail;
