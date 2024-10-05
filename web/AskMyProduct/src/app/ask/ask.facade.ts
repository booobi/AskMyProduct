import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createState } from '../utils/createState';
import { delay, Observable, of } from 'rxjs';
import { AskResponse } from './ask.types';

@Injectable()
export class AskFacade {
  #http = inject(HttpClient);
  #backendURL = 'http://192.168.111.113:5152/api/question';

  state = createState({
    isLoading: false,
    question: '',
    answer: '',
    error: '',
  });

  isLoading$: Observable<boolean> = this.state.select(
    (state) => state.isLoading
  );

  question$: Observable<string> = this.state.select((state) => state.question);

  answer$: Observable<string> = this.state.select((state) => state.answer);

  error$: Observable<string> = this.state.select((state) => state.error);

  queryProduct(productId: string, question: string) {
    this.state.patchState({ isLoading: true, answer: '', error: '' });

    return this.#http
      .get<AskResponse>(this.#backendURL, {
        params: { prompt: question },
      })
      .subscribe({
        next: (res) => {
          this.state.patchState({ isLoading: false, answer: res.message });
        },
        error: () => {
          {
            this.state.patchState({
              isLoading: false,
              answer: '',
              error: 'There was an error. Please try again later',
            });
          }
        },
      });
  }

  resetAnswer() {
    this.state.patchState({ answer: '', error: '', isLoading: false, question: '' });
  }
}
