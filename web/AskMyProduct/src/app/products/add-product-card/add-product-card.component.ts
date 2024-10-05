import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-add-product-card',
  templateUrl: './add-product-card.component.html',
  styleUrls: ['./add-product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class AddProductCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
