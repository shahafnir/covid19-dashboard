import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breathalysed-patients',
  templateUrl: './breathalysed-patients.component.html',
  styleUrls: [
    '../shared/small-card-styles.scss',
    './breathalysed-patients.component.scss',
  ],
})
export class BreathalysedPatientsComponent implements OnInit {
  graphExpanded: boolean;

  constructor() {}

  ngOnInit(): void {}

  expandGraph() {
    this.graphExpanded = !this.graphExpanded;
  }
}
