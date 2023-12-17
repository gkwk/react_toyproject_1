import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import Header from './Header';
import FastApiErrorMessage from './FastApiErrorMessage';

function ToDoEdit() {
  const { id } = useParams();

	const [errorDetail, set_errorDetail] = useState({ detail: [] });

  const [toDoDetail, set_toDoDetail] = useState({});

	const [toDoName, set_toDoName] = useState("");
	const [toDoText, set_toDoText] = useState("");

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

	function changeToDoName(event) {
    set_toDoName(event.target.value);
  }
	function changeToDoText(event) {
    set_toDoText(event.target.value);
  }

	function updateTodo(event) {
    event.preventDefault();

    FastApi(
      'PUT',
      `api/todo/update`,
      null,
      { todo_name: toDoName, text: toDoText, todoId: id },
      (json) => {
        navigate(`/todo/${id}`)
      },
      (json) => {
        set_errorDetail(json);
      },
			true
    );
  }

  function toDoEditForm() {
    return (
      <Fragment>
        <h2 className="border-bottom py-2">
					<input type="text" className="form-control" id="toDoName" value={toDoName || ""} onChange={changeToDoName} />
				</h2>
        <div className="card my-3">
          <div className="card-body">
            <textarea className="form-control" rows="10" id="toDoText" value={toDoText || ""} onChange={changeToDoText} />
          </div>
        </div>
      </Fragment>
    );
  }

  useEffect(() => {
    getToDoDetail();
  }, []);

	useEffect(() => {
		set_toDoName(toDoDetail.todo_name);
		set_toDoText(toDoDetail.text);
  }, [toDoDetail]);

  return (
    <Fragment>
      <Header />
      <div className="container">
				{FastApiErrorMessage(errorDetail)}
        {toDoEditForm()}
        <div className="text-center">
					<button className="btn btn-primary" onClick={updateTodo}>Confirm</button>
          <Link to={`/todo/${id}`} className='ps-3'>
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ToDoEdit;