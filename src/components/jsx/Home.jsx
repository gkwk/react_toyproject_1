import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'

import FastApi from "../../api/FastApi";

function Home() {
  const [toDoList, set_toDoList] = useState([]);

  const navigate = useNavigate();

  const userId = process.env.REACT_APP_TEST_USER_ID;

  function getToDoList() {
    FastApi("get",`api/todo/list/${userId}`,null,(json)=>{set_toDoList([...json])},(json)=>{console.log(json)})
  }

  function listingToDo() {
    return (
      toDoList.map((toDo) => {
        return (
        <Fragment key={toDo}>
          <li>
            <Link to={"/" + toDo.id}>
              {toDo.todo_name}
            </Link>
          </li>
        </Fragment>
        )
      })
    );
  }

  useEffect(() => {getToDoList()},[]);

  return (
    <div className="text-center">
      <ul>
        {listingToDo()}
      </ul>
    </div>
  );
}

export default Home;
