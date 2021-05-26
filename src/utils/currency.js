export const currencyFormat = (n, currency) => {
  return (
    n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
    }) +
    ' ' +
    currency
  );
};

export const priceSalePercent = (price, priceSale) => {
  return Math.round(100 - (priceSale / price) * 100);
};
