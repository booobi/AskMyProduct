import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AskFacade } from './ask.facade';
import { combineLatest, map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [AskFacade],
})
export class AskComponent {
  userInput = new FormControl<string>('', [Validators.required]);

  public facade = inject(AskFacade);

  public uiState$ = combineLatest([
    this.facade.isLoading$,
    this.facade.answer$,
    this.facade.error$,
  ]).pipe(
    map(([isLoading, answer, error]) => {
      if (isLoading) {
        return 'LOADING';
      }

      if (error) {
        return 'ERROR';
      }

      if (answer) {
        return 'ANSWER';
      }

      return 'MAIN';
    })
  );

  submitQuestion() {
    this.facade.queryProduct('test', this.userInput.value as string);
  }

  resetQuestion() {
    this.facade.resetAnswer();
    this.userInput.reset();
  }
}
