import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  lastSortingMethod: string;

  constructor() {}

  sortCities(method: string, cities: Array<object>) {
    if (method === this.lastSortingMethod) {
      return cities.reverse();
    }

    if (method === 'name') {
      cities.sort((cityA, cityB) => {
        let cityAName = cityA['name'];
        let cityBName = cityB['name'];

        let charInd = 0;

        while (cityAName[charInd] === cityBName[charInd]) {
          charInd++;

          if (
            charInd === cityAName.length - 1 ||
            charInd === cityBName.length - 1
          ) {
            break;
          }
        }

        return cityBName.charCodeAt(charInd) - cityAName.charCodeAt(charInd);
      });
    } else {
      cities.sort((cityA, cityB) => {
        return parseFloat(cityB[method]) - parseFloat(cityA[method]);
      });
    }

    this.lastSortingMethod = method;
    return cities;
  }
}
