import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestFile } from 'src/app/models/client/request-file.interface';
import { IRequestNewClient } from '../../models/client/request-new-client.interface';
import { IRequestUpdateClient } from 'src/app/models/client/request-update-client.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl: string = environment.api
  url1: string = '/api/clients/update-file'
  url2: string = '/api/clients/new-version'
  url3: string = '/api/clients/get-clients'
  url4: string = '/api/clients/update-client'

  constructor(
    private http: HttpClient
  ) { }

  updateFile(request: IRequestFile): Promise<any> {
    return this.http.post(this.baseUrl + this.url1, request).toPromise()
  }

  newVersion(request: IRequestNewClient): Promise<any> {
    return this.http.post(this.baseUrl + this.url2, request).toPromise()
  }

  getClients(query: { page: number; limit: number; }): Promise<any> {
    return this.http.get(`${this.baseUrl + this.url3}`).toPromise()
  }

  changeForceUpdate(request: IRequestUpdateClient): Promise<any> {
    return this.http.put(this.baseUrl + this.url4, request).toPromise()
  }
}
