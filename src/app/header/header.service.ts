import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  sideNavExpanded = new Subject<boolean>();
  isDarkTheme = new Subject<boolean>();

  expandSideNav(expanded: boolean) {
    this.sideNavExpanded.next(expanded);
  }

  changeTheme(toDark: boolean) {
    this.isDarkTheme.next(toDark);

    const main = document.querySelector('.main');
    const mainClassList = main.classList;

    if (toDark) {
      mainClassList.remove('light-theme');
      mainClassList.add('dark-theme');
    } else {
      mainClassList.remove('dark-theme');
      mainClassList.add('light-theme');
    }
  }
}
