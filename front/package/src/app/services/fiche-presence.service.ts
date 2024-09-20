import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichePresenceService {

  private urlValiderProf = Constants.BASE_URL+'/presences/validerProf';
  private urlValiderDelegue = Constants.BASE_URL+'/presences/validerDelegue';
  private urlCoursEstAnnule = Constants.BASE_URL+'/presences/estAnnule';
  private urlEstProf = Constants.BASE_URL+'/presences/estProf';

  constructor(private http: HttpClient) { }

  validerProf(idEdt: string, tokenValue: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${tokenValue}`,  // S'assurer du bon format du token
      'Content-Type': 'application/json'
    });
  
    return this.http.put(
      `${this.urlValiderProf}`,
      null,  // Pas de corps dans la requête PUT
      {
        params: new HttpParams().set('idEdt', idEdt),  // Utilisation de HttpParams pour garantir que `idEdt` est bien passé
        headers: headers,  // Ajout des en-têtes
        responseType: 'text'  // Si tu attends une réponse textuelle
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  

  
  




  
validerDelegue(idEdt: string, tokenValue: string): Observable<any> {
  return this.http.put(
      `${this.urlValiderDelegue}`,
      null,
      {
          params: { idEdt: idEdt.toString() },
          headers: { 'Authorization': tokenValue },
          responseType: 'text'  // <-- Ajout du responseType
      }
  ).pipe(
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
      })
  );
}

estAnnule(idEdt: number): Observable<any> {
  const params = new HttpParams().set('idEdt', idEdt.toString());

  return this.http.get(`${this.urlCoursEstAnnule}`, { params: params }).pipe(
    catchError((error: any) => {
      console.error('Error during API call:', error);
      throw error;
    })
  );
}

estProf(tokenValue: string): Observable<{ estAnnule: boolean }> {
  const headers = new HttpHeaders({
    'Authorization': tokenValue
  });

  return this.http.get<{ estAnnule: boolean }>(`${this.urlEstProf}`, { headers });
}


}
