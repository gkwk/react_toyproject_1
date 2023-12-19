import { useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken');
    navigate('/');
  }, [navigate]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="text-center">
          <h1>
            <b>LogOut</b>
          </h1>
        </div>
      </div>
    </Fragment>
  );
}

export default Logout;
