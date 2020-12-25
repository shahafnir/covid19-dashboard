import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navMenuExpanded: boolean;
  navButtonImage: string;
  isDarkTheme: boolean;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.setNavbuttonImage();

    this.headerService.sideNavExpanded.subscribe((expanded) => {
      this.navMenuExpanded = expanded;
    });

    this.headerService.isDarkTheme.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  setNavbuttonImage() {
    this.navButtonImage = this.navMenuExpanded
      ? '../../assets/images/header/nav_button_x.svg'
      : '../../assets/images/header/nav_button_bars.svg';
  }

  onExpandSideNav() {
    this.headerService.expandSideNav(!this.navMenuExpanded);
    this.setNavbuttonImage();
  }

  onChangeTheme() {
    this.headerService.changeTheme(!this.isDarkTheme);
  }
}
