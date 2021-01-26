import { Component, OnInit } from '@angular/core';
import { HospitalsService } from './hospitals.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['../shared/large-card-styles.scss', './hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit {
  hospitals: Array<object>;

  constructor(
    private hospitalsService: HospitalsService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statisticsService
      .getHospitals()
      .subscribe((hospitals: Array<object>) => {
        this.hospitals = hospitals;

        this.hospitals.forEach((hospital) => {
          hospital['staffInIsolation']['total'] =
            hospital['staffInIsolation']['doctors'] +
            hospital['staffInIsolation']['nurses'] +
            hospital['staffInIsolation']['other'];
        });

        this.onSortHospitals('occupancyPercentage-Covid19');
      });
  }

  onSortHospitals(method) {
    this.hospitals = this.hospitalsService.sortHospitals(
      method,
      this.hospitals
    );

    this.displaySortingArrow(method);
  }

  displaySortingArrow(sortingMethod) {
    const hospitalsTable = document.querySelector('.hospitals-table');
    const sortingButtons = hospitalsTable.getElementsByClassName(
      'sorting-button'
    );

    for (let buttonInd = 0; buttonInd < sortingButtons.length; buttonInd++) {
      const button = sortingButtons[buttonInd];
      const buttonName = button['name'];

      const parentElement = button.parentElement;
      const parentClassList = parentElement.classList;

      if (buttonName === sortingMethod) {
        if (!parentClassList.contains('sorted')) {
          parentClassList.add('sorted');
        } else {
          if (!parentClassList.contains('reversed')) {
            parentClassList.add('reversed');
          } else {
            parentClassList.remove('reversed');
          }
        }
      } else {
        if (parentClassList.contains('sorted')) {
          parentClassList.remove('sorted');
          if (parentClassList.contains('reversed')) {
            parentClassList.remove('reversed');
          }
        }
      }
    }
  }
}
