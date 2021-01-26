import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { AppService } from './../../../../../app.service';
import { DeceasedService } from './deceased.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-deceased',
  templateUrl: './deceased.component.html',
  styleUrls: ['../shared/small-card-styles.scss', './deceased.component.scss'],
})
export class DeceasedComponent implements OnInit {
  graphExpanded: boolean;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  mouseEnteredGraphWindow: boolean;
  deceasedTotal: number;

  constructor(
    private deceasedService: DeceasedService,
    private appService: AppService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.deceasedService.chartOptions.subscribe((chartOptions) => {
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

    this.statisticsService
      .getStatisticsByDate('2020-12-31')
      .subscribe((statistics) => {
        const patients = statistics['patients'];
        this.deceasedTotal = patients['deceased'];
      });

    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    const windowWidth = window.innerWidth;
    const graphWindow = document.getElementById('deceasedSmallGraphWindow');
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
