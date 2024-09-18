import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  
  urlClasse: string = Constants.BASE_URL + '/liste-classe';
  urlTotalAbs: string = Constants.BASE_URL + '/totalAbsence';
  urlNiveau: string = Constants.BASE_URL + '/liste-niveau';

  constructor(private http: HttpClient) { }

  getListClasse() : Observable<any> {
    return this.http.get<{
      id: string;
      classe: string;
    }>(`${this.urlClasse}`);
  }

  getTotalAbsence(date?: string, idClasse?: number): Observable<number> {
    let params = new HttpParams();
    
    if (date) {
      params = params.set('date', date);
    }
  
    if (idClasse !== undefined) {
      params = params.set('idClasse', idClasse.toString());
    }
  
    return this.http.get<number>(this.urlTotalAbs, { params });
  }

  getListNiveau() : Observable<any> {
    return this.http.get<{
      id: string;
      nom: string;
    }>(`${this.urlNiveau}`);
  }
  
}
