import { computed, inject, Service, signal } from '@angular/core';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { Product } from '../models/product-model';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    businessId: 'b1',
    name: 'Wireless Earbuds',
    category: 'Audio',
    description: 'Bluetooth 5.3 earbuds with noise reduction and a 24-hour charging case.',
    price: 39.9,
    stock: 24,
  },
  {
    id: '2',
    businessId: 'b1',
    name: 'Phone Case',
    category: 'Accessories',
    description: 'Shock-absorbing case with raised edges to protect the screen and camera.',
    price: 9.5,
    stock: 120,
  },
  {
    id: '3',
    businessId: 'b1',
    name: 'Power Bank 20000mAh',
    category: 'Accessories',
    description: 'Fast-charging power bank with two USB ports and one USB-C port.',
    price: 27,
    stock: 4,
  },
  {
    id: '4',
    businessId: 'b2',
    name: 'Smart Watch',
    category: 'Wearables',
    description: 'Fitness tracking, heart-rate monitor, and notifications on your wrist.',
    price: 89,
    stock: 0,
  },
  {
    id: '5',
    businessId: 'b2',
    name: 'Bluetooth Speaker',
    category: 'Audio',
    description: 'Portable waterproof speaker with 12 hours of playtime.',
    price: 34.5,
    stock: 12,
  },
  {
    id: '6',
    businessId: 'b2',
    name: 'USB-C Cable',
    category: 'Accessories',
    description: 'Braided 1.5 m cable supporting fast charging and data transfer.',
    price: 6,
    stock: 300,
  },
];

@Service()
export class ProductsService {
  private readonly productsState = signal<Product[]>([]);
  private readonly loadingState = signal(false);
  private readonly currentBusinessService = inject(CurrentBusinessService);
  private loaded = false;

  readonly products = computed(() =>
    this.productsState().filter((p) => p.businessId === this.currentBusinessService.selectedId()),
  );
  readonly loading = this.loadingState.asReadonly();

  load() {
    if (this.loaded || this.loadingState()) return;

    this.loadingState.set(true);
    setTimeout(() => {
      this.productsState.set(MOCK_PRODUCTS);
      this.loaded = true;
      this.loadingState.set(false);
    }, 600);
  }
}
