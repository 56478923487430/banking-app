import { useState } from 'react';

// components
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import ProcessingScreen from '../components/ProcessingScreen/ProcessingScreen';

// context
import { useAppContext } from '../context/AppContext';

// utils
import { generateStatementPdf } from '../utils/generateStatementPdf';
import { waitForPdfLoading } from '../utils/pdfLoadingDelay';
import {
  filterTransactionsByPeriod,
  getStatementPeriodLabel,
  type StatementPeriod,
} from '../utils/filterTransactionsByPeriod';

const Statements: React.FC = () => {
  const { transactions, selectedAccountId, getAccount } = useAppContext();

  const [downloading, setDownloading] = useState<boolean>(false);
  const [period, setPeriod] = useState<StatementPeriod>('month');

  const account = getAccount(selectedAccountId);

  const accountTransactions = transactions.filter((t) => t.accountId === selectedAccountId);
  const periodTransactions = filterTransactionsByPeriod(accountTransactions, period);
  const periodLabel = getStatementPeriodLabel(period);

  const handleDownload = async (): Promise<void> => {
    if (!account) return;

    setDownloading(true);

    try {
      await waitForPdfLoading();
      await generateStatementPdf(account, periodTransactions, period);
    } finally {
      setDownloading(false);
    }
  };

  if (downloading) {
    return (
      <Layout>
        <Divider />
        <ProcessingScreen
          title='Preparing statement'
          message='Please wait while we generate your PDF statement...'
        />
        <Divider />
      </Layout>
    );
  }

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Statements</h1>

      <div className='statement-download flex flex-col flex-v-center'>
        <p className='information text-shadow center'>
          Choose a period and download a PDF statement for your {account?.name ?? ''} account.
        </p>

        <div className='statement-period-toggle destination-toggle flex flex-space-between'>
          <button
            type='button'
            onClick={() => setPeriod('month')}
            className={`destination-toggle-option ${period === 'month' ? 'active' : ''}`}
          >
            Last 30 days
          </button>
          <button
            type='button'
            onClick={() => setPeriod('year')}
            className={`destination-toggle-option ${period === 'year' ? 'active' : ''}`}
          >
            Last 365 days
          </button>
        </div>

        <p className='statement-period-label text-shadow no-select center'>
          {periodTransactions.length} transaction{periodTransactions.length === 1 ? '' : 's'} for{' '}
          {periodLabel}
        </p>

        <button
          type='button'
          onClick={handleDownload}
          disabled={downloading || !account}
          className='statement-download-button flex flex-v-center flex-h-center no-select'
        >
          <span className='material-symbols-outlined'>picture_as_pdf</span>
          {`Download statement (PDF) — ${periodLabel}`}
        </button>
      </div>

      <Divider />
    </Layout>
  );
};

export default Statements;
