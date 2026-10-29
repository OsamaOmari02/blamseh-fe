export type StockLevel = 'out' | 'low' | 'in';

const LOW_STOCK_LIMIT = 5;

export function getStockLevel(stock: number): StockLevel {
  if (stock === 0) return 'out';
  return stock <= LOW_STOCK_LIMIT ? 'low' : 'in';
}

export function getStockLabel(stock: number): string {
  switch (getStockLevel(stock)) {
    case 'out':
      return 'Out of stock';
    case 'low':
      return `Only ${stock} left`;
    default:
      return 'In stock';
  }
}
