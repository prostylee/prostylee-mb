import {CURRENCY_VIET_NAM} from 'constants';

export const currencyFormat = (n = 0, currency = CURRENCY_VIET_NAM) => {
  return (
    n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
    }) +
    ' ' +
    currency
  );
};

export const priceSalePercent = (price = 0, priceSale = 0) => {
  return Math.round(100 - (priceSale / price) * 100);
};
