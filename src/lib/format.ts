const MILLION = 1_000_000;
const THOUSAND = 1_000;

const trimDecimal = (value: number) => value.toFixed(1).replace(".0", "");

/** 18420 → "18.4K", 1250000 → "1.3M". */
export const formatCount = (value: number): string => {
  if (value >= MILLION) return `${trimDecimal(value / MILLION)}M`;
  if (value >= THOUSAND) return `${trimDecimal(value / THOUSAND)}K`;
  return String(value);
};
