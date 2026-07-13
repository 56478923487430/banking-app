import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// components
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

import { APP_VERSION } from '../constants/app';
import { USER_NAME, USER_PHONE } from '../constants/user';
import { signOut } from '../utils/auth';

type ModalKey = 'security' | 'notifications' | 'appearance' | 'features' | 'about' | null;

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [signOutConfirmOpen, setSignOutConfirmOpen] = useState(false);

  const closeModal = (): void => setActiveModal(null);

  const handleSignOut = (): void => {
    signOut();
    navigate('/signin', { replace: true });
  };

  return (
    <Layout>
      <Divider />

      <h1 className='title'>Profile</h1>

      <div className='account-photo' style={{ backgroundImage: 'url("/images/profile.jpg")' }} />

      <div className='center'>
        <h2>{USER_NAME}</h2>
        <p>{USER_PHONE}</p>
      </div>

      <Divider />

      <div className='account'>
        <Link to='/support' className='flex flex-v-center'>
          <span className='material-symbols-outlined'>support</span>
          Help
        </Link>
        <Link to='/requisites' className='flex flex-v-center'>
          <span className='material-symbols-outlined'>account_circle</span>
          Account
        </Link>
        <Link to='/faq' className='flex flex-v-center'>
          <span className='material-symbols-outlined'>school</span>
          Learn
        </Link>
        <Link to='/inbox' className='flex flex-v-center'>
          <span className='material-symbols-outlined'>inbox</span>
          Inbox
        </Link>
      </div>

      <Divider />

      <div className='account'>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setActiveModal('security')}
        >
          <span className='material-symbols-outlined'>verified_user</span>
          Security &amp; privacy
        </button>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setActiveModal('notifications')}
        >
          <span className='material-symbols-outlined'>notifications</span>
          Notification settings
        </button>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setActiveModal('appearance')}
        >
          <span className='material-symbols-outlined'>contrast</span>
          Appearance
        </button>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setActiveModal('features')}
        >
          <span className='material-symbols-outlined'>grade</span>
          New features
        </button>
      </div>

      <Divider />

      <div className='account'>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setActiveModal('about')}
        >
          <span className='material-symbols-outlined'>token</span>
          About us
        </button>
        <button
          type='button'
          className='flex flex-v-center'
          onClick={() => setSignOutConfirmOpen(true)}
        >
          <span className='material-symbols-outlined'>power_settings_new</span>
          Sign out
        </button>
      </div>

      <Divider />

      <footer className='center no-select'>
        App Version {APP_VERSION} Citfin
      </footer>

      <Divider />

      {activeModal && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={closeModal}
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
            {activeModal === 'security' && (
              <>
                <span className='material-symbols-outlined modal-icon'>verified_user</span>
                <h2 className='no-select'>Security &amp; privacy</h2>
                <p className='information text-shadow'>
                  Your account is protected with two-factor authentication. To change your password,
                  PIN, or biometric login, please contact your personal manager or visit Support.
                </p>
              </>
            )}

            {activeModal === 'notifications' && (
              <>
                <span className='material-symbols-outlined modal-icon'>notifications</span>
                <h2 className='no-select'>Notification settings</h2>

                <div className='stats-list'>
                  <div className='stats-row flex flex-v-center flex-space-between'>
                    <span>Push notifications</span>
                    <div className='destination-toggle flex flex-space-between'>
                      <button
                        type='button'
                        className={`destination-toggle-option ${pushEnabled ? 'active' : ''}`}
                        onClick={() => setPushEnabled(true)}
                      >
                        On
                      </button>
                      <button
                        type='button'
                        className={`destination-toggle-option ${!pushEnabled ? 'active' : ''}`}
                        onClick={() => setPushEnabled(false)}
                      >
                        Off
                      </button>
                    </div>
                  </div>
                  <div className='stats-row flex flex-v-center flex-space-between'>
                    <span>Email notifications</span>
                    <div className='destination-toggle flex flex-space-between'>
                      <button
                        type='button'
                        className={`destination-toggle-option ${emailEnabled ? 'active' : ''}`}
                        onClick={() => setEmailEnabled(true)}
                      >
                        On
                      </button>
                      <button
                        type='button'
                        className={`destination-toggle-option ${!emailEnabled ? 'active' : ''}`}
                        onClick={() => setEmailEnabled(false)}
                      >
                        Off
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'appearance' && (
              <>
                <span className='material-symbols-outlined modal-icon'>contrast</span>
                <h2 className='no-select'>Appearance</h2>
                <p className='information text-shadow' style={{ marginBottom: '15px' }}>
                  Choose how the app looks. More themes are coming soon.
                </p>

                <div className='destination-toggle flex flex-space-between'>
                  <button
                    type='button'
                    className={`destination-toggle-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </button>
                  <button
                    type='button'
                    className={`destination-toggle-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </button>
                </div>
              </>
            )}

            {activeModal === 'features' && (
              <>
                <span className='material-symbols-outlined modal-icon'>grade</span>
                <h2 className='no-select'>New features</h2>
                <div className='stats-list'>
                  <div className='stats-row'>
                    <strong>Statistics</strong>
                    <p className='information text-shadow'>
                      See a quick breakdown of your income, expenses, and biggest transactions right
                      from the Home screen.
                    </p>
                  </div>
                  <div className='stats-row'>
                    <strong>Statements</strong>
                    <p className='information text-shadow'>
                      Download a PDF statement of your account for any period.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <span className='material-symbols-outlined modal-icon'>token</span>
                <h2 className='no-select'>About us</h2>
                <p className='information text-shadow'>
                  Citfin is a smart bank with zero lines, zero paperwork, and zero hidden fees. We
                  built this app to make managing your money fast, clear, and rewarding every day.
                  App Version {APP_VERSION}
                </p>
              </>
            )}

            <button type='button' className='button' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {signOutConfirmOpen && (
        <div
          className='modal-overlay flex flex-v-center flex-h-center'
          onClick={() => setSignOutConfirmOpen(false)}
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
            <span className='material-symbols-outlined modal-icon'>power_settings_new</span>
            <h2 className='no-select'>Sign out?</h2>
            <p className='information text-shadow'>
              Are you sure you want to sign out of your account?
            </p>

            <div className='confirm-actions flex flex-space-between'>
              <button
                type='button'
                className='button button-secondary'
                onClick={() => setSignOutConfirmOpen(false)}
              >
                Cancel
              </button>
              <button type='button' className='button' onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
