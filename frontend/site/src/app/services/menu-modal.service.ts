import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuModalService {

  private visibilityChangedSource = new Subject<boolean>();
  visibilityChanged$ = this.visibilityChangedSource.asObservable();

  constructor() { }

  changeVisibility(visibility: boolean)
  {
    this.visibilityChangedSource.next(visibility);
  }
}
