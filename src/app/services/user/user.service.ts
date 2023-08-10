import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRequestUser } from '../../models/user/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.api
  private url1: string = '/api/users/login'
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient
  ) { }

  login(request: IRequestUser): Promise<any> {
    return this.http.post(`${this.apiUrl}${this.url1}`, request).toPromise()
  }
}
