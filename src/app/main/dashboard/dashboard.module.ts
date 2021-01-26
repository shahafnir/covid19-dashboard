import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { StatisticsSmallCardsModule } from './statistics-small-cards/statistics-small-cards.module';
import { StatisticsMediumCardsModule } from './statistics-medium-cards/statistics-medium-cards.module';
import { StatisticsLargeCardsModule } from './statistics-large-cards/statistics-large-cards.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StatisticsSmallCardsModule,
    StatisticsMediumCardsModule,
    StatisticsLargeCardsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
