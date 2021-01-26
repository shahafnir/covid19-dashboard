import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { getChartOptions } from './highcharts-options';

@Injectable({
  providedIn: 'root',
})
export class BreathalysedPatientsService {
  data = [];
  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
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
          const breathalysedCount = dailyStatistics['patients']['breathalysed'];

          this.data.push([chartDate, breathalysedCount]);
        });

        const chartOptions = getChartOptions(this.data);
        this.chartOptions.next(chartOptions);
      });
  }
}
