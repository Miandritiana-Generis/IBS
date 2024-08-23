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

}
