import { HeaderService } from './../../header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  expanded: boolean;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.sideNavExpanded.subscribe((expanded) => {
      this.expanded = expanded;
    });
  }
}
