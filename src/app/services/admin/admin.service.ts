import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { IRequestLoginAdmin, IRequestRegisterAdmin } from 'src/app/models/admin/admin.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl: string = environment.api
  private url1: string = '/api/admins/login'
  private url2: string = '/api/admins/register'
  private url3: string = '/api/admins/get-admins'

  constructor(
    private http: HttpClient
  ) { }

  login(request: IRequestLoginAdmin): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}${this.url1}`, request))
  }

  register(request: IRequestRegisterAdmin): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}${this.url2}`, request))
  }

  getAdmins(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url3}`))
  }
}
