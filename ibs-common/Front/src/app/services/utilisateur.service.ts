import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private baseUrl = Constants.BASE_URL;
  constructor(private http:HttpClient , private authentification:AuthentificationService) { }

  insert(data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    return this.http.post(`${this.baseUrl}/utilisateur`, data,{headers});
  }
  

  findAll(sort:{ label:string,value:string,active:boolean}[],entiteId:number, codeid:number,nom:string,page:number,size:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    var parametre="";
    parametre=parametre+"?page="+page
    if(entiteId>0){
      parametre=parametre+"&entiteId="+entiteId
    }
    if(codeid>0){
      parametre=parametre+"&codeId="+codeid
    }
    if(size>0){
      parametre=parametre+"&size="+size
    }
    if(nom!==""){
      parametre=parametre+"&nom="+nom
    }
    for(let item of sort){
      if(item.active){
        parametre=parametre+"&sortBy="+item.value
      }
    }
    return this.http.get<{
      content:any[];
      pageable:{
        pageNumber:number;
        pageSize:number;
      };
      totalElements:number;
      totalPages:number;

    }>(`${this.baseUrl}/utilisateurs${parametre}`, {headers});
  }

  
  getDataProfil(idUtilisateur: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    var url;
    if(idUtilisateur==0) {
      url = `${this.baseUrl}/utilisateur/profil`;
    }
    else {
      url = `${this.baseUrl}/utilisateur/profil?idUtilisateur=${idUtilisateur}`;
    }
    return this.http.get<{
      id: number;
      login: string;
      motdepasse: string;
      nom: string;
      prenom: string;
      superutilisateur: boolean;
      code: {
        id: number;
        numero: number;
        description: string;
        entite: {
          id: number;
          nom: string;
        };
      };
    }>(url,{headers})
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.erreurs[0].messageErreur));
      })
    );
  }

  updateSuperUtilisateur(id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    return this.http.get(`${this.baseUrl}/utilisateur/superutilisateur/${id}`,{headers});
  }

  delete(id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    return this.http.delete(`${this.baseUrl}/utilisateur/delete/${id}`,{headers});
  }

  modifiermotdepasse(idUtilisateur: number, ancienmotdepasse: string, nouveaumotdepasse: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authentification.getToken()}`
    });
    var utilisateur = {
      "id":idUtilisateur,
      "motdepasse":nouveaumotdepasse,
      "ancienmotdepasse":ancienmotdepasse 
    }
    var url = `${this.baseUrl}/utilisateur/update/motdepasse`;
    return this.http.put(url,utilisateur,{headers})
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error.erreurs[0].messageErreur));
      })
    )
  }
}
