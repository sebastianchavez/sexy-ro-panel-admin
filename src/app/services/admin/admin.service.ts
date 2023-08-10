import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { IRequestLoginAdmin } from 'src/app/models/admin/admin.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl: string = environment.api
  private url1: string = '/api/admins/login'
  currentAdmin: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient
  ) { }

  login(request: IRequestLoginAdmin): Promise<any> {
    return firstValueFrom(this.http.post(`${this.apiUrl}${this.url1}`, request))
  }
}
