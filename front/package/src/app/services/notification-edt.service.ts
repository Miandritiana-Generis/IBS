import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../modeles/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationEdtService {
  apiUrl: string = Constants.BASE_URL + '/notifications';

  constructor(private http: HttpClient) { 

  }

  getNotification() : Observable<any> {
    return this.http.get<{
      data:Notification[],
      count:number
    }>(`${this.apiUrl}`);
  }


}
