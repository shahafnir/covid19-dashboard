import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';
import { SevereAndBreathalysedPatientsService } from './severe-and-breathalysed-patients.service';

@Component({
  selector: 'app-severe-and-breathalysed-patients',
  templateUrl: './severe-and-breathalysed-patients.component.html',
  styleUrls: [
    '../shared/medium-card-styles.scss',
    './severe-and-breathalysed-patients.component.scss',
  ],
})
export class SevereAndBreathalysedPatientsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  updateFlag = true;
  oneToOneFlag = true;
  totalSeverePatients: number;
  totalBreathalysedPatients: number;
  rangesList = ['חודש אחרון', 'שבועיים אחרונים', 'שבוע אחרון', 'עד עכשיו'];
  selectedRange = this.rangesList[0];
  displayRangesList = false;

  constructor(
    private severeAndBreathalysedPatientsService: SevereAndBreathalysedPatientsService,
    private StatisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.severeAndBreathalysedPatientsService.chartOptions.subscribe(
      (chartOptions) => {
        this.chartOptions = chartOptions;
      }
    );

    this.StatisticsService.getStatisticsByDate('2020-12-31').subscribe(
      (statistics) => {
        this.totalSeverePatients =
          statistics['patients']['bySeverityLevels']['high'] +
          statistics['patients']['bySeverityLevels']['critical'];

        this.totalBreathalysedPatients = statistics['patients']['breathalysed'];
      }
    );
  }

  openRangesList() {
    this.displayRangesList = !this.displayRangesList;
  }

  onPickRange(range) {
    this.selectedRange = range;
    this.displayRangesList = false;

    this.severeAndBreathalysedPatientsService.setRange(range);
  }
}
