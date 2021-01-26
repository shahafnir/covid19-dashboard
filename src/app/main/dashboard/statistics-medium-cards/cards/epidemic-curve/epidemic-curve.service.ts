import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { getChartOptions } from './highcharts-options';
import { StatisticsService } from 'src/app/shared/statistics/statistics.service';

@Injectable({
  providedIn: 'root',
})
export class EpidemicCurveService {
  newPositiveData = [];
  newRecoveringData = [];
  cumulativePositiveData = [];
  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
    this.setChart();
  }

  setChart() {
    this.statisticsService
      .getStatistics()
      .subscribe((statistics: Array<object>) => {
        statistics.forEach((dailyStatistics) => {
          const rawDate = new Date(dailyStatistics['date']);

          const chartDate = new Date(
            `${rawDate.getUTCFullYear()}-${
              rawDate.getMonth() + 1
            }-${rawDate.getDate()}`
          ).getTime();

          const newPositive = dailyStatistics['tests']['today']['positive'];
          this.newPositiveData.push([chartDate, newPositive]);

          const newRecovering = Math.floor(newPositive * 0.65);
          this.newRecoveringData.push([chartDate, newRecovering]);

          const cumulativePositive =
            dailyStatistics['tests']['cumulative']['positive'];
          this.cumulativePositiveData.push([chartDate, cumulativePositive]);
        });

        this.cumulativePositiveData.sort((elA, elB) => {
          return elA[0] - elB[0];
        });

        const chartOptions = getChartOptions(
          this.newPositiveData.slice(17),
          this.newRecoveringData.slice(17),
          this.cumulativePositiveData.slice(17)
        );

        this.chartOptions.next(chartOptions);
      });
  }
}
