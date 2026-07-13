import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Layout from '../components/Layout/Layout';
import Button from '../components/Form/Button';
import Divider from '../components/Divider/Divider';
import ProcessingScreen from '../components/ProcessingScreen/ProcessingScreen';

// context
import { useAppContext } from '../context/AppContext';

// utils
import { formatCardNumber, stripCardNumber } from '../utils/formatCardNumber';
import { formatAmount } from '../utils/formatAmount';

type Destination = 'own' | 'person';
type TransferStep = 'form' | 'confirm' | 'processing';

const PROCESSING_DURATION_MS = 5000;

const Transfer: React.FC = () => {
  const { accounts, selectedAccountId, transferToPerson, transferOwn } = useAppContext();
  const navigate = useNavigate();

  const [fromAccountId, setFromAccountId] = useState<string>(selectedAccountId);
  const [destination, setDestination] = useState<Destination>('person');
  const [toAccountId, setToAccountId] = useState<string>(
    accounts.find((a) => a.id !== selectedAccountId)?.id ?? ''
  );
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientNumber, setRecipientNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<TransferStep>('form');

  const fromAccount = accounts.find((a) => a.id === fromAccountId);
  const toAccount = accounts.find((a) => a.id === toAccountId);
  const otherAccounts = accounts.filter((a) => a.id !== fromAccountId);

  const numericAmount = parseFloat(amount.replace(',', '.'));

  const recipientLabel =
    destination === 'person'
      ? recipientName.trim() || recipientNumber.trim()
      : toAccount
        ? `${toAccount.name} (${toAccount.currency})`
        : '';

  const validateForm = (): string | null => {
    if (destination === 'person') {
      if (!stripCardNumber(recipientNumber) && !recipientNumber.trim()) {
        return 'Enter recipient card number or IBAN';
      }
    } else if (!toAccountId) {
      return 'Select destination account';
    }

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return 'Enter a valid amount';
    }

    if (fromAccount && numericAmount > fromAccount.balance) {
      return 'Insufficient balance';
    }

    return null;
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      return;
    }

    setStep('confirm');
  };

  const executeTransfer = (): void => {
    const result =
      destination === 'person'
        ? transferToPerson({
            fromAccountId,
            recipientName: recipientName.trim(),
            recipientNumber: recipientNumber.trim(),
            amount: numericAmount,
          })
        : transferOwn({ fromAccountId, toAccountId, amount: numericAmount });

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong');
      setStep('form');

      return;
    }

    if (result.transactionId) {
      navigate(`/transaction/${result.transactionId}`, { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  };

  const handleConfirm = (): void => {
    setStep('processing');

    setTimeout(() => {
      executeTransfer();
    }, PROCESSING_DURATION_MS);
  };

  const handleRecipientNumberChange = (value: string): void => {
    const hasLetters = /[a-zA-Z]/.test(value);

    if (hasLetters) {
      setRecipientNumber(value.toUpperCase());
    } else {
      setRecipientNumber(formatCardNumber(value));
    }
  };

  if (step === 'processing') {
    return (
      <Layout>
        <Divider />
        <ProcessingScreen
          title='Processing transfer'
          message='Please wait while we process your transaction...'
        />
        <Divider />
      </Layout>
    );
  }

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Transfer</h1>

      <form className='form' noValidate onSubmit={handleFormSubmit}>
        <div className='form-line'>
          <div className='label-line'>
            <label htmlFor='fromAccount' className='text-shadow'>
              From
            </label>
          </div>
          <select
            id='fromAccount'
            className='input'
            value={fromAccountId}
            onChange={(e) => {
              setFromAccountId(e.target.value);

              const remaining = accounts.find((a) => a.id !== e.target.value);

              setToAccountId(remaining?.id ?? '');
            }}
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} - {a.currency} ({a.currencySymbol}
                {formatAmount(a.balance)})
              </option>
            ))}
          </select>
        </div>

        <div className='form-line'>
          <div className='label-line'>
            <span className='text-shadow'>Send to</span>
          </div>
          <div className='destination-toggle flex flex-space-between'>
            <button
              type='button'
              onClick={() => setDestination('person')}
              className={`destination-toggle-option ${destination === 'person' ? 'active' : ''}`}
            >
              Another person
            </button>
            <button
              type='button'
              onClick={() => setDestination('own')}
              className={`destination-toggle-option ${destination === 'own' ? 'active' : ''}`}
              disabled={otherAccounts.length === 0}
            >
              My account
            </button>
          </div>
        </div>

        {destination === 'person' ? (
          <>
            <div className='form-line'>
              <div className='label-line'>
                <label htmlFor='recipientName' className='text-shadow'>
                  Recipient name (optional)
                </label>
              </div>
              <input
                id='recipientName'
                type='text'
                className='input'
                placeholder='e.g. John Smith'
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
            <div className='form-line'>
              <div className='label-line'>
                <label htmlFor='recipientNumber' className='text-shadow'>
                  Card number or IBAN
                </label>
              </div>
              <input
                id='recipientNumber'
                type='text'
                required
                className='input'
                placeholder='e.g. 4240 2150 8252 1234'
                value={recipientNumber}
                onChange={(e) => handleRecipientNumberChange(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div className='form-line'>
            <div className='label-line'>
              <label htmlFor='toAccount' className='text-shadow'>
                To account
              </label>
            </div>
            <select
              id='toAccount'
              className='input'
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
            >
              {otherAccounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} - {a.currency}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className='form-line'>
          <div className='label-line'>
            <label htmlFor='amount' className='text-shadow'>
              Amount {fromAccount ? `(${fromAccount.currencySymbol})` : ''}
            </label>
          </div>
          <input
            id='amount'
            type='number'
            min='0'
            step='0.01'
            required
            className='input'
            placeholder='0.00'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {error && <p className='transfer-error text-shadow'>{error}</p>}

        <div className='form-line'>
          <Button type='submit' text='Send transfer' tabIndex={0} />
        </div>
      </form>

      {step === 'confirm' && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={() => setStep('form')}
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
            <span className='material-symbols-outlined modal-icon'>verified</span>
            <h2 className='no-select'>Confirm transfer</h2>

            <div className='confirm-details'>
              <div className='confirm-row flex flex-space-between'>
                <span className='confirm-label'>Recipient</span>
                <span className='confirm-value'>{recipientLabel}</span>
              </div>
              <div className='confirm-row flex flex-space-between'>
                <span className='confirm-label'>Amount</span>
                <span className='confirm-value'>
                  {fromAccount?.currencySymbol}
                  {formatAmount(numericAmount)}
                </span>
              </div>
              <div className='confirm-row flex flex-space-between'>
                <span className='confirm-label'>Commission</span>
                <span className='confirm-value'>0%</span>
              </div>
            </div>

            <div className='confirm-actions flex flex-space-between'>
              <button
                type='button'
                className='button button-secondary'
                onClick={() => setStep('form')}
              >
                Cancel
              </button>
              <button type='button' className='button' onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Divider />
    </Layout>
  );
};

export default Transfer;
