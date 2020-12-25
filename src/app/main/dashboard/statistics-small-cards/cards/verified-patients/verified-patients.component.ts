import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified-patients',
  templateUrl: './verified-patients.component.html',
  styleUrls: [
    '../shared/small-card-styles.scss',
    './verified-patients.component.scss',
  ],
})
export class VerifiedPatientsComponent implements OnInit {
  positiveYesterday: number;
  positiveToday: number;
  totalPositive: number;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService
      .getTestsReport('2020-01-02')
      .subscribe((testsReport) => {
        this.positiveYesterday = testsReport['positive'];
      });

    this.statisticsService
      .getTestsReport('2020-01-03')
      .subscribe((testsReport) => {
        this.positiveToday = testsReport['positive'];
      });

    this.statisticsService
      .getStatistics('2020-01-03')
      .subscribe((statistics) => {
        const tests = statistics['tests'];
        const comulative = tests['comulative'];
        this.totalPositive = comulative['positive'];
      });
  }
}
