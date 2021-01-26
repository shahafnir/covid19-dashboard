import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { StatisticsMediumCardsComponent } from './statistics-medium-cards.component';
import { ChangeInPositivesAndDoublingRateComponent } from './cards/change-in-positives-and-doubling-rate/change-in-positives-and-doubling-rate.component';
import { EpidemicCurveComponent } from './cards/epidemic-curve/epidemic-curve.component';
import { SevereAndBreathalysedPatientsComponent } from './cards/severe-and-breathalysed-patients/severe-and-breathalysed-patients.component';

@NgModule({
  declarations: [
    StatisticsMediumCardsComponent,
    ChangeInPositivesAndDoublingRateComponent,
    EpidemicCurveComponent,
    SevereAndBreathalysedPatientsComponent,
  ],
  imports: [CommonModule, HighchartsChartModule],
  exports: [StatisticsMediumCardsComponent],
})
export class StatisticsMediumCardsModule {}
