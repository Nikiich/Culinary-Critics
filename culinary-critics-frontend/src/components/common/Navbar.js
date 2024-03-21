import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav>
      {(user?.roles.Editor || user?.roles.Admin) && <Link className='nav-link' to='/add-cuisine'>Add cuisine</Link>}
      {(user?.roles.Editor || user?.roles.Admin) && <Link className='nav-link' to='/add-restaurant'>Add restaurant</Link>}
      {user?.roles.Admin &&<Link className='nav-link' to='/admin-dashboard'>Admin</Link>}
      <Link className='nav-link' to='/'>Home</Link>
      <Link className='nav-link' to='/restaurants'>Restaurants</Link>
      {user ? <Link className='nav-link' to='/profile'>Profile</Link> :
        <>
          <Link className='nav-link' to='/login'>Sign in</Link>
          <Link className='nav-link' to='/register'>Sign up</Link>
        </>}
    </nav>
  );
}

export default Navbar;