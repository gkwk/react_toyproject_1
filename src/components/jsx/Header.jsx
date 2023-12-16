import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const isNavBarToggled = useRef()
  
  const [navBarToggle, set_navBarToggle] = useState(false)

  useEffect(() => {
    if (isNavBarToggled.current.className.toLowerCase().includes("show")) {
      set_navBarToggle(true)
    }

    isNavBarToggled.current.addEventListener('hidden.bs.collapse', (event) => {
      set_navBarToggle(false)
    })

    isNavBarToggled.current.addEventListener('show.bs.collapse', (event) => {
      set_navBarToggle(true)
    })
  },[])

    return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

			<div className="container">
				<Link to={"/"} className="navbar-brand">React ToyProject 1</Link>
				<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent" ref={isNavBarToggled}>
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
								<li className={`nav-item ${navBarToggle && "ms-auto"} ps-2`}>
								<Link to={"/register"} className="navbar-link">회원가입</Link>
								</li>
								<li className={`nav-item ${navBarToggle && "ms-auto"} ps-2`}>
								<Link to={"/login"} className="navbar-link">로그인</Link>
								</li>
						</ul>
				</div>
			</div>
	</nav>
    )
}

export default Header;