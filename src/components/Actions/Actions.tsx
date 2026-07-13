import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../../context/AppContext';
import { formatAmount } from '../../utils/formatAmount';

const Actions: React.FC = () => {
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsCutoff, setStatsCutoff] = useState(0);
  const { transactions, accounts, selectedAccountId, getAccount } = useAppContext();

  const account = getAccount(selectedAccountId) ?? accounts[0];

  const openStats = (): void => {
    setStatsCutoff(Date.now() - 30 * 24 * 60 * 60 * 1000);
    setStatsOpen(true);
  };

  const accountTransactions = transactions.filter(
    (t) => t.accountId === account?.id && (t.timestamp ?? 0) >= statsCutoff
  );

  const income = accountTransactions
    .filter((t) => t.kind === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = accountTransactions
    .filter((t) => t.kind === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const biggestExpense = accountTransactions
    .filter((t) => t.kind === 'debit')
    .sort((a, b) => b.amount - a.amount)[0];

  const symbol = account?.currencySymbol ?? '';

  return (
    <div className='actions flex flex-v-center flex-h-center'>
      <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
        <Link to='/requisites' className='flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>account_balance</span>
        </Link>
        <span className='text-shadow'>Requisites</span>
      </div>
      <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
        <Link to='/transfer' className='flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>send</span>
        </Link>
        <span className='text-shadow'>Transfer</span>
      </div>
      <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
        <Link to='/details' className='flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>page_info</span>
        </Link>
        <span className='text-shadow'>Details</span>
      </div>
      <div className='circle no-select flex flex-col flex-v-center flex-h-center'>
        <button type='button' className='flex flex-v-center flex-h-center' onClick={openStats}>
          <span className='material-symbols-outlined'>bar_chart</span>
        </button>
        <span className='text-shadow'>Statistics</span>
      </div>

      {statsOpen && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={() => setStatsOpen(false)}
          onKeyDown={() => {}}
          role='button'
          tabIndex={0}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            className='modal-content stats-menu'
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
            role='dialog'
            aria-modal='true'
            tabIndex={-1}
          >
            <span className='material-symbols-outlined modal-icon'>bar_chart</span>
            <h2 className='no-select'>Statistics</h2>
            <p className='information text-shadow' style={{ marginBottom: '15px' }}>
              {account?.name ?? 'Account'} · last 30 days
            </p>

            <div className='requisites'>
              <div className='requisites-row flex flex-space-between'>
                <span className='requisites-label'>Income</span>
                <span className='requisites-value amount-credit'>
                  +{symbol} {formatAmount(income)}
                </span>
              </div>
              <div className='requisites-row flex flex-space-between'>
                <span className='requisites-label'>Expenses</span>
                <span className='requisites-value'>
                  -{symbol} {formatAmount(expenses)}
                </span>
              </div>
              <div className='requisites-row flex flex-space-between'>
                <span className='requisites-label'>Net change</span>
                <span
                  className={`requisites-value ${income - expenses >= 0 ? 'amount-credit' : ''}`}
                >
                  {income - expenses >= 0 ? '+' : '-'}
                  {symbol} {formatAmount(Math.abs(income - expenses))}
                </span>
              </div>
              <div className='requisites-row flex flex-space-between'>
                <span className='requisites-label'>Transactions</span>
                <span className='requisites-value'>{accountTransactions.length}</span>
              </div>
              {biggestExpense && (
                <div className='requisites-row flex flex-space-between'>
                  <span className='requisites-label'>Biggest expense</span>
                  <span className='requisites-value'>
                    {biggestExpense.name} ({symbol} {formatAmount(biggestExpense.amount)})
                  </span>
                </div>
              )}
              {accountTransactions.length === 0 && (
                <div className='requisites-row flex flex-space-between'>
                  <span className='requisites-label'>No transactions in the last 30 days</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
