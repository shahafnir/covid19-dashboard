import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { AppService } from './../../../../../app.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { BreathalysedPatientsService } from './breathalysed-patients.service';

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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  mouseEnteredGraphWindow: boolean;
  totalBreathalysed: number;
  breathalysedToday: number;

  constructor(
    private appService: AppService,
    private breathalysedPatientsService: BreathalysedPatientsService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.breathalysedPatientsService.chartOptions.subscribe((chartOptions) => {
      this.chartOptions = chartOptions;
    });

    this.appService.onMouseClick.subscribe(() => {
      if (this.mouseEnteredGraphWindow) {
        return;
      }

      if (this.graphExpanded) {
        this.expandGraph('');
      }
    });

    let totalBreathalysedYesterday;

    this.statisticsService
      .getStatisticsByDate('2020-12-30')
      .subscribe((statistics) => {
        const patients = statistics['patients'];
        totalBreathalysedYesterday = patients['breathalysed'];
      });

    this.statisticsService
      .getStatisticsByDate('2020-12-31')
      .subscribe((statistics) => {
        const patients = statistics['patients'];
        this.totalBreathalysed = patients['breathalysed'];
        this.breathalysedToday =
          this.totalBreathalysed - totalBreathalysedYesterday;
      });
  }

  expandGraph(event) {
    if (event) {
      if (!this.graphExpanded) {
        setTimeout(() => {
          this.graphExpanded = !this.graphExpanded;
        }, 100);
      }
    }

    this.graphExpanded = !this.graphExpanded;
  }

  onMouseEnteredGraphWindow() {
    this.mouseEnteredGraphWindow = !this.mouseEnteredGraphWindow;
  }
}
