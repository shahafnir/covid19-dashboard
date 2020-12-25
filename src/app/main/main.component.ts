import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HeaderService } from './../header/header.service';
@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent implements OnInit {
  sideNavExpanded: boolean;

  statistics;
  private dataStorageUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(`${this.dataStorageUrl}/statistics`)
      .subscribe((data) => (this.statistics = data));
  }
}
