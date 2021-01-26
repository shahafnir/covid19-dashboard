import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsLargeCardsComponent } from './statistics-large-cards.component';
import { CitiesComponent } from './cards/cities/cities.component';
import { HospitalsComponent } from './cards/hospitals/hospitals.component';

@NgModule({
  declarations: [
    StatisticsLargeCardsComponent,
    CitiesComponent,
    HospitalsComponent,
  ],
  imports: [CommonModule],
  exports: [StatisticsLargeCardsComponent],
})
export class StatisticsLargeCardsModule {}
