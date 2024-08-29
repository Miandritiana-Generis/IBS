import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private urlListSalle = Constants.BASE_URL+'/liste-salle';

  constructor(private http: HttpClient) { }

  getListeSalle() : Observable<any> {
    return this.http.get<{
      id: string;
      nom : string
    }>(`${this.urlListSalle}`);
  }




}
