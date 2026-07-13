import { USER_NAME } from './user';

export const BANK_NAME = 'Citfin';
export const BANK_LEGAL_NAME = 'Citfin a.s.';
export const BANK_WEBSITE = 'https://www.citfin.eu/';

export const STATEMENT_NUMBER = '4HDUOD7971DJM6BB';

export const IBAN_MAIN = 'UA213052990000026004123456789';
export const IBAN_UAH = 'UA213223130000026005987654321';

export function formatIban(iban: string): string {
  const clean = iban.replace(/\s/g, '').toUpperCase();

  if (clean.startsWith('UA') && clean.length === 29) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 10)} ${clean.slice(10, 16)} ${clean.slice(16, 20)} ${clean.slice(20)}`;
  }

  return clean.replace(/(.{4})/g, '$1 ').trim();
}

export const BANK_CONTACTS = {
  phone: '+420 234 092 333',
  email: 'info@citfin.cz',
  address: 'Bucharova 1423/6, 158 00 Praha 5, Czech Republic',
};

export const SUPPORT_CONTACTS = [
  { label: 'Customer support', phone: '+420 234 092 333' },
  { label: 'Personal manager', phone: '+420 234 092 011' },
  { label: 'Card services', phone: '+420 234 092 322' },
];

export const ACCOUNT_REQUISITES = {
  main: {
    iban: IBAN_MAIN,
    ibanFormatted: formatIban(IBAN_MAIN),
    swift: 'CITFCZPP',
    bankName: BANK_NAME,
    beneficiary: USER_NAME,
    accountNumber: IBAN_MAIN,
  },
  uah: {
    iban: IBAN_UAH,
    ibanFormatted: formatIban(IBAN_UAH),
    swift: 'CITFCZPP',
    bankName: BANK_NAME,
    beneficiary: USER_NAME,
    accountNumber: IBAN_UAH,
  },
};

export const SWIFT_REQUISITES = {
  beneficiaryName: USER_NAME,
  beneficiaryAddress: 'Kyiv, Ukraine',
  iban: IBAN_MAIN,
  ibanFormatted: formatIban(IBAN_MAIN),
  ibanUah: IBAN_UAH,
  ibanUahFormatted: formatIban(IBAN_UAH),
  swiftBic: 'CITFCZPP',
  bankName: BANK_NAME,
  bankAddress: BANK_CONTACTS.address,
  correspondentBank: 'Deutsche Bank AG',
  correspondentSwift: 'DEUTDEFF',
  correspondentAccount: 'DE89370400440532013000',
  paymentPurpose: `Transfer to personal account of ${USER_NAME}`,
  paymentReference: 'INV-2026-00481',
};
