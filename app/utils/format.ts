export const formatPrice = (price: number | null | undefined): string => {
  if (price == null) return 'N/A';

  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatChange = (change: number | null | undefined): string => {
  if (change == null) return 'N/A';

  const sign = change >= 0 ? '+' : '';
  return `${sign}${formatPrice(change)}`;
};

export const formatChangePercent = (percent: number | null | undefined): string => {
  if (percent == null) return 'N/A';

  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};
