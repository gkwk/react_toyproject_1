import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const navigationBarCollapse = useRef();

  const [navigationBarToggle, set_navBarToggle] = useState(false);

  useEffect(() => {
    if (
      navigationBarCollapse.current.className.toLowerCase().includes('show')
    ) {
      set_navBarToggle(true);
    }

    navigationBarCollapse.current.addEventListener(
      'hidden.bs.collapse',
      (event) => {
        set_navBarToggle(false);
      },
    );

    navigationBarCollapse.current.addEventListener(
      'show.bs.collapse',
      (event) => {
        set_navBarToggle(true);
      },
    );
  }, []);

  function navigationBarUserLoginLogOut() {
    if (localStorage.getItem('accessToken') === null) {
      return (
        <Fragment>
          <li className={`nav-item ${navigationBarToggle && 'ms-auto'} ps-2`}>
            <Link to={'/register'} className="navbar-link">
              회원가입
            </Link>
          </li>

          <li className={`nav-item ${navigationBarToggle && 'ms-auto'} ps-2`}>
            <Link to={'/login'} className="navbar-link">
              로그인
            </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className={`nav-item ${navigationBarToggle && 'ms-auto'} ps-2`}>
            {localStorage.getItem('name')}님 환영합니다
          </li>
          <li className={`nav-item ${navigationBarToggle && 'ms-auto'} ps-2`}>
            <Link to={'/logout'} className="navbar-link">
              로그아웃
            </Link>
          </li>
        </Fragment>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          React ToyProject 1
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref={navigationBarCollapse}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navigationBarUserLoginLogOut()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
