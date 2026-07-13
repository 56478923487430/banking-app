import { useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { formatAmount } from '../../utils/formatAmount';

const Balance: React.FC = () => {
  const { accounts, selectedAccountId, selectAccount, getAccount } = useAppContext();

  const [open, setOpen] = useState<boolean>(false);

  const account = getAccount(selectedAccountId) ?? accounts[0];

  return (
    <div className='balance flex flex-col flex-v-center flex-h-center'>
      <div className='account-switcher'>
        <button
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          className='currency text-shadow no-select flex flex-v-center flex-h-center'
        >
          {account.name} - {account.currency}
          <span className='material-symbols-outlined'>
            {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </button>

        {open && (
          <div className='account-switcher-menu'>
            {accounts.map((item) => (
              <button
                key={item.id}
                type='button'
                onClick={() => {
                  selectAccount(item.id);
                  setOpen(false);
                }}
                className={`account-switcher-item flex flex-v-center flex-space-between ${
                  item.id === account.id ? 'active' : ''
                }`}
              >
                <span>
                  {item.name} - {item.currency}
                </span>
                <span>
                  {item.currencySymbol}
                  {formatAmount(item.balance)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <h1 className='text-shadow no-select flex flex-h-center flex-v-center'>
        <span>{account.currencySymbol}</span>
        {formatAmount(account.balance)}
      </h1>
    </div>
  );
};

export default Balance;
