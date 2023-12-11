
function FastApi(method, url, params, success_callback, failure_callback) {
  const contentType = 'application/json';
  const body = JSON.stringify(params);
  const rootDomain = process.env.REACT_APP_FASTAPI_ROOT_DOMAIN;
  const port = process.env.REACT_APP_FASTAPI_PORT;

  var targetUrl = rootDomain + ":" + port;
  var parameters = {
    "method" : method,
    "headers" : {
      "Content-Type" : contentType
    }
  }

  if (url.startsWith("/")) {
    targetUrl += url;
  }else {
    targetUrl += "/" + url;
  }
  
  if(method.toUpperCase() === "GET") {
    if (params !== null) {
      targetUrl += "?" + params;
    }
  }else{
    parameters["body"] = body;
  }

  fetch(targetUrl, parameters)
  .then((response) => {
    if(response.status === 204) {
      if(success_callback) {
        success_callback()
      }
      return
    }
    response.json()
      .then((json) => {
        var newJson = json;
        newJson["status"] = response.status;
        if(response.status >= 200 && response.status < 300) {
          if(success_callback) {
            success_callback(newJson);
          }
        }else {
          if (failure_callback) {
            failure_callback(newJson)
          }else {
            alert(JSON.stringify(newJson));
          }
        }
      }).catch((error) => {
        alert(JSON.stringify(error));
      })
  })
}

export default FastApi;