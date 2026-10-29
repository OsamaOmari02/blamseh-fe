import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { PageHeader } from '@shared/components/page-header/page-header';
import { getStockLabel, getStockLevel } from '../../models/stock-level';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-details-page',
  imports: [PageHeader, CurrencyPipe],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
})
export class ProductDetailsPage implements OnInit {
  private readonly router = inject(Router);
  protected readonly productsService = inject(ProductsService);

  readonly id = input.required<string>();

  protected readonly product = computed(() =>
    this.productsService.products().find((product) => product.id === this.id()),
  );

  protected readonly stockLevel = computed(() => {
    const product = this.product();
    return product ? getStockLevel(product.stock) : 'in';
  });

  protected readonly stockLabel = computed(() => {
    const product = this.product();
    return product ? getStockLabel(product.stock) : '';
  });

  ngOnInit() {
    this.productsService.load();
  }

  protected goBack() {
    this.router.navigate(['/', APP_ROUTES.products]);
  }
}
