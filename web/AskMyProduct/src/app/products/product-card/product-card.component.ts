import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class ProductCardComponent implements OnInit {

  @Input() imageUrl: string = '';

  @Input() title: string = '';

  @Input() description: string = '';

  @Output() ask = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onAsk() {
    this.ask.emit();
  }

}
