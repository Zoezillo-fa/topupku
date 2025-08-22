export const calculateTotal = (base, fee) => {
  const pct = Math.ceil(base * ((fee?.percent || 0) / 100));
  const flat = fee?.flat || 0;
  return base + pct + flat;
};
export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
