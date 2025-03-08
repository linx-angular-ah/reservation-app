import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-listings/product-listings.component';
import { ProductService } from './shared/product.service';

const routes: Routes = [
  { 
    path: 'products', component: ProductComponent, 
    children: [
      { path: '', component: ProductListComponent },
      { path: ':productId', component: ProductDetailComponent }
    ] 
  },
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
