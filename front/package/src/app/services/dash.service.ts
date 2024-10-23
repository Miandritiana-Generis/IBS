import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { Constants } from '../util/constants';
import { Page } from '../modeles/Page';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  
  urlClasse: string = Constants.BASE_URL + '/liste-classe';
  urlTotalAbs: string = Constants.BASE_URL + '/totalAbsence';
  urlNiveau: string = Constants.BASE_URL + '/liste-niveau';
  urlTaux: string = Constants.BASE_URL + '/taux-absence-presence';
  urlTotalHAbs: string = Constants.BASE_URL + '/total-heure-absence';

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
      params = params.set('idClasse', idClasse.toString());  // Use 'idClasse' instead of 'id_classe'
    }
    if (idNiveau) {
      params = params.set('idNiveau', idNiveau.toString());  // Use 'idNiveau' instead of 'id_niveau'
    }
    if (monthYear) {
      params = params.set('monthYear', monthYear);  // Use 'monthYear' instead of 'month_year'
    }
  
    console.log(this.urlTaux, params.toString());  // Will print the full URL with query parameters
    
    return this.http.get<{
      monthYear: string;
      absentCount: number;
      presentCount: number;
    }>(`${this.urlTaux}`, { params });
  }

  getAbsentTotalH(idAnneeScolaire: number, page: number): Observable<any> {
  
    return this.http.get<{
      totalElements: number,
      totalPages: number,
      size: number,
      content: any[]
    }>(`${this.urlTotalHAbs}?idAnneeScolaire=${idAnneeScolaire}&page=${page}`)
      .pipe(
      );
  }
  
  
  
}
