import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';

import { SWIFT_REQUISITES } from '../constants/bank';

const REQUISITES = [
  { label: 'Beneficiary', value: SWIFT_REQUISITES.beneficiaryName },
  { label: 'Bank name', value: SWIFT_REQUISITES.bankName },
  { label: 'SWIFT / BIC', value: SWIFT_REQUISITES.swiftBic },
  { label: 'IBAN (EUR)', value: SWIFT_REQUISITES.ibanFormatted },
  { label: 'IBAN (UAH)', value: SWIFT_REQUISITES.ibanUahFormatted },
  { label: 'Bank address', value: SWIFT_REQUISITES.bankAddress },
  { label: 'Correspondent bank', value: SWIFT_REQUISITES.correspondentBank },
  { label: 'Correspondent SWIFT', value: SWIFT_REQUISITES.correspondentSwift },
  { label: 'Payment reference', value: SWIFT_REQUISITES.paymentReference },
];

const Requisites: React.FC = () => (
  <Layout>
    <Divider />

    <h1 className='title no-select'>Requisites</h1>

    <p className='information text-shadow'>
      Use these details for incoming SWIFT transfers to your account.
    </p>

    <Divider />

    <div className='requisites'>
      {REQUISITES.map((item) => (
        <div key={item.label} className='requisites-row flex flex-space-between'>
          <span className='requisites-label'>{item.label}</span>
          <span className='requisites-value'>{item.value}</span>
        </div>
      ))}
    </div>

    <Divider />

    <p className='information text-shadow'>
      Transfers are usually credited within 1–3 business days. Always include the payment reference
      in your transfer description.
    </p>

    <Divider />
  </Layout>
);

export default Requisites;
