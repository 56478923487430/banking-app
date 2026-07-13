import { Link } from 'react-router-dom';

const Widgets: React.FC = () => (
  <div className='widgets flex flex-v-center flex-space-between'>
    <Link to='/support' className='widget no-select flex flex-col flex-v-center flex-h-center'>
      <span className='material-symbols-outlined'>support_agent</span>
      <p>Support</p>
    </Link>
    <Link to='/faq' className='widget no-select flex flex-col flex-v-center flex-h-center'>
      <span className='material-symbols-outlined'>quiz</span>
      <p>FAQ</p>
    </Link>
    <Link to='/savings' className='widget no-select flex flex-col flex-v-center flex-h-center'>
      <span className='material-symbols-outlined'>savings</span>
      <p>Savings</p>
    </Link>
  </div>
);

export default Widgets;
