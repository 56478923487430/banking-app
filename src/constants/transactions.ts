import type { Transaction } from '../types';
import { generateTransactionId } from '../utils/generateTransactionId';

const makeTimestamp = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): number => new Date(year, month - 1, day, hour, minute).getTime();

interface TransactionTemplate {
  name: string;
  icon: string;
  color: string;
  currencySymbol: string;
  accountId: string;
  kind: 'debit' | 'credit';
  min: number;
  max: number;
}

/** Merchant/transfer templates used to generate the default transaction history. */
const TEMPLATES: TransactionTemplate[] = [
  {
    name: 'ONLINE BEV',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 900,
    max: 1150,
  },
  {
    name: 'NIKE ONLINE STORE',
    icon: 'shopping_bag',
    color: 'red',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 180,
    max: 230,
  },
  {
    name: 'POS DEBIT ROZETKA.UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 12000,
    max: 25000,
  },
  {
    name: 'Visa Direct',
    icon: 'send',
    color: 'blue',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 43000,
    max: 78500,
  },
  {
    name: 'Transfer from own business account',
    icon: 'account_balance',
    color: 'green',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'credit',
    min: 142000,
    max: 198500,
  },
  {
    name: 'UBER *TRIP',
    icon: 'directions_car',
    color: 'blue',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 25,
    max: 40,
  },
  {
    name: 'RESTAURANT',
    icon: 'restaurant',
    color: 'yellow',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2800,
    max: 3700,
  },
  {
    name: 'POS DEBIT COMFY STORE',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 9600,
    max: 28800,
  },
  {
    name: 'AIRBNB ACCOMMODATION',
    icon: 'hotel',
    color: 'yellow',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 420,
    max: 620,
  },
  {
    name: 'FACEBK ADS',
    icon: 'campaign',
    color: 'purple',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2400,
    max: 4800,
  },
  {
    name: 'POS DEBIT WOG FUEL',
    icon: 'local_gas_station',
    color: 'gray',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 3100,
    max: 3900,
  },
  {
    name: 'AMAZON EU',
    icon: 'shopping_bag',
    color: 'red',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 125,
    max: 165,
  },
  {
    name: 'POS DEBIT NOVUS MARKET',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2100,
    max: 2900,
  },
  {
    name: 'RESTAURANT',
    icon: 'restaurant',
    color: 'yellow',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 55,
    max: 95,
  },
  {
    name: 'POS DEBIT GOODWINE KYIV',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 4800,
    max: 6300,
  },
  {
    name: 'GOOGLE *STORAGE',
    icon: 'sync',
    color: 'orange',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 899,
    max: 899,
  },
  {
    name: 'POS DEBIT EPICENTR KYIV',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 14600,
    max: 22500,
  },
  {
    name: 'BOOKING.COM',
    icon: 'hotel',
    color: 'yellow',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 190,
    max: 585,
  },
  {
    name: 'CONTACTLESS PAYMENT',
    icon: 'contactless',
    color: 'purple',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 1280,
    max: 1740,
  },
  {
    name: 'PAYPAL *EBAY',
    icon: 'campaign',
    color: 'purple',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 3800,
    max: 5930,
  },
  {
    name: 'SHELL OIL',
    icon: 'local_gas_station',
    color: 'gray',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 73,
    max: 90,
  },
  {
    name: 'POS DEBIT IKEA UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 18000,
    max: 19700,
  },
  {
    name: 'APPLE.COM',
    icon: 'sync',
    color: 'orange',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 9,
    max: 30,
  },
  {
    name: 'POS DEBIT SILPO KYIV UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2100,
    max: 2500,
  },
  {
    name: 'POS DEBIT AUCHAN LVIV UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 1800,
    max: 2700,
  },
  {
    name: 'HOTEL BOOKING',
    icon: 'hotel',
    color: 'yellow',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 350,
    max: 470,
  },
  {
    name: 'apple.com/bill',
    icon: 'sync',
    color: 'orange',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 1199,
    max: 1199,
  },
  {
    name: 'POS DEBIT ALLURE HOME UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 9800,
    max: 12000,
  },
  {
    name: 'POS DEBIT FOZZY MARKET',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2300,
    max: 2700,
  },
  {
    name: 'POS DEBIT JYSK UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 7800,
    max: 9500,
  },
  {
    name: 'POS DEBIT CITRUS UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 16000,
    max: 19500,
  },
  {
    name: 'POS DEBIT MOYO UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 10500,
    max: 13000,
  },
  {
    name: 'POS DEBIT METRO KYIV UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 3800,
    max: 5000,
  },
  {
    name: 'POS DEBIT VARUS MARKET',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2000,
    max: 2700,
  },
  {
    name: 'POS DEBIT OKKO LVIV',
    icon: 'local_gas_station',
    color: 'gray',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 2900,
    max: 3900,
  },
  {
    name: 'POS DEBIT INTERTOP UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 5200,
    max: 7000,
  },
  {
    name: 'POS DEBIT FOXTROT UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 14000,
    max: 18000,
  },
  {
    name: 'SPOTIFY',
    icon: 'sync',
    color: 'orange',
    currencySymbol: '€',
    accountId: 'main',
    kind: 'debit',
    min: 10.99,
    max: 10.99,
  },
  {
    name: 'POS DEBIT ALLO.UA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 9500,
    max: 13500,
  },
  {
    name: 'POS DEBIT ZARA ONLINE',
    icon: 'shopping_bag',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 6200,
    max: 8600,
  },
  {
    name: 'POS DEBIT ATB MARKET ODESA',
    icon: 'shopping_cart',
    color: 'red',
    currencySymbol: '₴',
    accountId: 'uah',
    kind: 'debit',
    min: 1500,
    max: 2000,
  },
];

