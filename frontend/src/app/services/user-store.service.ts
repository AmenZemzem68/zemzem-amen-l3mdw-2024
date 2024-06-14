import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private id$ = new BehaviorSubject<number>(0);

  constructor() { }

  getId() {
    return this.id$.asObservable();
  }
  setId(value: number) {
    this.id$.next(value);
  }
}
