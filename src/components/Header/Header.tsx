import { Link } from 'react-router-dom';

import { USER_FIRST_NAME } from '../../constants/user';

const Header: React.FC = () => (
  <header className='flex flex-v-center flex-space-between'>
    <div className='header-profile flex flex-1'>
      <Link to='/profile'>
        <div className='profile-photo' style={{ backgroundImage: 'url("/images/profile.jpg")' }} />
      </Link>
    </div>
    <div className='header-center'>
      <div className='header-greeting flex flex-v-center'>
        <img src='/images/logo.png' alt='Citfin' className='header-logo' />
        <span className='header-greeting-text no-select'>
          Hello, <strong>{USER_FIRST_NAME}</strong>
        </span>
      </div>
    </div>
    <div className='header-buttons flex flex-1 flex-v-center flex-end'>
      <Link to='/faq' className='header-button flex flex-v-center flex-h-center' title='FAQ'>
        <span className='material-symbols-outlined'>help</span>
      </Link>
      <Link to='/inbox' className='header-button flex flex-v-center flex-h-center' title='Inbox'>
        <span className='material-symbols-outlined'>notifications</span>
      </Link>
    </div>
  </header>
);

export default Header;
