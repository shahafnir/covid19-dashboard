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

  async ngOnInit() {
    const testsReportYesterday = await this.statisticsService.getTestsReportByDate(
      '2020-12-30'
    );
    this.positiveYesterday = testsReportYesterday['positive'];

    const testsReportToday = await this.statisticsService.getTestsReportByDate(
      '2020-12-31'
    );
    this.positiveToday = testsReportToday['positive'];

    this.statisticsService
      .getStatisticsByDate('2020-12-31')
      .subscribe((statistics) => {
        const tests = statistics['tests'];
        const cumulative = tests['cumulative'];
        this.totalPositive = cumulative['positive'];
      });
  }
}
