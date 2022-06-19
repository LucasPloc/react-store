import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
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
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
