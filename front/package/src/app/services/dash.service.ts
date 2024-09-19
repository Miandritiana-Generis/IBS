import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  
  urlClasse: string = Constants.BASE_URL + '/liste-classe';
  urlTotalAbs: string = Constants.BASE_URL + '/totalAbsence';
  urlNiveau: string = Constants.BASE_URL + '/liste-niveau';
  urlTaux: string = Constants.BASE_URL + '/taux-absence-presence';

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

  

  getTaux(idClasse?: number, idNiveau?: number, monthYear?: string): Observable<any> {
    let params = new HttpParams();
  
    if (idClasse) {
      params = params.set('id_classe', idClasse.toString());
    }
    if (idNiveau) {
      params = params.set('id_niveau', idNiveau.toString());
    }
    if (monthYear) {
      params = params.set('month_year', monthYear);
    }

    // console.log("classe > "+idClasse);
    // console.log("niveau > "+idNiveau);
    // console.log("monthY > "+monthYear);
    
    console.log(this.urlTaux, { params });
  
    return this.http.get<{
      monthYear: string;
      absentCount: number;
      presentCount: number;
    }>(`${this.urlTaux}`, { params });
  }
  
}
