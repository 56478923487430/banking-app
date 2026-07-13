import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { APP_PIN, isSignedIn, unlockWithPin } from '../utils/auth';

const PIN_LENGTH = 4;

const PinUnlock: React.FC = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isSignedIn()) {
    return <Navigate to='/signin' replace />;
  }

  const appendDigit = (digit: string): void => {
    if (pin.length >= PIN_LENGTH) return;

    const nextPin = pin + digit;
    setPin(nextPin);
    setError(false);

    if (nextPin.length === PIN_LENGTH) {
      if (nextPin === APP_PIN) {
        unlockWithPin();
        navigate('/home', { replace: true });
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 600);
      }
    }
  };

  const removeDigit = (): void => {
    setPin((current) => current.slice(0, -1));
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (pin === APP_PIN) {
      unlockWithPin();
      navigate('/home', { replace: true });
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className='flex flex-v-center flex-h-center h-full'>
      <div className='bg' />
      <div className='text pin-unlock'>
        <img src='/images/logo.png' alt='Citfin' className='pin-unlock-logo' />
        <h1 className='text-shadow no-select'>Enter PIN</h1>
        <p className='text-shadow no-select'>Enter your 4-digit PIN to access the app.</p>

        <form method='post' action='/' className='form pin-form' noValidate onSubmit={handleSubmit}>
          <div className='pin-dots flex flex-h-center' aria-hidden='true'>
            {Array.from({ length: PIN_LENGTH }).map((_, index) => (
              <span
                key={index}
                className={`pin-dot ${index < pin.length ? 'filled' : ''} ${error ? 'error' : ''}`}
              />
            ))}
          </div>

          {error && (
            <p className='pin-error text-shadow center no-select' role='alert'>
              Incorrect PIN. Try again.
            </p>
          )}

          <div className='pin-keypad'>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type='button'
                className='pin-key'
                onClick={() => appendDigit(digit)}
              >
                {digit}
              </button>
            ))}
            <span className='pin-key pin-key-empty' />
            <button type='button' className='pin-key' onClick={() => appendDigit('0')}>
              0
            </button>
            <button type='button' className='pin-key pin-key-back' onClick={removeDigit}>
              <span className='material-symbols-outlined'>backspace</span>
            </button>
          </div>

          <input
            type='password'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={PIN_LENGTH}
            value={pin}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, PIN_LENGTH);
              setPin(digits);
              setError(false);

              if (digits.length === PIN_LENGTH) {
                if (digits === APP_PIN) {
                  unlockWithPin();
                  navigate('/home', { replace: true });
                } else {
                  setError(true);
                  setTimeout(() => {
                    setPin('');
                    setError(false);
                  }, 600);
                }
              }
            }}
            className='pin-hidden-input'
            aria-label='PIN code'
            autoComplete='off'
          />
        </form>

      </div>
    </div>
  );
};

export default PinUnlock;
