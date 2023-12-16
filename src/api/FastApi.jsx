import QueryString from "qs";

function FastApi(method, url, content_type, params, success_callback, failure_callback) {
  const contentType =  (content_type === null) ? 'application/json' : content_type ;
  const rootDomain = process.env.REACT_APP_FASTAPI_ROOT_DOMAIN;
  const port = process.env.REACT_APP_FASTAPI_PORT;

  var targetUrl = rootDomain + ':' + port;
  var parameters = {
    method: method,
    headers: {
      'Content-Type': contentType,
    },
  };

  if (url.startsWith('/')) {
    targetUrl += url;
  } else {
    targetUrl += '/' + url;
  }

  if (method.toUpperCase() === 'GET') {
    if (params !== null) {
      targetUrl += '?' + (new URLSearchParams(params)).toString();
    }
  } else {
    if (contentType === "application/x-www-form-urlencoded") {
      parameters = {
        method: "POST",
        headers: {
          'Content-Type': contentType,
        },
        body : QueryString.stringify(params)
      };
    } else {
      parameters['body'] = JSON.stringify(params);
    }
  }
  
  fetch(targetUrl, parameters).then((response) => {
    if (response.status === 204) {
      if (success_callback) {
        success_callback();
      }
      return;
    }
    response
      .json()
      .then((json) => {
        var newJson = json;
        newJson['status'] = response.status;
        if (response.status >= 200 && response.status < 300) {
          if (success_callback) {
            success_callback(newJson);
          }
        } else {
          if (failure_callback) {
            failure_callback(newJson);
          } else {
            alert(JSON.stringify(newJson));
          }
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  });
}

export default FastApi;
