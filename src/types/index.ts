export interface Account {
  id: string;
  name: string;
  currency: string;
  currencySymbol: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  name: string;
  date: string;
  time: string;
  icon: string;
  color: string;
  amount: number;
  currencySymbol: string;
  // 'debit' subtracts from balance, 'credit' adds to it
  kind: 'debit' | 'credit';
  timestamp?: number;
}
