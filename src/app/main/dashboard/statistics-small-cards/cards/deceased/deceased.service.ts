import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { getChartOptions } from './highcharts-options';

@Injectable({
  providedIn: 'root',
})
export class DeceasedService {
  data = [];
  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService
      .getStatistics()
      .subscribe((statistics: Array<object>) => {
        statistics.forEach((dailyStatistics, statsInd) => {
          const rawDate = new Date(dailyStatistics['date']);
          const chartDate = new Date(
            `${rawDate.getUTCFullYear()}-${
              rawDate.getMonth() + 1
            }-${rawDate.getDate()}`
          ).getTime();
          const deceasedCountTotal = dailyStatistics['patients']['deceased'];

          let deceasedCountTotalADayBefore = 0;
          if (statsInd > 0) {
            deceasedCountTotalADayBefore =
              statistics[statsInd - 1]['patients']['deceased'];
          }

          let deceasedCount = deceasedCountTotal - deceasedCountTotalADayBefore;

          this.data.push([chartDate, deceasedCount]);
        });

        const chartOptions = getChartOptions(this.data);
        this.chartOptions.next(chartOptions);
      });
  }
}
