import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

const LOAN_OFFERS = [
  {
    id: 'personal',
    icon: 'account_balance_wallet',
    title: 'Personal Loan',
    rate: 'from 7.9% APR',
    amount: 'Up to \u20AC10,000',
    term: '6 - 36 months',
    description:
      'Flexible funds for any personal need, with no collateral required and a fixed monthly payment.',
  },
  {
    id: 'auto',
    icon: 'directions_car',
    title: 'Auto Loan',
    rate: 'from 5.4% APR',
    amount: 'Up to \u20AC30,000',
    term: '12 - 60 months',
    description: 'Finance a new or used car with competitive rates and quick approval.',
  },
  {
    id: 'home',
    icon: 'home_repair_service',
    title: 'Home Improvement Loan',
    rate: 'from 6.2% APR',
    amount: 'Up to \u20AC15,000',
    term: '6 - 48 months',
    description: 'Renovate or improve your home with a loan tailored to your project timeline.',
  },
];

const Loans: React.FC = () => {
  const [showManagerMessage, setShowManagerMessage] = useState(false);

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Loans</h1>

      <p className='information text-shadow'>
        Explore our current loan offers. Approval and disbursement are handled together with your
        personal manager.
      </p>

      <Divider />

      <div className='loans-list'>
        {LOAN_OFFERS.map((offer) => (
          <div key={offer.id} className='loan-card'>
            <div className='loan-card-header flex flex-v-center'>
              <span className='material-symbols-outlined loan-card-icon'>{offer.icon}</span>
              <div className='flex flex-col'>
                <h3 className='no-select'>{offer.title}</h3>
                <span className='loan-card-rate'>{offer.rate}</span>
              </div>
            </div>

            <p className='loan-card-description text-shadow'>{offer.description}</p>

            <div className='loan-card-meta flex flex-space-between'>
              <div className='flex flex-col'>
                <span className='loan-card-meta-label'>Amount</span>
                <span className='loan-card-meta-value'>{offer.amount}</span>
              </div>
              <div className='flex flex-col'>
                <span className='loan-card-meta-label'>Term</span>
                <span className='loan-card-meta-value'>{offer.term}</span>
              </div>
            </div>

            <button
              type='button'
              className='button loan-card-button'
              onClick={() => setShowManagerMessage(true)}
            >
              Get started
            </button>
          </div>
        ))}
      </div>

      {showManagerMessage && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={() => setShowManagerMessage(false)}
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
            <span className='material-symbols-outlined modal-icon'>support_agent</span>
            <h2 className='no-select'>This section is not available yet</h2>
            <p className='information text-shadow'>
              To open a loan, please contact your personal manager. They will guide you through the
              application and required documents.
            </p>
            <button type='button' className='button' onClick={() => setShowManagerMessage(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      <Divider />
    </Layout>
  );
};

export default Loans;
