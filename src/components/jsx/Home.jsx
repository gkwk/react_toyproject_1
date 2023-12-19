import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import moment from 'moment/min/moment-with-locales';

import FastApi from '../../api/FastApi';
import FastApiErrorMessage from './FastApiErrorMessage';
import Header from './Header';

import '../css/Custom.css';

function Home() {
  moment.locale('ko');

  const [toDoList, set_toDoList] = useState([]);
  const [errorDetail, set_errorDetail] = useState({ detail: [] });
  const [page, set_page] = useState(0);
  const [size, set_size] = useState(10);
  const [total, set_total] = useState(0);
  const [totalPage, set_totalPage] = useState(1);

  const [ToDoNewName, set_ToDoNewName] = useState('');
  const [ToDoNewContent, set_ToDoNewContent] = useState('');

  const navigate = useNavigate();

  function changeToDoNewName(event) {
    set_ToDoNewName(event.target.value);
  }
  function changeToDoNewContent(event) {
    set_ToDoNewContent(event.target.value);
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      getTodoListApi(page);
    }
  }, [page]);

  useEffect(() => {
    set_totalPage(Math.ceil(total / size));
  }, [total, size]);

  function getTodoListApi() {
    FastApi(
      'get',
      `api/todo/list`,
      null,
      {
        page: page,
        size: size,
      },
      (json) => {
        set_toDoList([...json.todo_list]);
        set_total(json.total);
      },
      null,
      true,
    );
  }

  function createTodoApi(event) {
    event.preventDefault();

    FastApi(
      'POST',
      `api/todo/create`,
      null,
      { name: ToDoNewName, content: ToDoNewContent },
      () => {
        set_ToDoNewName('');
        set_ToDoNewContent('');
        set_errorDetail({ detail: [] });

        getTodoListApi();
      },
      (json) => {
        set_errorDetail(json);
      },
      true,
    );
  }

  function listingTodo() {
    return (
      <Fragment>
        <table className="table custom-table">
          <thead>
            <tr className="table-primary">
              <th>번호</th>
              <th>제목</th>
              <th>작성일시</th>
              <th>완료</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(toDoList).map((index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td className="custom-td">
                      {total - page * size - parseInt(index)}
                    </td>
                    <td className="custom-td">
                      <Link to={`/todo/${toDoList[index].id}`}>
                        {toDoList[index].name}
                      </Link>
                    </td>
                    <td className="custom-td">
                      {moment(toDoList[index].create_date).format(
                        'YYYY년 MM월 DD일 hh:mm a',
                      )}
                    </td>
                    <td className="custom-td">
                      {toDoList[index].is_finished ? '✔' : '✖'}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }

  function createTodoForm() {
    return (
      <div className="mt-4">
        <div className="d-flex">
          <div className="w-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                <input
                  value={ToDoNewName}
                  onChange={changeToDoNewName}
                  className="flex-grow-1 form-control mb-1"
                  placeholder="Title"
                />
                <input
                  value={ToDoNewContent}
                  onChange={changeToDoNewContent}
                  className="flex-grow-1 form-control"
                  placeholder="content"
                />
              </div>
              <button onClick={createTodoApi} className="btn btn-primary ms-3">
                추가
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function pageNavigationBar() {
    const pageArray = Array.from({ length: totalPage }, (v, i) => i);

    return (
      <Fragment>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page <= 0 && 'disabled'}`}>
            <button className="page-link" onClick={() => set_page(0)}>
              {'<<'}
            </button>
          </li>
          <li className={`page-item ${page <= 0 && 'disabled'}`}>
            <button
              className="page-link"
              onClick={() => set_page((page) => page - 1)}
            >
              {'<'}
            </button>
          </li>

          {pageArray.map((index) => {
            if (index >= page - 5 && index <= page + 5) {
              return (
                <li
                  key={index}
                  className={`page-item ${index === page && 'active'}`}
                >
                  <button className="page-link" onClick={() => set_page(index)}>
                    {index + 1}
                  </button>
                </li>
              );
            }
          })}
          <li className={`page-item ${page >= totalPage - 1 && 'disabled'}`}>
            <button
              className="page-link"
              onClick={() => set_page((page) => page + 1)}
            >
              {'>'}
            </button>
          </li>
          <li className={`page-item ${page >= totalPage - 1 && 'disabled'}`}>
            <button
              className="page-link"
              onClick={() => set_page(totalPage - 1)}
            >
              {'>>'}
            </button>
          </li>
        </ul>
      </Fragment>
    );
  }

  function homeUserLoginLogOut() {
    if (localStorage.getItem('accessToken') === null) {
      return (
        <Fragment>
          <div className="text-center">
            <h1>
              <strong>Login required</strong>
            </h1>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {createTodoForm()}
          <br />
          {FastApiErrorMessage(errorDetail)}
          <ul className="text-center list-unstyled">{listingTodo()}</ul>
          {pageNavigationBar()}
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="container">{homeUserLoginLogOut()}</div>
    </Fragment>
  );
}

export default Home;
