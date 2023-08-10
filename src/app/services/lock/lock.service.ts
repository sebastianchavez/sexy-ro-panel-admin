import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestLockUser } from 'src/app/models/user/request-lock-user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LockService {

  private apiUrl: string = environment.api
  private url1: string = '/api/admins/lock-user'

  constructor(
    private http: HttpClient
  ) { }

  lockUser(request: IRequestLockUser){
    return this.http.put(`${this.apiUrl}${this.url1}`, request).toPromise()
  }
}
