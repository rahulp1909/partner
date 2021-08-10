import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private trafficUpdate = new Subject;

  constructor(private http: HttpClient) { }

  getTrafficDetails(date: string) {
    const queryParams = `?date=${date}`;

    this.http.get<any>(baseUrl + '/provider/traffic' + queryParams).subscribe( (result) => {
      this.trafficUpdate.next(result);
    });
  }

  getTrafficUpdate() {
    return this.trafficUpdate.asObservable();
  }
}
