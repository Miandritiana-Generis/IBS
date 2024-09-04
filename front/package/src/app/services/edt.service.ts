import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Constants } from '../util/constants';
import { Time } from '@angular/common';
import { Edt } from '../modeles/Edt';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EdtService {
  apiUrl: string = Constants.BASE_URL + '/presences'; // or another appropriate URL

  
  sendFichePresenceData(data: any[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  private urlListEdt = Constants.BASE_URL+'/liste-edt';
  private urlTokenValue = 'localhost:8081/token';
  private urlFichePresence = Constants.BASE_URL+'/presences';
  private urlFichePresenceToday = Constants.BASE_URL+'/presences/today';
  private urlEdt = Constants.BASE_URL+'/edt';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getListEdt(idPersonne :number) : Observable<any> {
    localStorage.setItem("idPersonne", "1");
    return this.http.get<{
      id: string;
      idMatiere: string;
      idClasse: string;
      idSalle: string;
      idEnseignant: string;
      estAnnule: string;
      date: Date;
      debut: Time;
      fin: Time,
      matiere : string,
      classe : string,
      enseignant : string,
      salle : string,
      idPersonne : string,
      idEtudiant : string
    }>(`${this.urlListEdt}?id_personne=${idPersonne}`);
  }

  getTokenUtilisateur() : Observable<any> {
    return this.http.get(`${this.urlTokenValue}`);
  }

  getInfoFichePresence(id_salle?: number, heure?: string, date?: string, id_edt?: string): Observable<any> {
    let params = new HttpParams();
    
    if (id_salle !== undefined) {
        params = params.append('id_salle', id_salle.toString());
    }
    if (id_edt !== undefined) {
        params = params.append('id_edt', id_edt);
    }
    if (heure) {
        params = params.append('heure', heure);
    }
    if (date) {
        params = params.append('date', date);
    }

    return this.http.get<{
        id: string;
        id_edt: string;
        id_classe_etudiant: string;
        nom: string;
        prenom: string;
        photo: string;
        heure_arrive: Time;
        status: boolean;
        salle: string;
        matiere: string;
        enseignant: string;
        classe: string;
        date: Date;
        debut: Time;
        fin: Time;
    }>(this.urlFichePresence, { params });
}

  getInfoFichePresenceToday(id_salle : number, date : string) : Observable<any> {
    // let id_salle_temp = localStorage.getItem("salle");
    // if (id_salle_temp !== null) {
    //     id_salle = parseInt(id_salle_temp, 10);
    // } else {
    //     console.warn("La salle n'a pas été trouvée dans le localStorage. Utilisation de l'ID par défaut.");
    //     id_salle = 0;
    // }
    return this.http.get<{
      id: string;
      id_edt : string;
      id_classe_etudiant: string;
      nom: string;
      prenom: string;
      photo: string;
      heure_arrive: Time;
      status: boolean;
      salle: string;
      matiere: string,
      enseignant : string,
      classe : string,
      date : Date,
      debut : Time,
      fin : Time
    }>(`${this.urlFichePresenceToday}?id_salle=${id_salle}`);
  }


  sendFichePresenceDataService(data: any[]): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/fiche-presence', data);
  }  

  getEdt(datedebut : Date,datefin :Date): Observable<Edt[]> {
    const token=this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Edt[]>(`${this.urlEdt}?dateDebut=${EdtService.formatDate(datedebut)}&dateFin=${EdtService.formatDate(datefin)}`, { headers })
      .pipe(
        catchError(this.handleError<Edt[]>('getEdt'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
   //send id salle
   sendIdSalle(id_salle: number): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/set_id_salle', id_salle);
  }

}
