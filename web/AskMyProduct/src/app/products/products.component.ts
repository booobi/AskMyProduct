import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddProductCardComponent } from './add-product-card/add-product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, AddProductCardComponent]
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
