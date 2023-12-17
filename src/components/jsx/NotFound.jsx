import { Fragment } from "react";
import Header from "./Header";

function NotFound() {
  return (
    <Fragment>
      <Header />
      <div className="text-center">
        <h1>
          <b>404</b>
        </h1>
        <h1>
          <b>Not Found</b>
        </h1>
      </div>
    </Fragment>
  );
}

export default NotFound;
