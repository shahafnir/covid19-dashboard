import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { ChangeInPositivesAndDoublingRateService } from './change-in-positives-and-doubling-rate.service';

@Component({
  selector: 'app-change-in-positives-and-doubling-rate',
  templateUrl: './change-in-positives-and-doubling-rate.component.html',
  styleUrls: [
    '../shared/medium-card-styles.scss',
    './change-in-positives-and-doubling-rate.component.scss',
  ],
})
export class ChangeInPositivesAndDoublingRateComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = true;
  oneToOneFlag = true;

  constructor(
    private changeInPositivesAndDoublingRateService: ChangeInPositivesAndDoublingRateService
  ) {}

  ngOnInit(): void {
    this.changeInPositivesAndDoublingRateService.chartOptions.subscribe(
      (chartOptions) => {
        this.chartOptions = chartOptions;
      }
    );
  }
}
