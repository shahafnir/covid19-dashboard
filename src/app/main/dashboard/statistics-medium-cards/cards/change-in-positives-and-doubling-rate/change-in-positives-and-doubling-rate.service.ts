import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { getChartOptions } from './highcharts-options';
import { StatisticsService } from 'src/app/shared/statistics/statistics.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeInPositivesAndDoublingRateService {
  data = [];
  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
    this.setChart();
  }

  async setChart() {
    const response = await this.statisticsService.getTestsReports();
    const testsReports = <Array<object>>response;

    const LastWeekTestsReports = testsReports.slice(
      testsReports.length - 7,
      testsReports.length
    );

    LastWeekTestsReports.forEach(async (testsReport, daysInd) => {
      const rawDate = new Date(testsReport['date']);

      const chartDate = new Date(
        `${rawDate.getUTCFullYear()}-${
          rawDate.getMonth() + 1
        }-${rawDate.getDate()}`
      ).getTime();

      let positivesLastWeek = 0;
      let lastDateFetched;

      for (let daysInd = 0; daysInd < 7; daysInd++) {
        const timeToReduce = daysInd === 0 ? 0 : daysInd * 24 * 3600 * 1000;

        const testsReportDateToFetchRaw = new Date(
          rawDate.getTime() - timeToReduce
        );

        const testsReportDateToFetch = `${testsReportDateToFetchRaw.getUTCFullYear()}-${
          testsReportDateToFetchRaw.getMonth() + 1
        }-${testsReportDateToFetchRaw.getDate()}`;

        const testsReport = await this.statisticsService.getTestsReportByDate(
          testsReportDateToFetch
        );

        positivesLastWeek += parseInt(testsReport['positive']);

        lastDateFetched = testsReportDateToFetchRaw;
      }

      let positivesPreviousWeek = 0;

      for (let daysInd = 0; daysInd < 7; daysInd++) {
        const timeToReduce = daysInd === 0 ? 0 : daysInd * 24 * 3600 * 1000;

        const testsReportDateToFetchRaw = new Date(
          lastDateFetched.getTime() - timeToReduce
        );

        const testsReportDateToFetch = `${testsReportDateToFetchRaw.getUTCFullYear()}-${
          testsReportDateToFetchRaw.getMonth() + 1
        }-${testsReportDateToFetchRaw.getDate()}`;

        const testsReport = await this.statisticsService.getTestsReportByDate(
          testsReportDateToFetch
        );

        positivesPreviousWeek += parseInt(testsReport['positive']);
      }

      const changeInPositivePercent = Math.floor(
        ((positivesLastWeek - positivesPreviousWeek) / positivesPreviousWeek) *
          100
      );

      this.data.push([chartDate, changeInPositivePercent]);

      if (daysInd === 6) {
        this.data.sort((elA, elB) => {
          return elA[0] - elB[0];
        });

        const chartOptions = getChartOptions(this.data);
        this.chartOptions.next(chartOptions);
      }
    });
  }
}
