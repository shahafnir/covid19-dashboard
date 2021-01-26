import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { TestsTakenService } from './tests-taken.service';
import { AppService } from './../../../../../app.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-tests-taken',
  templateUrl: './tests-taken.component.html',
  styleUrls: [
    '../shared/small-card-styles.scss',
    './tests-taken.component.scss',
  ],
})
export class TestsTakenComponent implements OnInit {
  graphExpanded: boolean;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  mouseEnteredGraphWindow: boolean;
  testsTakenYesterday: number;
  positivePercentageYesterday: number;

  constructor(
    private testsTakenService: TestsTakenService,
    private appService: AppService,
    private statisticsService: StatisticsService
  ) {}

  async ngOnInit() {
    this.testsTakenService.chartOptions.subscribe((chartOptions) => {
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

    const testsReport = await this.statisticsService.getTestsReportByDate(
      '2020-12-30'
    );

    this.testsTakenYesterday = testsReport['total'];
    this.positivePercentageYesterday =
      testsReport['positive'] / testsReport['total'];

    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    const windowWidth = window.innerWidth;
    const graphWindow = document.getElementById('testsTakenSmallGraphWindow');
    const classListContainsDown = graphWindow.classList.contains('down');

    if (windowWidth < 992 && classListContainsDown) {
      graphWindow.classList.remove('down');
      return;
    }

    if (windowWidth >= 992 && !classListContainsDown) {
      graphWindow.classList.add('down');
    }
  }

  expandGraph(event) {
    if (event) {
      this.onResize();

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
