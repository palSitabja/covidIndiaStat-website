import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CovidApiStatesService {
  private url="https://api.covid19india.org/v4/min/timeseries.min.json"
  constructor(private http:HttpClient) { }

  getStatesData():Observable<any>{
    
    return this.http.get<any>(this.url)
  }
}
