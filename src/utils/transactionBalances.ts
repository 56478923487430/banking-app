import type { Transaction } from '../types';

/**
 * Computes the account balance immediately before and after a given transaction,
 * by replaying newer transactions backwards from the current balance.
 */
export function getTransactionBalances(
  transactionId: string,
  accountTransactions: Transaction[],
  currentBalance: number
): { balanceBefore: number; balanceAfter: number } | null {
  const index = accountTransactions.findIndex((t) => t.id === transactionId);

  if (index === -1) return null;

  let balanceAfter = currentBalance;

  for (let i = 0; i < index; i++) {
    const t = accountTransactions[i];

    if (t.kind === 'debit') balanceAfter += t.amount;
    else balanceAfter -= t.amount;
  }

  const transaction = accountTransactions[index];
  const balanceBefore =
    transaction.kind === 'debit'
      ? balanceAfter + transaction.amount
      : balanceAfter - transaction.amount;

  return { balanceBefore, balanceAfter };
}
