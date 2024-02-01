export function isEven(v: number) {
  return v % 2 === 0;
}

export const formatNumber = (number: number, precision = 2) => {
  return number != null ? Intl.NumberFormat('nb-NY', { maximumFractionDigits: precision }).format(number) : '';
};

export const formatNumberToNor = (number: number, precision = 2) => {
  return number != null
    ? Intl.NumberFormat('en-US', { maximumFractionDigits: precision })
        .format(number)
        .replaceAll(',', ' ')
        .replace('.', ',')
    : '';
};
