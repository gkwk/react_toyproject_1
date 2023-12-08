import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/jsx/NotFound.jsx';
import Home from './components/jsx/Home.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Home,
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
