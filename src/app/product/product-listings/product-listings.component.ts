import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../../products';

@Component({
  selector: 'app-product-listings',
  standalone: false,
  templateUrl: './product-listings.component.html',
  styleUrl: './product-listings.component.scss'
})
export class ProductListComponent {

  products: any;

  constructor() { }

  ngOnInit() { 
    this.products = products;
  }

}
