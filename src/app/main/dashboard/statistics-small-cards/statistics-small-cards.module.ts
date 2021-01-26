import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { StatisticsSmallCardsComponent } from './statistics-small-cards.component';
import { VerifiedPatientsComponent } from './cards/verified-patients/verified-patients.component';
import { ActivePatientsComponent } from './cards/active-patients/active-patients.component';
import { SeverePatientsComponent } from './cards/severe-patients/severe-patients.component';
import { BreathalysedPatientsComponent } from './cards/breathalysed-patients/breathalysed-patients.component';
import { DeceasedComponent } from './cards/deceased/deceased.component';
import { TestsTakenComponent } from './cards/tests-taken/tests-taken.component';

@NgModule({
  declarations: [
    StatisticsSmallCardsComponent,
    VerifiedPatientsComponent,
    ActivePatientsComponent,
    SeverePatientsComponent,
    BreathalysedPatientsComponent,
    DeceasedComponent,
    TestsTakenComponent,
  ],
  imports: [CommonModule, HighchartsChartModule],
  exports: [StatisticsSmallCardsComponent],
})
export class StatisticsSmallCardsModule {}
