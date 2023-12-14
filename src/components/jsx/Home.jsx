import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import FastApi from '../../api/FastApi';
import FastApiErrorMessage from './FastApiErrorMessage';
import Header from './Header';

function Home() {
  const [toDoList, set_toDoList] = useState([]);
  const [errorDetail, set_errorDetail] = useState({ detail: [] });
  const [page, set_page] = useState(0);
  const [size, set_size] = useState(10);
  const [total, set_total] = useState(0);
  const [totalPage, set_totalPage] = useState(1);

  const navigate = useNavigate();

  const userId = process.env.REACT_APP_TEST_USER_ID;

  function getToDoList() {
    FastApi(
      'get',
      `api/todo/list/${userId}`,
      {
        page : page,
        size : size
      },
      (json) => {
        set_toDoList([...json.todoList]);
        set_total(json.total);
      },
      null,
    );
  }

  function listingToDo() {
    return (
      <Fragment>
        <table className="table">
          <thead>
            <tr className="table-primary">
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
                      <Link to={'/todo/' + toDoList[index].id}>
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
    getToDoList(page);
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


  function setPageNumber(event) {
    set_page(event.target.value)
  }

  useEffect(()=> {
    getToDoList(page)
  },[page])

  useEffect(()=> {
    set_totalPage(Math.ceil(total/size))
  },[total,size])

  function pageBar() {
    const pageArray = Array.from({length : totalPage},(v,i) => i);

    return (
      <Fragment>
        <ul className="pagination justify-content-center">
          

          <li className={`page-item ${page <= 0 && "disabled"}`}>
            <button className="page-link" onClick={() => set_page(0)}>{"<<"}</button>
          </li>
          <li className={`page-item ${page <= 0 && "disabled"}`}>
            <button className="page-link" onClick={() => set_page((page) => (page-1))}>이전</button>
          </li>
          
          {pageArray.map((index) => {
            if ((index >= page-5 && index <= page+5)) {
              return (
                <li key={index} className={`page-item ${(index === page) && "active"}`}>
                  <button className="page-link" onClick={() => set_page(index)}>{index+1}</button>
                </li>
              )
            }
          })}
          <li className={`page-item ${page >= totalPage-1 && "disabled"}`}>
            <button className="page-link" onClick={() => set_page((page) => (page+1))}>다음</button>
          </li>
          <li className={`page-item ${page >= totalPage-1 && "disabled"}`}>
            <button className="page-link" onClick={() => set_page(totalPage-1)}>{">>"}</button>
          </li>
        </ul>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        {todoForm()}
        <br />
        {FastApiErrorMessage(errorDetail)}
        <ul className="text-center list-unstyled">{listingToDo()}</ul>

        {pageBar()}
    </div>
    </Fragment>
  );
}

export default Home;
