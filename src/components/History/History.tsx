import { Link } from 'react-router-dom';

// components
import HistoryLine from './HistoryLine';

// types
import type { Transaction } from '../../types';

// interfaces
interface IProps {
  date?: string;
  detailed?: boolean;
  dateBalance?: string;
  transactions: Transaction[];
  showSeeAll?: boolean;
  compact?: boolean;
  clickable?: boolean;
}

const History: React.FC<IProps> = ({
  date = undefined,
  detailed = false,
  dateBalance = undefined,
  transactions,
  showSeeAll = false,
  compact = false,
  clickable = false,
}) => (
  <>
    {detailed && (
      <div className='history-header flex flex-v-center flex-space-between'>
        <span className='text-shadow no-select date'>{date}</span>
        <span className='text-shadow no-select amount flex flex-end'>{dateBalance}</span>
      </div>
    )}
    <div className='history'>
      {transactions.length === 0 && (
        <p className='history-empty text-shadow no-select center'>No transactions yet</p>
      )}
      {transactions.map((item) => (
        <HistoryLine key={item.id} item={item} compact={compact} clickable={clickable} />
      ))}
      {showSeeAll && (
        <Link to='/transactions' className='history-line bottom flex flex-v-center flex-h-center'>
          See all
          <span className='material-symbols-outlined'>keyboard_arrow_right</span>
        </Link>
      )}
    </div>
  </>
);

export default History;
