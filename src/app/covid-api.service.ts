import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private url="https://cors-anywhere.herokuapp.com/https://api.covid19india.org/data.json" 
  constructor(private http:HttpClient) { }

  getData():Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
}
