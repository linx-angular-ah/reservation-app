import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product: any;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productObservable = this.productService.getProductById(params.get('productId')!);
      productObservable.subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('エラーが発生しました: ' + err);
        }
      });
    });
  }

}
