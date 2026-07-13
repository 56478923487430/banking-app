import jsPDF from 'jspdf';

import type { Account, Transaction } from '../types';
import {
  BANK_CONTACTS,
  BANK_LEGAL_NAME,
  BANK_NAME,
  BANK_WEBSITE,
  ACCOUNT_REQUISITES,
  STATEMENT_NUMBER,
} from '../constants/bank';
import { USER_NAME } from '../constants/user';
import { formatPdfAmount } from './formatPdfAmount';
import { loadLogoDataUrl } from './loadLogoDataUrl';
import { getPdfCurrencyLabel, getPdfLogoSize } from './pdfRenderSafety';

const MARGIN = 14;
const PAGE_WIDTH = 210;

/**
 * Generates and downloads a PDF payment confirmation slip for a single transaction.
 */
export async function generateReceiptPdf(
  account: Account,
  transaction: Transaction,
  balanceBefore: number,
  balanceAfter: number
): Promise<void> {
  const doc = new jsPDF();
  const requisites = ACCOUNT_REQUISITES[account.id as keyof typeof ACCOUNT_REQUISITES];
  const currencyLabel = getPdfCurrencyLabel(transaction.currencySymbol, account.currency);
  const generatedAt = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    const logo = await loadLogoDataUrl('/images/logo.png');
    const { width, height } = getPdfLogoSize(logo.width, logo.height, 22);

    doc.addImage(logo.dataUrl, 'PNG', MARGIN, 10, width, height);
  } catch {
    // Logo is optional
  }

  doc.setFontSize(15);
  doc.setTextColor(20, 20, 20);
  doc.text('Payment Confirmation', 38, 17);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`${BANK_LEGAL_NAME}`, 38, 23);
  doc.text(BANK_WEBSITE, 38, 28);

  doc.setDrawColor(78, 175, 78);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, 34, PAGE_WIDTH - MARGIN, 34);

  const section = (title: string, y: number): number => {
    doc.setFontSize(9);
    doc.setTextColor(78, 175, 78);
    doc.text(title.toUpperCase(), MARGIN, y);

    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y + 2, PAGE_WIDTH - MARGIN, y + 2);

    return y + 9;
  };

  const row = (label: string, value: string, y: number): number => {
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 120);
    doc.text(label, MARGIN, y);
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);

    const lines = doc.splitTextToSize(value, PAGE_WIDTH - MARGIN - 72);

    doc.text(lines, 72, y);

    return y + Math.max(7, lines.length * 5);
  };

  let y = section('Bank details', 44);

  y = row('Bank', BANK_NAME, y);
  y = row('Address', BANK_CONTACTS.address, y);
  y = row('Phone', BANK_CONTACTS.phone, y);
  y = row('Email', BANK_CONTACTS.email, y);
  y = row('SWIFT / BIC', requisites?.swift ?? 'CITFCZPP', y);

  y = section('Account details', y + 4);

  y = row('Account holder', USER_NAME, y);
  y = row('Account', `${account.name} (${account.currency})`, y);
  y = row('IBAN', requisites?.ibanFormatted ?? requisites?.iban ?? '—', y);

  y = section('Transaction details', y + 4);

  y = row('Status', 'Completed', y);
  y = row('Channel', 'Citfin Online Banking', y);
  y = row('Description', transaction.name, y);
  y = row('Type', transaction.kind === 'credit' ? 'Credit (incoming)' : 'Debit (outgoing)', y);
  y = row('Value date', transaction.date, y);
  y = row('Time', transaction.time, y);
  y = row('Amount', formatPdfAmount(currencyLabel, transaction.amount), y);
  y = row('Currency', account.currency, y);
  y = row('Balance before', formatPdfAmount(currencyLabel, balanceBefore), y);
  y = row('Balance after', formatPdfAmount(currencyLabel, balanceAfter), y);
  y = row('Reference No.', STATEMENT_NUMBER, y);
  y = row('Transaction ID', transaction.id, y);
  y = row('Generated', generatedAt, y);

  y += 6;

  doc.setDrawColor(230, 230, 230);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 7;

  const footer = doc.splitTextToSize(
    `This document is an official payment confirmation issued by ${BANK_LEGAL_NAME} (${BANK_WEBSITE}). ` +
      'It is generated electronically and is valid without a handwritten signature.',
    PAGE_WIDTH - MARGIN * 2
  );

  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(footer, MARGIN, y);

  const fileName = `citfin-receipt-${transaction.id}-${Date.now()}.pdf`;

  doc.save(fileName);
}
