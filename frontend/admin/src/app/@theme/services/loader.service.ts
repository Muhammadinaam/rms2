import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoaderEnabled = true;

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    if(this.isLoaderEnabled)
      this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
