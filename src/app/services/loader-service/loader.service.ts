import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}
@Injectable()

export class LoaderService {
public loaderSubject = new Subject<LoaderState>();
loaderState = this.loaderSubject.asObservable();
constructor() { }
showLoader() {
        this.loaderSubject.next(<LoaderState>{show: true});
    }
hideLoader() {
        this.loaderSubject.next(<LoaderState>{show: false});
    }
}