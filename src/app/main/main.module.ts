import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsSmallCardsModule } from './dashboard/statistics-small-cards/statistics-small-cards.module';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, SideNavComponent],
  imports: [CommonModule, HttpClientModule, StatisticsSmallCardsModule],
  exports: [MainComponent],
})
export class MainModule {}
