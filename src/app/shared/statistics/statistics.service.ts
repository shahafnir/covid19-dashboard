import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTestsReport(date: string) {
    return this.http.get(`${this.URL}/tests-reports/${date}`);
  }

  getStatistics(date: string) {
    return this.http.get(`${this.URL}/statistics/${date}`);
  }
}
