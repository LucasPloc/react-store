import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <>
      <nav className='navigation'>
        <Link to='/' className='logo-container'>
          <Logo className='logo' />
        </Link>
        <div className='links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link to='/auth' className='nav-link'>
              SIGN IN
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
