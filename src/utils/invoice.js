import { rand } from './calc.js'
export const generateInvoice = (prefix = 'INV') => `${prefix}-${new Date().getFullYear()}-${rand(100000, 999999)}`;
