import { Link } from 'react-router-dom';

// components
import Circle from '../Circle/Circle';

// types
import type { Transaction } from '../../types';

// utils
import { formatAmount } from '../../utils/formatAmount';

interface IProps {
  item: Transaction;
  compact?: boolean;
  clickable?: boolean;
}

const HistoryLine: React.FC<IProps> = ({ item, compact = false, clickable = false }) => {
  const content = (
    <>
      <div className='history-line-icon flex flex-1'>
        <Circle color={item.color} icon={item.icon} />
      </div>
      <div className='history-line-details flex flex-col'>
        <span className='name'>{item.name}</span>
        {!compact && <span className='time'>{item.time}</span>}
      </div>
      <div className='history-line-amount flex flex-1 flex-end'>
        <p className={item.kind === 'credit' ? 'amount-credit' : ''}>
          {item.currencySymbol}
          {formatAmount(item.amount)}
        </p>
      </div>
    </>
  );

  if (clickable) {
    return (
      <Link
        to={`/transaction/${item.id}`}
        className='history-line history-line-clickable flex flex-h-center flex-v-center'
      >
        {content}
      </Link>
    );
  }

  return <div className='history-line flex flex-h-center flex-v-center'>{content}</div>;
};

export default HistoryLine;