/** Days that have at least one transaction. Each day gets 1-8 randomly generated transactions. */
const ANCHOR_DATES: Array<[number, number, number]> = [
  [2024, 9, 2],
  [2024, 9, 5],
  [2024, 9, 6],
  [2024, 9, 11],
  [2024, 9, 19],
  [2024, 9, 22],
  [2024, 9, 24],
  [2024, 9, 29],
  [2024, 10, 3],
  [2024, 10, 8],
  [2024, 10, 9],
  [2024, 10, 11],
  [2024, 10, 17],
  [2024, 10, 18],
  [2024, 10, 27],
  [2024, 11, 4],
  [2024, 11, 6],
  [2024, 11, 8],
  [2024, 11, 10],
  [2024, 11, 14],
  [2024, 11, 20],
  [2024, 11, 23],
  [2024, 11, 29],
  [2024, 12, 3],
  [2024, 12, 9],
  [2024, 12, 12],
  [2024, 12, 15],
  [2024, 12, 19],
  [2024, 12, 22],
  [2024, 12, 28],
  [2025, 1, 6],
  [2025, 1, 8],
  [2025, 1, 10],
  [2025, 1, 12],
  [2025, 1, 16],
  [2025, 1, 18],
  [2025, 1, 22],
  [2025, 1, 27],
  [2025, 1, 30],
  [2025, 2, 5],
  [2025, 2, 7],
  [2025, 2, 9],
  [2025, 2, 12],
  [2025, 2, 18],
  [2025, 2, 21],
  [2025, 2, 27],
  [2025, 2, 28],
  [2025, 3, 3],
  [2025, 3, 6],
  [2025, 3, 9],
  [2025, 3, 12],
  [2025, 3, 15],
  [2025, 3, 20],
  [2025, 3, 27],
  [2025, 3, 29],
  [2025, 4, 2],
  [2025, 4, 8],
  [2025, 4, 9],
  [2025, 4, 10],
  [2025, 4, 18],
  [2025, 4, 20],
  [2025, 4, 24],
  [2025, 4, 30],
  [2025, 5, 5],
  [2025, 5, 7],
  [2025, 5, 9],
  [2025, 5, 18],
  [2025, 5, 31],
  [2025, 6, 3],
  [2025, 6, 10],
  [2025, 6, 11],
  [2025, 6, 13],
  [2025, 6, 17],
  [2025, 6, 23],
  [2025, 6, 29],
  [2025, 7, 2],
  [2025, 7, 8],
  [2025, 7, 10],
  [2025, 7, 12],
  [2025, 7, 16],
  [2025, 7, 21],
  [2025, 7, 25],
  [2025, 7, 30],
  [2025, 8, 4],
  [2025, 8, 6],
  [2025, 8, 8],
  [2025, 8, 19],
  [2025, 8, 28],
  [2025, 9, 3],
  [2025, 9, 9],
  [2025, 9, 14],
  [2025, 9, 26],
  [2025, 10, 2],
  [2025, 10, 7],
  [2025, 10, 9],
  [2025, 10, 11],
  [2025, 10, 14],
  [2025, 10, 17],
  [2025, 10, 22],
  [2025, 10, 29],
  [2025, 11, 4],
  [2025, 11, 8],
  [2025, 11, 9],
  [2025, 11, 15],
  [2025, 11, 18],
  [2025, 11, 21],
  [2025, 11, 28],
  [2025, 12, 1],
  [2025, 12, 5],
  [2025, 12, 7],
  [2025, 12, 10],
  [2025, 12, 12],
  [2025, 12, 18],
  [2025, 12, 23],
  [2025, 12, 30],
  [2026, 1, 3],
  [2026, 1, 10],
  [2026, 1, 12],
  [2026, 1, 14],
  [2026, 1, 20],
  [2026, 1, 25],
  [2026, 1, 31],
  [2026, 2, 6],
  [2026, 2, 9],
  [2026, 2, 11],
  [2026, 2, 14],
  [2026, 2, 18],
  [2026, 2, 24],
  [2026, 2, 27],
  [2026, 3, 2],
  [2026, 3, 3],
  [2026, 3, 5],
  [2026, 3, 6],
  [2026, 3, 9],
  [2026, 3, 13],
  [2026, 3, 17],
  [2026, 3, 23],
  [2026, 3, 30],
  [2026, 4, 2],
  [2026, 4, 8],
  [2026, 4, 9],
  [2026, 4, 12],
  [2026, 4, 15],
  [2026, 4, 18],
  [2026, 4, 21],
  [2026, 4, 24],
  [2026, 4, 30],
  [2026, 5, 5],
  [2026, 5, 9],
  [2026, 5, 13],
  [2026, 5, 17],
  [2026, 5, 20],
  [2026, 5, 24],
  [2026, 5, 29],
  [2026, 6, 1],
  [2026, 6, 3],
  [2026, 6, 6],
  [2026, 6, 8],
  [2026, 6, 12],
  [2026, 6, 15],
  [2026, 6, 18],
  [2026, 6, 24],
  [2026, 6, 28],
  [2026, 6, 30],
  [2026, 7, 2],
  [2026, 7, 7],
  [2026, 7, 8],
  [2026, 7, 9],
  [2026, 7, 10],
];

