import { Link } from 'react-router-dom';

// components
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

// context
import { useAppContext } from '../context/AppContext';
import { formatAmount } from '../utils/formatAmount';

// types
import type { Transaction } from '../types';

const Transactions: React.FC = () => {
  const { transactions, selectedAccountId } = useAppContext();

  const accountTransactions = transactions.filter((t) => t.accountId === selectedAccountId);

  const groups = accountTransactions.reduce<Record<string, Transaction[]>>((acc, item) => {
    acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];

    return acc;
  }, {});

  return (
    <Layout>
      <Divider />

      <div className='flex flex-v-center flex-space-between'>
        <h1 className='title no-select'>Transactions</h1>

        <Link to='/statements' className='statements-button flex flex-v-center no-select'>
          <span className='material-symbols-outlined'>picture_as_pdf</span>
          Statements
        </Link>
      </div>

      <Divider />

      {Object.entries(groups).map(([date, items]) => {
        const net = items.reduce(
          (sum, item) => sum + (item.kind === 'credit' ? item.amount : -item.amount),
          0
        );
        const symbol = items[0]?.currencySymbol ?? '';
        const dateBalance = `${net >= 0 ? '+' : '-'} ${symbol}${formatAmount(Math.abs(net))}`;

        return (
          <div key={date}>
            <History
              detailed
              date={date}
              dateBalance={dateBalance}
              transactions={items}
              clickable
            />
            <Divider />
          </div>
        );
      })}

      {accountTransactions.length === 0 && (
        <p className='information text-shadow center'>No transactions for this account yet.</p>
      )}
    </Layout>
  );
};

export default Transactions;
