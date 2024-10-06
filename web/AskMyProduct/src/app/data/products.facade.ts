import { Injectable } from '@angular/core';
import { createState } from '../utils/createState';
import { productsMock } from './products.mock';
import { BehaviorSubject, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  products$ = new BehaviorSubject([]);
  isLoading$ = new BehaviorSubject(false);
  // state = createState({
  //   isLoading: false,
  //   products: [] as any,
  // });

  // products$ = this.state.select(s => s.products);

  setPoducts() {
    this.isLoading$.next(true);
    this.products$.next(productsMock as any);
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 2000);

    return of(null).pipe(delay(2000));
  }
}
