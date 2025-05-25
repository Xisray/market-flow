import {mergeInvoicesByDate, sortInvoicesByDate, addDates} from "../utils/utils"
import rawData from "./invoices"

const data = []
const products = [];

export function getData() {
  if(data.length !== 0)
    return data;
  data.push(...rawData);
  return data;
}

export function getProducts() {
  if(products.length !== 0)
    return products;
  const result = new Set();
  getData().forEach((invoice) =>
    invoice.items.forEach((item) => {
      result.add(item.product);
    })
  );
  products.push(...result);
  return products;
}

export function getInfoByProduct(product) {
  const result = [];
  data.forEach((invoice) => {
    const items = invoice.items.filter((item) => item.product === product);
    if (items.length > 0) {
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      const avgPrice = totalPrice / items.length;

      result.push({
        date: invoice.date,
        costumers: items.length,
        quantity: totalQuantity,
        price: avgPrice,
        flow:
          items.length === 0
            ? 0
            : items.length * (totalQuantity / items.length) * avgPrice,
      });
    }
  });
  return result;
}
