import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Circle from '../components/Circle/Circle';
import Divider from '../components/Divider/Divider';
import ProcessingScreen from '../components/ProcessingScreen/ProcessingScreen';

import { useAppContext } from '../context/AppContext';
import { getTransactionBalances } from '../utils/transactionBalances';
import { generateReceiptPdf } from '../utils/generateReceiptPdf';
import { waitForPdfLoading } from '../utils/pdfLoadingDelay';
import { formatAmount } from '../utils/formatAmount';

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactions, getAccount } = useAppContext();

  const [downloading, setDownloading] = useState(false);

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <Layout>
        <Divider />
        <h1 className='title no-select'>Transaction</h1>
        <p className='information text-shadow center'>Transaction not found.</p>
        <div className='transaction-detail-actions'>
          <button type='button' className='button' onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
        <Divider />
      </Layout>
    );
  }

  const account = getAccount(transaction.accountId);
  const accountTransactions = transactions.filter((t) => t.accountId === transaction.accountId);
  const balances = account
    ? getTransactionBalances(transaction.id, accountTransactions, account.balance)
    : null;

  const handleDownloadReceipt = async (): Promise<void> => {
    if (!account || !balances) return;

    setDownloading(true);

    try {
      await waitForPdfLoading();
      await generateReceiptPdf(account, transaction, balances.balanceBefore, balances.balanceAfter);
    } finally {
      setDownloading(false);
    }
  };

  if (downloading) {
    return (
      <Layout>
        <Divider />
        <ProcessingScreen
          title='Preparing receipt'
          message='Please wait while we generate your PDF receipt...'
        />
        <Divider />
      </Layout>
    );
  }

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Transaction</h1>

      <div className='transaction-detail'>
        <div className='transaction-detail-header flex flex-v-center'>
          <Circle color={transaction.color} icon={transaction.icon} />
          <div className='transaction-detail-title flex flex-col'>
            <span className='name'>{transaction.name}</span>
            <span
              className={`transaction-detail-amount ${transaction.kind === 'credit' ? 'amount-credit' : ''}`}
            >
              {transaction.currencySymbol}
              {formatAmount(transaction.amount)}
            </span>
          </div>
        </div>

        <div className='transaction-detail-rows'>
          <div className='transaction-detail-row flex flex-space-between'>
            <span className='transaction-detail-label'>Date</span>
            <span>{transaction.date}</span>
          </div>
          <div className='transaction-detail-row flex flex-space-between'>
            <span className='transaction-detail-label'>Time</span>
            <span>{transaction.time}</span>
          </div>
          <div className='transaction-detail-row flex flex-space-between'>
            <span className='transaction-detail-label'>Type</span>
            <span>{transaction.kind === 'credit' ? 'Credit' : 'Debit'}</span>
          </div>
          {account && (
            <div className='transaction-detail-row flex flex-space-between'>
              <span className='transaction-detail-label'>Account</span>
              <span>
                {account.name} ({account.currency})
              </span>
            </div>
          )}
          {balances && (
            <>
              <div className='transaction-detail-row flex flex-space-between'>
                <span className='transaction-detail-label'>Balance before</span>
                <span>
                  {transaction.currencySymbol}
                  {formatAmount(balances.balanceBefore)}
                </span>
              </div>
              <div className='transaction-detail-row flex flex-space-between'>
                <span className='transaction-detail-label'>Balance after</span>
                <span>
                  {transaction.currencySymbol}
                  {formatAmount(balances.balanceAfter)}
                </span>
              </div>
            </>
          )}
          <div className='transaction-detail-row flex flex-space-between'>
            <span className='transaction-detail-label'>Transaction ID</span>
            <span className='transaction-detail-id'>{transaction.id}</span>
          </div>
        </div>
      </div>

      <Divider />

      <div className='transaction-detail-actions flex flex-col'>
        <Link to='/support' className='transaction-detail-button flex flex-v-center flex-h-center'>
          <span className='material-symbols-outlined'>support_agent</span>
          Ask a question
        </Link>
        <button
          type='button'
          onClick={handleDownloadReceipt}
          disabled={downloading || !balances}
          className='transaction-detail-button flex flex-v-center flex-h-center'
        >
          <span className='material-symbols-outlined'>picture_as_pdf</span>
          Get PDF receipt
        </button>
      </div>

      <Divider />
    </Layout>
  );
};

export default TransactionDetail;
