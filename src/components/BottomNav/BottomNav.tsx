import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/home', icon: 'home', label: 'Home' },
  { to: '/transactions', icon: 'sync_alt', label: 'Transactions' },
  { to: '/cards', icon: 'credit_card', label: 'Cards' },
  { to: '/loans', icon: 'payments', label: 'Loans' },
  { to: '/profile', icon: 'person', label: 'Profile' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className='bottom-nav no-select flex flex-v-center flex-space-between'>
      {items.map((item) => {
        const active = location.pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item flex flex-col flex-v-center flex-h-center ${active ? 'active' : ''}`}
          >
            <span className='material-symbols-outlined'>{item.icon}</span>
            <span className='bottom-nav-label'>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
