// components
import Header from '../Header/Header';
import BottomNav from '../BottomNav/BottomNav';

// interfaces
interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => (
  <>
    <div className='bg' />
    <div className='content flex flex-col'>
      <div className='container container-with-bottom-nav'>
        <Header />
        {children}
      </div>
    </div>
    <BottomNav />
  </>
);

export default Layout;
