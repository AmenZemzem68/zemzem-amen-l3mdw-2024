import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private visibleCategory = new BehaviorSubject<string | null>(null);
  visibleCategory$ = this.visibleCategory.asObservable();

  setVisibleCategory(category: string | null) {
    this.visibleCategory.next(category);
  }
}
