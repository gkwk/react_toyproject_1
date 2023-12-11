import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'

import FastApi from "../../api/FastApi";

function ToDoDetail() {
  const {id} = useParams()

  const [toDoDetail, set_toDoDetail] = useState([]);

  const navigate = useNavigate();

  const userId = process.env.REACT_APP_TEST_USER_ID;

  function getToDoDetail() {
    FastApi("get",`api/todo/detail/${userId}/${id}`,null,(json)=>{set_toDoDetail([...json])},(json)=>{console.log(json)})
  }

  function detailToDo() {
    return (
      toDoDetail.map((toDo) => {
        return (
        <Fragment key={toDo}>
          {
            Object.keys(toDo).map((content) => {
              return (
                <Fragment key={content}>
                  <li>
                    {content} : {toDo[content]}
                  </li>
                </Fragment>
              )
            })
          }
        </Fragment>
        )
      })
    );
  }

  useEffect(() => {getToDoDetail()},[]);

  return (
    <div className="text-center">
      <ul>
        {detailToDo()}
      </ul>
      <br />
      <Link to={"/"}>
        <button>
          Back
        </button>
      </Link>
    </div>
  );
}

export default ToDoDetail;