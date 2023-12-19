import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import NotFound from './components/jsx/NotFound.jsx';
import Home from './components/jsx/Home.jsx';
import ToDoDetail from './components/jsx/ToDoDetail.jsx';
import Register from './components/jsx/Register.jsx';
import Login from './components/jsx/Login.jsx';
import ToDoEdit from './components/jsx/ToDoEdit.jsx';
import Logout from './components/jsx/Logout.jsx';

function App() {
  function AuthCheck() {
    return localStorage.getItem('accessToken') ? true : false;
  }
  
  function userAuthenticatedLoader(TargetURL = "") {
    if (!AuthCheck()) {
      // loader는 Navigate대신 redirect를 사용해야 한다.
      return redirect('/' + TargetURL);
    }
    return null;
  }

  function userNotAuthenticatedLoader(TargetURL = "") {
    if (AuthCheck()) {
      return redirect('/' + TargetURL);
    }
    return null;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/todo/:id',
      Component: ToDoDetail,
      loader: () => userAuthenticatedLoader(),
    },
    {
      path: '/todo/edit/:id',
      Component: ToDoEdit,
      loader: () => userAuthenticatedLoader(),
    },
    {
      path: '/register',
      Component: Register,
      loader: () => userNotAuthenticatedLoader(),
    },
    {
      path: '/login',
      Component: Login,
      loader: () => userNotAuthenticatedLoader(),
    },
    {
      path: '/logout',
      Component: Logout,
      loader: () => userAuthenticatedLoader(),
    },
    {
      path: '*',
      Component: NotFound,
    },
  ]);

  return (
    <div className="App h-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
