import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JustificationAbsenceService {
  private urlValiderProf = Constants.BASE_URL+'/justification';

  
  constructor(private http: HttpClient) { }

  justifierDelegue(justification: any) : Observable<any>{
    return this.http.post(this.urlValiderProf, justification);
  }
  
}
