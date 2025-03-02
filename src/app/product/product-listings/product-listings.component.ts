import { Component } from '@angular/core';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-listings',
  standalone: false,
  templateUrl: './product-listings.component.html',
  styleUrl: './product-listings.component.scss'
})
export class ProductListComponent {

  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit() { 

    const productObservable = this.productService.getProducts();
    // RxJS 6.4.0 以降は非推奨
    // productObservable.subscribe(
    //   (data) => { this.products = data;},
    //   (err) => { console.error('エラーが発生しました: ' + err); },
    //   () => { console.log('完了しました'); },
    // );
    productObservable.subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('エラーが発生しました: ' + err);
      }
    });

  }
}