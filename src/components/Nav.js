import { NavLink } from "react-router-dom";
import '../styles/Nav.css';
const Nav = (props) => {
  const {setToken} = props

  const handleLogout = () => {
    setToken('')
    sessionStorage.clear()
  }
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blog/create">Create New Blog</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Nav;