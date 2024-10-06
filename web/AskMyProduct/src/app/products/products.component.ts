import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddProductCardComponent } from './add-product-card/add-product-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, tap } from 'rxjs';
import { ProductsFacade } from '../data/products.facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    ProductCardComponent,
    AddProductCardComponent,
  ],
})
export class ProductsComponent implements OnInit {
  #router = inject(Router);

  #activatedRoute = inject(ActivatedRoute);

  productsFacade = inject(ProductsFacade);

  products$ = this.productsFacade.products$.pipe(tap(console.log));

  onAskProduct(productId: string) {
    this.#router.navigate(['ask', productId], {relativeTo: this.#activatedRoute});
  }

  ngOnInit() {}
}
