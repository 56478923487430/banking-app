import { useState } from 'react';

import Card from '../components/Card/Card';
import AddCard from '../components/Card/AddCard';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

import { USER_NAME } from '../constants/user';
import { useAppContext } from '../context/AppContext';

const Cards: React.FC = () => {
  const { transactions, accounts, getAccount } = useAppContext();
  const [showNewCardMessage, setShowNewCardMessage] = useState(false);

  const euroAccount = getAccount('main') ?? accounts[0];
  const uahAccount = getAccount('uah') ?? accounts[1];

  const euroTransactions = transactions.filter((t) => t.accountId === 'main').slice(0, 4);

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Cards</h1>

      <div className='cards'>
        <Card
          variant='euro'
          maskedNumber='**** **** **** 8391'
          fullNumber='4240 2150 8252 8391'
          cvcNumber='824'
          validUntil='10 / 30'
          cardHolder={USER_NAME}
          balance={euroAccount.balance}
          limit={1000}
          currencySymbol={euroAccount.currencySymbol}
        />

        <Card
          variant='uah'
          maskedNumber='**** **** **** 7284'
          fullNumber='4147 4100 3291 7284'
          cvcNumber='391'
          validUntil='06 / 28'
          cardHolder={USER_NAME}
          balance={uahAccount.balance}
          limit={50000}
          currencySymbol={uahAccount.currencySymbol}
        />

        <AddCard
          onClick={() => {
            setShowNewCardMessage(true);
          }}
        />
      </div>

      {showNewCardMessage && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={() => setShowNewCardMessage(false)}
          onKeyDown={() => {}}
          role='button'
          tabIndex={0}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            className='modal-content'
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
            role='dialog'
            aria-modal='true'
            tabIndex={-1}
          >
            <span className='material-symbols-outlined modal-icon'>credit_card_off</span>
            <h2 className='no-select'>Unable to open card</h2>
            <p className='information text-shadow'>
              You cannot open a new card through the app at this time. To open a new card, please
              contact your personal manager.
            </p>
            <button type='button' className='button' onClick={() => setShowNewCardMessage(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      <Divider />

      <History
        detailed
        date='Recent'
        transactions={euroTransactions}
        showSeeAll
        compact
        clickable
      />

      <Divider />
    </Layout>
  );
};

export default Cards;
