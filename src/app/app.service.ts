import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  onMouseClick = new Subject<HTMLElement>();

  closeGraphWindow() {
    this.onMouseClick.next();
  }
}
