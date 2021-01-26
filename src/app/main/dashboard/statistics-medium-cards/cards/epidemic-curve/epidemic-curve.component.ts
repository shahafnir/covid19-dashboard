import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { EpidemicCurveService } from './epidemic-curve.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-epidemic-curve',
  templateUrl: './epidemic-curve.component.html',
  styleUrls: [
    '../shared/medium-card-styles.scss',
    './epidemic-curve.component.scss',
  ],
})
export class EpidemicCurveComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = true;
  oneToOneFlag = true;
  daysFromHalfInfectedCount: number;

  constructor(
    private epidemicCurveService: EpidemicCurveService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.epidemicCurveService.chartOptions.subscribe((chartOptions) => {
      this.chartOptions = chartOptions;
    });

    this.statisticsService
      .getStatistics()
      .subscribe((statistics: Array<object>) => {
        const totalInfected =
          statistics[statistics.length - 1]['tests']['cumulative']['positive'];

        let daysFromHalfInfectedCount = 1;
        for (
          let dailyStatsInd = statistics.length - 2;
          dailyStatsInd >= 0;
          dailyStatsInd--
        ) {
          const totalInfectedToDate =
            statistics[dailyStatsInd]['tests']['cumulative']['positive'];

          if (totalInfected / 2 >= totalInfectedToDate) {
            this.daysFromHalfInfectedCount = daysFromHalfInfectedCount;
            break;
          }

          daysFromHalfInfectedCount++;
        }
      });
  }
}
