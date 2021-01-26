import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [MainComponent, SideNavComponent],
  imports: [CommonModule, HttpClientModule, DashboardModule],
  exports: [MainComponent],
})
export class MainModule {}
