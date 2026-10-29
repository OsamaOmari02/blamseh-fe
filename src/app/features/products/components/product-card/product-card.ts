import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Product } from '../../models/product-model';
import { getStockLabel, getStockLevel } from '../../models/stock-level';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly selected = output<string>();

  protected readonly initial = computed(() => this.product().name.charAt(0).toUpperCase());
  protected readonly stockLevel = computed(() => getStockLevel(this.product().stock));
  protected readonly stockLabel = computed(() => getStockLabel(this.product().stock));
}
