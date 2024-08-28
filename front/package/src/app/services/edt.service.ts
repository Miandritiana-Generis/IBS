import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EdtService {
  private urlListEdt = Constants.BASE_URL+'/liste-edt';
  private urlTokenValue = 'localhost:8081/token';
  private urlFichePresence = Constants.BASE_URL+'/presences';

  constructor(private http: HttpClient) { }

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

  getInfoFichePresence(id_salle : number, heure : string, date : string) : Observable<any> {
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
    }>(`${this.urlFichePresence}?id_salle=${id_salle}`);
  }




}
