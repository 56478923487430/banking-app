import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { Account, Transaction } from '../types';
import type { StatementPeriod } from './filterTransactionsByPeriod';
import { getStatementPeriodLabel } from './filterTransactionsByPeriod';
import { loadLogoDataUrl } from './loadLogoDataUrl';
import { formatPdfAmount } from './formatPdfAmount';
import { getPdfCurrencyLabel, getPdfLogoSize } from './pdfRenderSafety';
import { USER_NAME } from '../constants/user';
import {
  BANK_NAME,
  BANK_LEGAL_NAME,
  BANK_WEBSITE,
  STATEMENT_NUMBER,
  BANK_CONTACTS,
  ACCOUNT_REQUISITES,
} from '../constants/bank';

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 14;
const CITFIN_GREEN: [number, number, number] = [46, 139, 87];

/**
 * Generates and downloads a branded PDF account statement for the given account and transactions.
 */
export async function generateStatementPdf(
  account: Account,
  transactions: Transaction[],
  period: StatementPeriod
): Promise<void> {
  const doc = new jsPDF();
  const periodLabel = getStatementPeriodLabel(period);
  const sortedTransactions = [...transactions].sort(
    (a, b) => getSortTimestamp(a) - getSortTimestamp(b)
  );
  const requisites = ACCOUNT_REQUISITES[account.id as keyof typeof ACCOUNT_REQUISITES];
  const currencyLabel = getPdfCurrencyLabel(account.currencySymbol, account.currency);

  try {
    const logo = await loadLogoDataUrl('/images/logo.png');
    const { width, height } = getPdfLogoSize(logo.width, logo.height, 22);

    doc.addImage(logo.dataUrl, 'PNG', MARGIN, 10, width, height);
  } catch {
    // Logo is optional - statement still generates without it.
  }

  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  doc.text('Account Statement', 38, 17);

  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text(`Statement No. ${STATEMENT_NUMBER}`, 38, 23);
  doc.text(BANK_WEBSITE, 38, 28);

  doc.setDrawColor(...CITFIN_GREEN);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, 34, PAGE_WIDTH - MARGIN, 34);

  const leftLines = [
    `Account holder: ${USER_NAME}`,
    `Account: ${account.name} (${account.currency})`,
    `IBAN: ${requisites?.ibanFormatted ?? requisites?.iban ?? '\u2014'}`,
    `SWIFT / BIC: ${requisites?.swift ?? '\u2014'}`,
    `Bank: ${requisites?.bankName ?? BANK_NAME}`,
  ];

  const rightLines = [
    BANK_LEGAL_NAME,
    `Phone: ${BANK_CONTACTS.phone}`,
    `Email: ${BANK_CONTACTS.email}`,
    BANK_CONTACTS.address,
    BANK_WEBSITE,
  ];

  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);

  let leftY = 42;

  leftLines.forEach((line) => {
    doc.text(line, MARGIN, leftY);
    leftY += 5.5;
  });

  let rightY = 42;

  rightLines.forEach((line, index) => {
    doc.setFontSize(index === 0 ? 9.5 : 9);
    doc.setTextColor(index === 0 ? 20 : 100, index === 0 ? 20 : 100, index === 0 ? 20 : 100);
    doc.text(line, 118, rightY);
    rightY += 5.5;
  });

  const metaY = Math.max(leftY, rightY) + 2;

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Period: ${periodLabel}`, MARGIN, metaY);
  doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, MARGIN, metaY + 5.5);

  doc.setDrawColor(225, 225, 225);
  doc.line(MARGIN, metaY + 11, PAGE_WIDTH - MARGIN, metaY + 11);

  const tableStartY = metaY + 17;

  const rows = sortedTransactions.map((t) => [
    t.date,
    t.time,
    t.name,
    t.kind === 'credit' ? 'Credit' : 'Debit',
    formatPdfAmount(currencyLabel, t.amount),
  ]);

  if (rows.length === 0) {
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('No transactions for the selected period.', MARGIN, tableStartY + 6);
  } else {
    autoTable(doc, {
      startY: tableStartY,
      head: [['Date', 'Time', 'Description', 'Type', 'Amount']],
      body: rows,
      headStyles: { fillColor: CITFIN_GREEN, textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
      columnStyles: {
        4: { halign: 'right', cellWidth: 38 },
      },
      theme: 'striped',
      margin: { left: MARGIN, right: MARGIN },
    });
  }

  const totalCredits = sortedTransactions
    .filter((t) => t.kind === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = sortedTransactions
    .filter((t) => t.kind === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const afterTableY =
    rows.length === 0 ? tableStartY + 6 : ((doc as any).lastAutoTable?.finalY ?? tableStartY);

  let y = afterTableY;

  const ensureSpace = (needed: number): void => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN + 10;
    }
  };

  ensureSpace(40);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  y += 10;
  doc.text(`Total credits: ${formatPdfAmount(currencyLabel, totalCredits)}`, MARGIN, y);
  y += 7;
  doc.text(`Total debits: ${formatPdfAmount(currencyLabel, totalDebits)}`, MARGIN, y);
  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text(`Current balance: ${formatPdfAmount(currencyLabel, account.balance)}`, MARGIN, y);

  ensureSpace(45);
  y += 16;

  doc.setDrawColor(225, 225, 225);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;

  const footerLines = [
    'This certificate is issued by Citfin upon request and confirms account activity for the stated period.',
    '',
    'Head of Operations & Administrative Support',
    'Kozlovskyi Andrii',
  ];

  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  footerLines.forEach((line) => {
    doc.text(line, MARGIN, y);
    y += 4.8;
  });

  y += 2;

  const signatureNote = doc.splitTextToSize(
    `Generated by the ${BANK_NAME} online banking system (${BANK_WEBSITE}) and signed with the electronic signature of an authorized bank representative.`,
    PAGE_WIDTH - MARGIN * 2
  );

  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text(signatureNote, MARGIN, y);

  const periodSlug = period === 'month' ? 'monthly' : 'yearly';
  const fileName = `citfin-statement-${account.name.toLowerCase().replace(/\s+/g, '-')}-${periodSlug}-${Date.now()}.pdf`;

  doc.save(fileName);
}

function getSortTimestamp(transaction: Transaction): number {
  if (transaction.timestamp) return transaction.timestamp;

  return Date.parse(`${transaction.date} ${new Date().getFullYear()} ${transaction.time}`);
}
