import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: [
    '../shared/small-card-styles.scss',
    './active-patients.component.scss',
  ],
})
export class ActivePatientsComponent implements OnInit {
  totalActive: number;
  activeToday: number;
  hospitalization = {
    community: 0,
    hotel: 0,
    hospital: 0,
  };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    let totalActiveYesterday;

    this.statisticsService
      .getStatisticsByDate('2020-12-30')
      .subscribe((statistics) => {
        const patients = statistics['patients'];
        totalActiveYesterday = patients['active'];
      });

    this.statisticsService
      .getStatisticsByDate('2020-12-31')
      .subscribe((statistics) => {
        const patients = statistics['patients'];

        this.totalActive = patients['active'];
        this.activeToday = this.totalActive - totalActiveYesterday;

        const hospitalization = patients['hospitalization'];
        this.hospitalization = {
          community: hospitalization['community'],
          hotel: hospitalization['hotel'],
          hospital: hospitalization['hospital'],
        };
      });
  }
}
