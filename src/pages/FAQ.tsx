import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

const FAQ_ITEMS = [
  {
    question: 'How do I transfer money to another person?',
    answer:
      'Go to the Home screen and tap "Transfer" or use the Transfer section from the bottom navigation. Enter the recipient\'s account number, name, and the amount you wish to send. Transfers between your own accounts are also available - select the source and destination accounts and confirm the amount. All transfers are processed instantly during business hours.',
  },
  {
    question: 'What are the daily transfer limits?',
    answer:
      'Standard accounts have a daily transfer limit of €5,000 (or equivalent in UAH). Premium account holders enjoy higher limits of up to €25,000 per day. International transfers may have separate limits depending on the destination country and currency. You can view your current limits in the account details section on the Home screen.',
  },
  {
    question: 'How can I open a new card or account?',
    answer:
      'New cards and additional accounts cannot be opened directly through the mobile app at this time. To request a new card or open an additional account, please contact your personal manager or call our customer support line. Your manager will guide you through the application process and required documents.',
  },
  {
    question: 'How do I view my transaction history?',
    answer:
      'Your recent transactions are displayed on the Home screen. For a full history, navigate to the Transactions tab in the bottom navigation. You can filter transactions by date, type, and amount. You can also download a PDF statement for any period from the Statements screen.',
  },
  {
    question: 'What should I do if I lose my card?',
    answer:
      'If your card is lost or stolen, contact us immediately at +420 234 092 333 (available on weekdays 8:00–17:30). We will block your card to prevent unauthorized use. You can also reach your personal manager during business hours. A replacement card will be issued within 3-5 business days and delivered to your registered address.',
  },
  {
    question: 'How does the Savings account work?',
    answer:
      'Our Savings accounts offer competitive Annual Equivalent Rates (AER) on deposits in multiple currencies. Select your preferred currency on the Savings page to see the current rate. Interest is calculated daily and paid monthly. There is no minimum deposit required to open a Savings account, and you can withdraw funds at any time without penalty.',
  },
  {
    question: 'Is my money safe?',
    answer:
      'Yes. All customer deposits are protected under applicable deposit guarantee schemes. We use bank-grade encryption for all data transmitted through the app, and two-factor authentication is available for additional security. We never share your personal or financial information with third parties without your explicit consent.',
  },
  {
    question: 'How do I change my account settings?',
    answer:
      'Go to your Profile from the bottom navigation. From there you can update your personal information, manage security and privacy settings, configure notification preferences, and adjust appearance options. For changes that require identity verification (such as updating your registered address), please contact support.',
  },
  {
    question: 'What fees apply to transfers and account maintenance?',
    answer:
      'Transfers between your own accounts and to other accounts within the app are free of charge (0% commission). International SWIFT transfers may incur a fixed fee charged by intermediary banks, which is disclosed before you confirm the transfer. There are no monthly maintenance fees on standard or Savings accounts.',
  },
  {
    question: 'How do I download an account statement?',
    answer:
      'Open the Transactions tab and tap "Statements". Choose whether you need a statement for the last 30 days or the last 365 days, then tap "Download statement (PDF)". The file includes your account requisites, a full list of transactions for the selected period, and the bank official certification footer.',
  },
  {
    question: 'How do I reveal my full card number and CVV?',
    answer:
      'On the Cards screen, tap a card once to reveal the full card number - tap again to hide it. Double-tap the card to flip it and view the CVV code on the back. For your security, avoid revealing your card details in public places or screenshots.',
  },
  {
    question: 'What should I do if I notice an unrecognized transaction?',
    answer:
      'Open the transaction from your Transactions list to view its full details, including the exact date, time, and balance before and after the transaction. From there you can tap "Ask a question" to contact support directly about that specific transaction, or download a PDF receipt for your records.',
  },
  {
    question: 'Can I use the app in a different currency?',
    answer:
      'Yes. Tap the account name on the Home screen to switch between your EUR and UAH accounts - the balance, card, and transaction history will update accordingly. You can transfer funds between your own accounts in different currencies at any time from the Transfer screen.',
  },
];

const FAQ: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>FAQ</h1>

    <p className='information text-shadow'>
      Find answers to the most frequently asked questions about your account, cards, and transfers.
    </p>

    <Divider />

    <div className='faq'>
      {FAQ_ITEMS.map((item) => (
        <div key={item.question} className='faq-item'>
          <h3 className='faq-question no-select'>{item.question}</h3>
          <p className='faq-answer text-shadow'>{item.answer}</p>
        </div>
      ))}
    </div>

    <Divider />
  </Layout>
);

export default FAQ;
