import { Component, inject } from '@angular/core';
import { ProductStore } from '../../mystores/product.store';
import { combineLatest, map } from 'rxjs';
import { Product } from '../../myinterfaces/product';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // Products
  productStore = inject(ProductStore);
  productsList = this.productStore.products$;
  searchResultList = this.productStore.searchResult$;
  loading = this.productStore.loading$;

  // Displayed list: use search results if available, otherwise fallback
  displayedProducts = combineLatest([
    this.productsList,
    this.searchResultList
  ]).pipe(
    map(([products, searchResults]) => {
      const safeProducts = Array.isArray(products) ? products : [];
      const safeSearch = Array.isArray(searchResults) ? searchResults : [];
      return safeSearch.length > 0 ? safeSearch : safeProducts;
    })
  );

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Load Products if empty
    if (this.productStore.getProductSnapshot().length === 0) {
      this.productStore.getAllProducts();
    }
  }

  onSelectProduct(event: Event, user: Product) {
    //
  }

  onSelectAllProducts(event: Event) {
    //
  }
}
