import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

import { SUPPORT_CONTACTS } from '../constants/bank';

const Support: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; from: 'user' | 'support' }[]>([
    {
      text: 'Hello! Welcome to live support. How can we help you today?',
      from: 'support',
    },
  ]);

  const handleSend = (): void => {
    const trimmed = message.trim();

    if (!trimmed) return;

    setChatMessages((prev) => [
      ...prev,
      { text: trimmed, from: 'user' },
      {
        text: 'Thank you for your message. A support agent will respond shortly. Average wait time is 2 minutes.',
        from: 'support',
      },
    ]);
    setMessage('');
  };

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Support</h1>

      <p className='information text-shadow'>
        Get help from our team via live chat or reach us by phone.
      </p>

      <Divider />

      <h2 className='section-title no-select'>Live chat</h2>

      <div className='chat'>
        <div className='chat-messages'>
          {chatMessages.map((item, index) => (
            <div
              key={`${item.from}-${index}`}
              className={`chat-message ${item.from === 'user' ? 'chat-message-user' : 'chat-message-support'}`}
            >
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className='chat-input flex flex-v-center'>
          <input
            type='text'
            value={message}
            placeholder='Type your message...'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            type='button'
            onClick={handleSend}
            className='chat-send flex flex-v-center flex-h-center'
          >
            <span className='material-symbols-outlined'>send</span>
          </button>
        </div>
      </div>

      <Divider />

      <h2 className='section-title no-select'>Contacts</h2>

      <div className='account'>
        {SUPPORT_CONTACTS.map((contact) => (
          <a
            key={contact.phone}
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className='flex flex-v-center flex-space-between'
          >
            <div className='flex flex-v-center'>
              <span className='material-symbols-outlined'>call</span>
              {contact.label}
            </div>
            <span className='contact-phone'>{contact.phone}</span>
          </a>
        ))}
      </div>

      <Divider />
    </Layout>
  );
};

export default Support;
