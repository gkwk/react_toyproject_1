import { useState, useEffect, Fragment } from "react";

import FastApi from "../../api/FastApi";

function Home() {
  const [toDoList, set_toDoList] = useState([]);

  function getToDoList() {
    FastApi("get","api/todo/list",null,(json)=>{set_toDoList([...json])},(json)=>{console.log(json)})
  }

  function listingToDo() {
    return (
      toDoList.map((toDo) => {
        return (
        <Fragment key={toDo}>
          <li>{JSON.stringify(toDo)}</li>
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
