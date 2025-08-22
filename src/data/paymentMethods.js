export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', type: 'qr', fee: { flat: 0, percent: 0.7 } },
  { id: 'dana', name: 'DANA', type: 'ewallet', fee: { flat: 0, percent: 1.2 } },
  { id: 'ovo', name: 'OVO', type: 'ewallet', fee: { flat: 0, percent: 1.2 } },
  { id: 'gopay', name: 'GoPay', type: 'ewallet', fee: { flat: 0, percent: 1.2 } },
  { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', fee: { flat: 0, percent: 1.2 } },
  { id: 'bca', name: 'BCA VA', type: 'bank_va', fee: { flat: 1000, percent: 0 } },
  { id: 'bri', name: 'BRI VA', type: 'bank_va', fee: { flat: 1000, percent: 0 } },
];
