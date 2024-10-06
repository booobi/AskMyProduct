import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductsFacade } from '../data/products.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateProductComponent implements OnInit {
  databaseTypes: string[] = [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'SQL Server',
    'SQLite',
  ];

  #fb = inject(FormBuilder);

  #snackBar = inject(MatSnackBar);

  dbForm: FormGroup = this.#fb.group({
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    productImage: ['', Validators.required],
    dbType: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    databaseName: ['', Validators.required],
  });

  productsFacade = inject(ProductsFacade);

  #router = inject(Router);

  constructor() {
    console.log(this.dbForm);
  }

  onSubmit() {
    this.productsFacade.setPoducts().subscribe(() => {
      this.#snackBar.open('Product connected successfully!',  'Ask it a question now?', {duration: 4000});
      this.#router.navigateByUrl('/products');
    });
  }

  ngOnInit() {}
}
