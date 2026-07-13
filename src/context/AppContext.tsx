import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { Account, Transaction } from '../types';
import { defaultTransactions } from '../constants/transactions';

const STORAGE_KEY = 'banking-app-state-v4';

const defaultAccounts: Account[] = [
  { id: 'main', name: 'Main', currency: 'EURO', currencySymbol: '€', balance: 2873.21 },
  { id: 'uah', name: 'UAH Account', currency: 'UAH', currencySymbol: '₴', balance: 849351.47 },
];

interface TransferToPersonInput {
  fromAccountId: string;
  recipientName: string;
  recipientNumber: string;
  amount: number;
}

interface TransferOwnInput {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

interface AppContextValue {
  accounts: Account[];
  transactions: Transaction[];
  selectedAccountId: string;
  selectAccount: (id: string) => void;
  getAccount: (id: string) => Account | undefined;
  transferToPerson: (input: TransferToPersonInput) => {
    ok: boolean;
    error?: string;
    transactionId?: string;
  };
  transferOwn: (input: TransferOwnInput) => { ok: boolean; error?: string; transactionId?: string };
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function loadInitialState(): { accounts: Account[]; transactions: Transaction[] } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return { accounts: defaultAccounts, transactions: defaultTransactions };

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed.accounts) && Array.isArray(parsed.transactions)) {
      return { accounts: parsed.accounts, transactions: parsed.transactions };
    }

    return { accounts: defaultAccounts, transactions: defaultTransactions };
  } catch {
    return { accounts: defaultAccounts, transactions: defaultTransactions };
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = useMemo(() => loadInitialState(), []);

  const [accounts, setAccounts] = useState<Account[]>(initial.accounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initial.transactions);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    initial.accounts[0]?.id ?? 'main'
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accounts, transactions }));
    } catch {
      // storage unavailable (private mode, quota, etc) - fail silently, app still works in-memory
    }
  }, [accounts, transactions]);

  const getAccount = (id: string): Account | undefined => accounts.find((a) => a.id === id);

  const selectAccount = (id: string): void => {
    setSelectedAccountId(id);
  };

  const addTransaction = (transaction: Transaction): void => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const today = (): string =>
    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const now = (): string =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const transferToPerson = ({
    fromAccountId,
    recipientName,
    recipientNumber,
    amount,
  }: TransferToPersonInput): { ok: boolean; error?: string; transactionId?: string } => {
    const account = getAccount(fromAccountId);

    if (!account) return { ok: false, error: 'Account not found' };
    if (!amount || amount <= 0) return { ok: false, error: 'Enter a valid amount' };
    if (amount > account.balance) return { ok: false, error: 'Insufficient balance' };

    setAccounts((prev) =>
      prev.map((a) => (a.id === fromAccountId ? { ...a, balance: a.balance - amount } : a))
    );

    const transactionId = `tr-${Date.now()}`;

    addTransaction({
      id: transactionId,
      accountId: fromAccountId,
      name: `Transfer to ${recipientName || recipientNumber}`,
      date: today(),
      time: now(),
      icon: 'send',
      color: 'blue',
      amount,
      currencySymbol: account.currencySymbol,
      kind: 'debit',
      timestamp: Date.now(),
    });

    return { ok: true, transactionId };
  };

  const transferOwn = ({
    fromAccountId,
    toAccountId,
    amount,
  }: TransferOwnInput): { ok: boolean; error?: string; transactionId?: string } => {
    const fromAccount = getAccount(fromAccountId);
    const toAccount = getAccount(toAccountId);

    if (!fromAccount || !toAccount) return { ok: false, error: 'Account not found' };
    if (fromAccountId === toAccountId) return { ok: false, error: 'Choose two different accounts' };
    if (!amount || amount <= 0) return { ok: false, error: 'Enter a valid amount' };
    if (amount > fromAccount.balance) return { ok: false, error: 'Insufficient balance' };

    // Note: this is a template - it moves the numeric amount as-is between accounts.
    // For real cross-currency transfers, convert `amount` using an exchange rate before crediting `toAccount`.
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.id === fromAccountId) return { ...a, balance: a.balance - amount };
        if (a.id === toAccountId) return { ...a, balance: a.balance + amount };

        return a;
      })
    );

    const outTransactionId = `tr-${Date.now()}-out`;

    addTransaction({
      id: outTransactionId,
      accountId: fromAccountId,
      name: `Transfer to ${toAccount.name}`,
      date: today(),
      time: now(),
      icon: 'sync_alt',
      color: 'blue',
      amount,
      currencySymbol: fromAccount.currencySymbol,
      kind: 'debit',
      timestamp: Date.now(),
    });

    addTransaction({
      id: `tr-${Date.now()}-in`,
      accountId: toAccountId,
      name: `Transfer from ${fromAccount.name}`,
      date: today(),
      time: now(),
      icon: 'sync_alt',
      color: 'green',
      amount,
      currencySymbol: toAccount.currencySymbol,
      kind: 'credit',
      timestamp: Date.now(),
    });

    return { ok: true, transactionId: outTransactionId };
  };

  const value: AppContextValue = {
    accounts,
    transactions,
    selectedAccountId,
    selectAccount,
    getAccount,
    transferToPerson,
    transferOwn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) throw new Error('useAppContext must be used within AppProvider');

  return context;
}
