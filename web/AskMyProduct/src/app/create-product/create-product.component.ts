import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatButtonModule
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

  dbForm: FormGroup = this.#fb.group({
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    dbType: ['', Validators.required],
    host: ['', Validators.required],
    port: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    databaseName: ['', Validators.required],
  });

  constructor() {
    console.log(this.dbForm);
  }

  onSubmit() {
    if (this.dbForm.valid) {
      console.log(this.dbForm.value);
      // You can add logic here to handle the form submission
    }
  }

  ngOnInit() {}
}
