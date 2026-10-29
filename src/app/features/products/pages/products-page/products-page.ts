import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-products-page',
  imports: [SearchBar, ProductCard],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit {
  protected readonly productsService = inject(ProductsService);
  protected readonly searchQuery = signal('');

  private readonly router = inject(Router);

  protected readonly visibleProducts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    return this.productsService
      .products()
      .filter(
        (product) =>
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
  });

  ngOnInit() {
    this.productsService.load();
  }

  protected openProduct(id: string) {
    this.router.navigate(['/', APP_ROUTES.products, id]);
  }
}
