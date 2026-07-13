import type { Transaction } from '../types';

export type StatementPeriod = 'month' | 'year';

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** Number of trailing days covered by each statement period. */
export const PERIOD_DAYS: Record<StatementPeriod, number> = {
  month: 30,
  year: 365,
};

/**
 * Resolves a stable timestamp for a transaction, using the stored value or parsing the display date.
 */
export function getTransactionTimestamp(transaction: Transaction, referenceYear?: number): number {
  if (transaction.timestamp) return transaction.timestamp;

  const dateParts = transaction.date.replace(',', '').split(/\s+/);
  const monthLabel = dateParts[0];
  const day = Number.parseInt(dateParts[1], 10);
  const parsedYear = dateParts[2] ? Number.parseInt(dateParts[2], 10) : undefined;
  const month = MONTHS[monthLabel];
  const year = parsedYear ?? referenceYear ?? new Date().getFullYear();

  if (month === undefined || Number.isNaN(day)) return 0;

  const [hours, minutes] = transaction.time.split(':').map((part) => Number.parseInt(part, 10));

  return new Date(
    year,
    month,
    day,
    Number.isNaN(hours) ? 0 : hours,
    Number.isNaN(minutes) ? 0 : minutes
  ).getTime();
}

/**
 * Filters transactions to a trailing window: the last 30 days ("month") or the last 365 days ("year"),
 * counted back from `referenceDate` (defaults to now) - not the calendar month/year.
 */
export function filterTransactionsByPeriod(
  transactions: Transaction[],
  period: StatementPeriod,
  referenceDate: Date = new Date()
): Transaction[] {
  const refTime = referenceDate.getTime();
  const windowStart = refTime - PERIOD_DAYS[period] * DAY_MS;

  return transactions.filter((transaction) => {
    const timestamp = getTransactionTimestamp(transaction, referenceDate.getFullYear());

    return timestamp >= windowStart && timestamp <= refTime;
  });
}

/**
 * Human-readable label for the selected statement period.
 */
export function getStatementPeriodLabel(period: StatementPeriod): string {
  return period === 'month' ? 'Last 30 days' : 'Last 365 days';
}
