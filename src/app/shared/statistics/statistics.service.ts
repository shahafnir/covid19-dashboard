import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  URL = environment.covid19API;
  constructor(private http: HttpClient) {}

  async getTestsReportByDate(date: string) {
    return await this.http.get(`${this.URL}/tests-reports/${date}`).toPromise();
  }

  async getTestsReports() {
    return await this.http.get(`${this.URL}/tests-reports/`).toPromise();
  }

  getStatisticsByDate(date: string) {
    return this.http.get(`${this.URL}/statistics/${date}`);
  }

  getStatistics() {
    return this.http.get(`${this.URL}/statistics`);
  }

  getCities() {
    return this.http.get(`${this.URL}/cities`);
  }

  getHospitals() {
    return this.http.get(`${this.URL}/hospitals`);
  }
}
