import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  lastSortingMethod: string;

  constructor() {}

  sortHospitals(method: string, hospitals: Array<object>) {
    if (method === this.lastSortingMethod) {
      return hospitals.reverse();
    }

    if (method === 'name') {
      hospitals.sort((hospitalA, hospitalB) => {
        let hospitalAName = hospitalA['name'];
        let hospitalBName = hospitalB['name'];

        let charInd = 0;

        while (hospitalAName[charInd] === hospitalBName[charInd]) {
          charInd++;

          if (
            charInd === hospitalAName.length - 1 ||
            charInd === hospitalBName.length - 1
          ) {
            break;
          }
        }

        return (
          hospitalBName.charCodeAt(charInd) - hospitalAName.charCodeAt(charInd)
        );
      });
    } else if (
      method === 'occupancyPercentage-General' ||
      method === 'occupancyPercentage-Covid19'
    ) {
      const dataKey = method.split('-')[1].toLocaleLowerCase();
      hospitals.sort((hospitalA, hospitalB) => {
        return (
          parseFloat(hospitalB['occupancyPercentage'][dataKey]) -
          parseFloat(hospitalA['occupancyPercentage'][dataKey])
        );
      });
    } else if (method === 'staffInIsolation') {
      hospitals.sort((hospitalA, hospitalB) => {
        return (
          parseFloat(hospitalB[method].total) -
          parseFloat(hospitalA[method].total)
        );
      });
    }

    this.lastSortingMethod = method;
    return hospitals;
  }
}
