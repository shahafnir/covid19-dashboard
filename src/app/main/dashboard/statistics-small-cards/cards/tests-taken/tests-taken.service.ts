import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { getChartOptions } from './highcharts-options';

@Injectable({
  providedIn: 'root',
})
export class TestsTakenService {
  data = [];
  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
    this.setChart();
  }

  async setChart() {
    const response = await this.statisticsService.getTestsReports();
    const testsReports = <Array<object>>response;

    testsReports.forEach((testReport, statsInd) => {
      const rawDate = new Date(testReport['date']);
      const chartDate = new Date(
        `${rawDate.getUTCFullYear()}-${
          rawDate.getMonth() + 1
        }-${rawDate.getDate()}`
      ).getTime();
      const testsTaken = testReport['total'];
      this.data.push([chartDate, testsTaken]);
    });

    const chartOptions = getChartOptions(this.data);
    this.chartOptions.next(chartOptions);
  }
}
