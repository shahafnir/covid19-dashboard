import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-severe-patients',
  templateUrl: './severe-patients.component.html',
  styleUrls: [
    '../shared/small-card-styles.scss',
    './severe-patients.component.scss',
  ],
})
export class SeverePatientsComponent implements OnInit {
  severeTotal: number;
  criticalTotal: number;
  mediumTotal: number;
  severeToday: number;

  constructor(private statisticsServie: StatisticsService) {}

  ngOnInit(): void {
    let severeTotalYesterday = 0;

    this.statisticsServie
      .getStatisticsByDate('2020-12-30')
      .subscribe((statistics) => {
        const patientsBySeverityLevelsYesterday =
          statistics['patients']['bySeverityLevels'];

        severeTotalYesterday =
          patientsBySeverityLevelsYesterday['high'] +
          patientsBySeverityLevelsYesterday['critical'];
      });

    this.statisticsServie
      .getStatisticsByDate('2020-12-31')
      .subscribe((statistics) => {
        const patientsBySeverityLevels =
          statistics['patients']['bySeverityLevels'];

        this.severeTotal =
          patientsBySeverityLevels['high'] +
          patientsBySeverityLevels['critical'];

        this.criticalTotal = patientsBySeverityLevels['critical'];

        this.mediumTotal = patientsBySeverityLevels['medium'];

        this.severeToday = this.severeTotal - severeTotalYesterday;
      });
  }
}
