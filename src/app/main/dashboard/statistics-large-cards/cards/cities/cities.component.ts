import { Component, OnInit } from '@angular/core';
import { CitiesService } from './cities.service';
import { StatisticsService } from './../../../../../shared/statistics/statistics.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['../shared/large-card-styles.scss', './cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  cities: Array<object>;
  unfilteredCities: Array<object>;
  displaySearchSuggestions: boolean;

  constructor(
    private citiesService: CitiesService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statisticsService.getCities().subscribe((cities: Array<object>) => {
      this.cities = cities;
      this.unfilteredCities = cities;

      cities.forEach((city) => {
        const cityScore = parseFloat(city['score']);
        let color = '';

        switch (true) {
          case cityScore < 4.5:
            color = '#b8de92';
            break;
          case cityScore < 6:
            color = '#fcfc70';
            break;
          case cityScore < 7.5:
            color = '#f2c580';
            break;
          default:
            color = '#fa9e8f';
            break;
        }

        city['color'] = color;
      });

      this.onSortCities('score');
    });
  }

  onCityNameInput(cityNameToSearch) {
    this.cities = this.unfilteredCities;

    this.cities = this.cities.filter((city) => {
      const cityName: string = city['name'];
      return cityName.includes(cityNameToSearch);
    });

    this.displaySearchSuggestions = cityNameToSearch.length > 1 ? true : false;
  }

  onPickSuggestion(cityName) {
    this.onCityNameInput(cityName);

    this.displaySearchSuggestions = false;

    document.querySelector('#cityNameSearchInput')['value'] = cityName;
  }

  onSortCities(method) {
    this.cities = this.citiesService.sortCities(method, this.cities);

    this.displaySortingArrow(method);
  }

  displaySortingArrow(sortingMethod) {
    const hospitalsTable = document.querySelector('.cities-table');
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
