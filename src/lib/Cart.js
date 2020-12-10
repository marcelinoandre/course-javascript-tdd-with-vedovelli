import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  if (item.condition?.percentage && item.quantity > item.condition.minimum) {
    return amount.percentage(item.condition.percentage);
  }
  return Money({ amount: 0 });
};

export class Cart {
  items = [];

  add(item) {
    const itemTofind = { product: item.product };
    //TODO: remover lodash e fazer com javascript puro
    if (find(this.items, itemTofind)) remove(this.items, itemTofind);
    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((accumulator, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      const  discount = calculatePercentageDiscount(amount, item)

      return accumulator.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  remove(product) {
    remove(this.items, { product });

    return this.getTotal();
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return { total, items };
  }

  checkout() {
    const total = this.getTotal();
    const items = this.items;

    this.items = [];

    return { total, items };
  }
}
