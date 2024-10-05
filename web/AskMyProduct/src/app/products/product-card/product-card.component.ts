import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class ProductCardComponent implements OnInit {

  @Input() imageUrl: string = '';

  @Input() title: string = '';

  @Input() description: string = '';

  constructor() { }

  ngOnInit() {
  }

}
