import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AskComponent } from './ask/ask.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products/ask/:id', component: AskComponent },
];
