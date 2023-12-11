import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import FastApi from '../../api/FastApi';
import FastApiErrorMessage from './FastApiErrorMessage';

function Home() {
  const [toDoList, set_toDoList] = useState([]);
  const [errorDetail, set_errorDetail] = useState({ detail: [] });

  const navigate = useNavigate();

  const userId = process.env.REACT_APP_TEST_USER_ID;

  function getToDoList() {
    FastApi(
      'get',
      `api/todo/list/${userId}`,
      null,
      (json) => {
        set_toDoList([...json]);
      },
      null,
    );
  }

  function listingToDo() {
    return (
      <Fragment>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th>번호</th>
              <th>제목</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(toDoList).map((index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>{parseInt(index) + 1}</td>
                    <td>
                      <Link to={'/' + toDoList[index].id}>
                        {toDoList[index].todo_name}
                      </Link>
                    </td>
                    <td>{toDoList[index].create_date}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }

  useEffect(() => {
    getToDoList();
  }, []);

  const [ToDo_New_name, set_ToDo_New_name] = useState('');
  const [ToDo_New_text, set_ToDo_New_text] = useState('');

  function createTodo(event) {
    event.preventDefault();

    FastApi(
      'POST',
      `api/todo/create/${userId}`,
      { user_id: userId, todo_name: ToDo_New_name, text: ToDo_New_text },
      () => {
        set_ToDo_New_name('');
        set_ToDo_New_text('');

        getToDoList();
      },
      (json) => {
        set_errorDetail(json);
      },
    );
  }

  function set_ToDo_New_nameChange(event) {
    set_ToDo_New_name(event.target.value);
  }
  function set_ToDo_New_textChange(event) {
    set_ToDo_New_text(event.target.value);
  }

  function todoForm() {
    return (
      <div className="mt-4">
        <div className="d-flex">
          <div className="w-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                <input
                  value={ToDo_New_name}
                  onChange={set_ToDo_New_nameChange}
                  className="flex-grow-1 form-control mb-1"
                  placeholder="Title"
                />
                <input
                  value={ToDo_New_text}
                  onChange={set_ToDo_New_textChange}
                  className="flex-grow-1 form-control"
                  placeholder="content"
                />
              </div>
              <button onClick={createTodo} className="btn btn-primary ms-3">
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center container">
      {todoForm()}
      {FastApiErrorMessage(errorDetail)}
      <ul className="list-unstyled">{listingToDo()}</ul>
    </div>
  );
}

export default Home;
