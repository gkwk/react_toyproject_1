import { Fragment } from 'react';

function FastApiErrorMessage(error) {
  function errorMessageListing() {
    if (Object.hasOwn(error, 'detail')) {
      if (typeof error.detail === 'string') {
        return (
          <Fragment>
            <li>{error.detail}</li>
          </Fragment>
        );
      } else if (typeof error.detail === 'object' && error.detail.length > 0) {
        return Object.keys(error.detail).map((index) => {
          return (
            <Fragment key={index}>
              <li>
                {error.detail[index].loc[1] + ' : ' + error.detail[index].msg}
              </li>
            </Fragment>
          );
        });
      }
    }
  }

  return (
    <Fragment>
      <ul className="list-unstyled">{errorMessageListing()}</ul>
    </Fragment>
  );
}

export default FastApiErrorMessage;
