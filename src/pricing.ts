export type Scenario = {
  cost: number;
  margin: number;
  taxRate: number;
  sell: number;
  profit: number;
  tax: number;
  total: number;
};

export function parseCost(value: string): number | null {
  const cleaned = value
    .trim()
    .replace(/^rp\s*/i, "")
    .replace(/\s/g, "");
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)$/.test(cleaned)) return null;
  const number = Number(cleaned.replace(/\./g, ""));
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

export function parseTax(value: string): number | null {
  if (!value.trim()) return null;
  const number = Number(value.replace(",", "."));
  return Number.isFinite(number) && number >= 0 && number <= 100
    ? number
    : null;
}

export function calculateScenario(
  cost: number,
  margin: number,
  taxRate: number,
): Scenario {
  if (
    !Number.isSafeInteger(cost) ||
    cost <= 0 ||
    !Number.isFinite(margin) ||
    margin < 0 ||
    margin >= 100 ||
    !Number.isFinite(taxRate) ||
    taxRate < 0 ||
    taxRate > 100
  ) {
    throw new RangeError(
      "Enter a positive whole cost, a margin below 100%, and a tax rate from 0 to 100%.",
    );
  }
  const sell = Math.round(cost / (1 - margin / 100));
  const tax = Math.round((sell * taxRate) / 100);
  const total = sell + tax;
  if (![sell, tax, total].every(Number.isSafeInteger))
    throw new RangeError(
      "This amount is too large to calculate accurately. Try a smaller amount.",
    );
  return { cost, margin, taxRate, sell, tax, total, profit: sell - cost };
}

export const money = (value: number) =>
  "Rp" + Math.round(value).toLocaleString("id-ID");
