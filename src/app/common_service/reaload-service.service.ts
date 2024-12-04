import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealoadServiceService {

  private reloadHeaderSubject = new Subject<void>();
  reloadHeader$ = this.reloadHeaderSubject.asObservable();

  triggerReloadHeader() {
    this.reloadHeaderSubject.next();
  }
}
