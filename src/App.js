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
import { useEffect } from 'react';
import ToDoEdit from './components/jsx/ToDoEdit.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/todo/:id',
      Component: ToDoDetail,
    },
    {
      path: '/todo/edit/:id',
      Component: ToDoEdit,
    },
    {
      path: '/register',
      Component: Register,
    },
    {
      path: '/login',
      Component: Login,
    },
    {
      path: '/logout',
      Component: () => {
        const navigate = useNavigate();
        useEffect(() => {
          localStorage.removeItem('name');
          localStorage.removeItem('accessToken');
          navigate('/');
        }, [navigate]);
      },
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
