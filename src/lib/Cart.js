import find from 'lodash/find';
import remove from 'lodash/remove';

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
      return accumulator + item.quantity * item.product.price;
    }, 0);
  }

  remove(product) {
    remove(this.items, { product });

    return this.getTotal();
  }
}
