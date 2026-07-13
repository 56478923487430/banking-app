import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

import { USER_NAME } from '../constants/user';
import { ACCOUNT_REQUISITES } from '../constants/bank';
import { useAppContext } from '../context/AppContext';
import { formatAmount } from '../utils/formatAmount';

const OPENED_DATE: Record<string, string> = {
  main: '14 Mar 2023',
  uah: '02 Sep 2024',
};

const Details: React.FC = () => {
  const { selectedAccountId, getAccount } = useAppContext();

  const account = getAccount(selectedAccountId);
  const requisites = ACCOUNT_REQUISITES[selectedAccountId as keyof typeof ACCOUNT_REQUISITES];

  if (!account) {
    return (
      <Layout>
        <Divider />
        <p className='information text-shadow center'>Account not found.</p>
        <Divider />
      </Layout>
    );
  }

  const rows = [
    { label: 'Account holder', value: USER_NAME },
    { label: 'Account name', value: account.name },
    { label: 'Currency', value: account.currency },
    { label: 'Balance', value: `${account.currencySymbol}${formatAmount(account.balance)}` },
    { label: 'IBAN', value: requisites?.ibanFormatted ?? '—' },
    { label: 'SWIFT / BIC', value: requisites?.swift ?? '—' },
    { label: 'Bank', value: requisites?.bankName ?? '—' },
    { label: 'Status', value: 'Active' },
    { label: 'Opened', value: OPENED_DATE[selectedAccountId] ?? '—' },
  ];

  return (
    <Layout>
      <Divider />

      <h1 className='title no-select'>Account details</h1>

      <Divider />

      <div className='requisites'>
        {rows.map((item) => (
          <div key={item.label} className='requisites-row flex flex-space-between'>
            <span className='requisites-label'>{item.label}</span>
            <span className='requisites-value'>{item.value}</span>
          </div>
        ))}
      </div>

      <Divider />
    </Layout>
  );
};

export default Details;