const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

// Fixed seed so the generated history (and its totals) is stable across reloads
// instead of a fresh random shuffle every time the app starts with an empty store.
const RNG_SEED = 42;

function createSeededRandom(seed: number): () => number {
  let state = seed;

  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;

    let t = Math.imul(state ^ (state >>> 15), 1 | state);

    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = createSeededRandom(RNG_SEED);

const randomInt = (min: number, max: number): number =>
  Math.floor(random() * (max - min + 1)) + min;

const randomAmount = (min: number, max: number): number => {
  const value = min === max ? min : random() * (max - min) + min;

  return Math.round(value * 100) / 100;
};

const pickTemplate = (): TransactionTemplate => TEMPLATES[randomInt(0, TEMPLATES.length - 1)];

/** Generates between 1 and 8 randomized transactions for a single calendar day. */
function generateTransactionsForDay(year: number, month: number, day: number): Transaction[] {
  const count = randomInt(1, 8);
  const date = DATE_LABEL_FORMATTER.format(new Date(year, month - 1, day));

  // Distinct, descending times through the day so the day's items read newest-first.
  const minutesOfDay = new Set<number>();

  while (minutesOfDay.size < count) {
    minutesOfDay.add(randomInt(7 * 60, 23 * 60 + 59));
  }

  const sortedMinutes = Array.from(minutesOfDay).sort((a, b) => b - a);

  return sortedMinutes.map((totalMinutes) => {
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const template = pickTemplate();
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    return {
      id: generateTransactionId(),
      accountId: template.accountId,
      name: template.name,
      date,
      time,
      icon: template.icon,
      color: template.color,
      amount: randomAmount(template.min, template.max),
      currencySymbol: template.currencySymbol,
      kind: template.kind,
      timestamp: makeTimestamp(year, month, day, hour, minute),
    };
  });
}

// Must match the UAH account's starting balance in AppContext.tsx (defaultAccounts).
// The generated history is cosmetic and doesn't feed the account balance directly, so
// without this calibration step total UAH credits/debits could sum to a number that
// doesn't reconcile with the balance shown elsewhere in the app.
const UAH_TARGET_BALANCE = 849351.47;

/**
 * Scales down the generated UAH debit amounts so that, across the whole history,
 * total UAH credits minus total UAH debits equals the UAH account's balance.
 */
function calibrateUahDebits(transactions: Transaction[]): Transaction[] {
  const isUah = (t: Transaction): boolean => t.currencySymbol === '₴';

  const totalUahCredits = transactions
    .filter((t) => isUah(t) && t.kind === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalUahDebits = transactions
    .filter((t) => isUah(t) && t.kind === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  if (totalUahDebits <= 0) return transactions;

  const targetDebits = totalUahCredits - UAH_TARGET_BALANCE;
  const scale = Math.min(1, Math.max(0, targetDebits / totalUahDebits));

  return transactions.map((t) =>
    isUah(t) && t.kind === 'debit' ? { ...t, amount: Math.round(t.amount * scale * 100) / 100 } : t
  );
}

function generateDefaultTransactions(): Transaction[] {
  const all = ANCHOR_DATES.flatMap(([year, month, day]) =>
    generateTransactionsForDay(year, month, day)
  );
  const calibrated = calibrateUahDebits(all);

  return calibrated.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
}

/** Default transaction history: Sep 2024 - Jul 2026, newest first, 1-8 transactions per active day. */
export const defaultTransactions: Transaction[] = generateDefaultTransactions();
