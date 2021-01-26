import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { getChartOptions } from './highcharts-options';
import { StatisticsService } from 'src/app/shared/statistics/statistics.service';

@Injectable({
  providedIn: 'root',
})
export class SevereAndBreathalysedPatientsService {
  severePatientsdata = [];
  breathalysedPatientsdata = [];

  chartOptions = new Subject();

  constructor(private statisticsService: StatisticsService) {
    this.setChart(31);
  }

  async setChart(daysToShow) {
    this.severePatientsdata = [];
    this.breathalysedPatientsdata = [];

    this.statisticsService
      .getStatistics()
      .subscribe((statistics: Array<object>) => {
        statistics.forEach((dailyStatistics, statsInd) => {
          if (statsInd >= statistics.length - daysToShow) {
            const rawDate = new Date(dailyStatistics['date']);

            const chartDate = new Date(
              `${rawDate.getUTCFullYear()}-${
                rawDate.getMonth() + 1
              }-${rawDate.getDate()}`
            ).getTime();

            const severePatients =
              dailyStatistics['patients']['bySeverityLevels']['high'] +
              dailyStatistics['patients']['bySeverityLevels']['critical'];
            this.severePatientsdata.push([chartDate, severePatients]);

            const breathalysedPatients =
              dailyStatistics['patients']['breathalysed'];
            this.breathalysedPatientsdata.push([
              chartDate,
              breathalysedPatients,
            ]);
          }
        });

        const chartOptions = getChartOptions(
          this.severePatientsdata,
          this.breathalysedPatientsdata
        );

        this.chartOptions.next(chartOptions);
      });
  }

  setRange(range) {
    let daysToShow;

    if (range === 'שבוע אחרון') {
      daysToShow = 7;
    } else if (range === 'שבועיים אחרונים') {
      daysToShow = 14;
    } else {
      daysToShow = 31;
    }

    this.setChart(daysToShow);
  }
}
