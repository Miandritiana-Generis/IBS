import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private urlListAppli = Constants.BASE_URL+'/liste-application';

  constructor(private http: HttpClient) { }

  getListeAppli() : Observable<any> {
    return this.http.get<{
      id: string;
      nom : string
    }>(`${this.urlListAppli}`);
  }
}
