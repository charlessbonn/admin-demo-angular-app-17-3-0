// blogs.store.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../myservices/product.service';
import { Product } from '../myinterfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductStore {
    private productService = inject(ProductService);
    private productSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productSubject.asObservable();

    private searchResultSubject = new BehaviorSubject<Product[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getAllProducts() {
        this.loadingSubject.next(true);
        const result = await this.productService.getAllProducts();
        this.productSubject.next(result ?? []);
        this.searchResultSubject.next(result ?? []);
        this.loadingSubject.next(false);
    }

    async searchProduct(keyword: string) {
        this.loadingSubject.next(true);
        const result = await this.productService.getAllProducts();
        this.searchResultSubject.next(result ?? []);
        this.loadingSubject.next(false);
    }

    clearSearches() {
        this.searchResultSubject.next([]);
    }

    // Optional: for getting current value synchronously
    getProductSnapshot() {
        return this.productSubject.getValue();
    }

    // Optional: for getting current value synchronously
    getSearchResultSnapshot() {
        return this.searchResultSubject.getValue();
    }

    // Optional: for getting current value synchronously
    getLoadingSnapshot() {
        return this.loadingSubject.getValue();
    }
}
