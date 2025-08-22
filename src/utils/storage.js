const LS_KEY = 'topupku_orders';
export const loadOrders = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
};
export const saveOrders = (orders) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(orders)); } catch {}
};
export const addOrderToArray = (arr, order) => [order, ...arr];
export const updateOrderStatusInArray = (arr, id, status) => arr.map(o => o.id === id ? { ...o, status } : o);
