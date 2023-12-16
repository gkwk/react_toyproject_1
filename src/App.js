import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/jsx/NotFound.jsx';
import Home from './components/jsx/Home.jsx';
import ToDoDetail from './components/jsx/ToDoDetail.jsx';
import Register from './components/jsx/Register.jsx';
import Login from './components/jsx/Login.jsx';

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
      path: '/register',
      Component: Register,
    },
    {
      path: '/login',
      Component: Login,
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
