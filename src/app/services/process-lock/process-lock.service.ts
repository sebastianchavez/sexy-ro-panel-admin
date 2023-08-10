import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryProcessLock } from 'src/app/models/process-lock/query-process-lock.interface';
import { IRequestSaveProcessLock } from 'src/app/models/process-lock/request-save-process-lock.interface';
import { IRequestUpdateProcessLock } from 'src/app/models/process-lock/request-update-process-lock.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessLockService {

  private apiUrl: string = environment.api
  private url1: string = '/api/process-lock/get-processes-locks'
  private url2: string = '/api/process-lock/get-process-lock'
  private url3: string = '/api/process-lock/save-process-lock'
  private url4: string = '/api/process-lock/update-process-lock'
  private url5: string = '/api/process-lock/delete-process-lock'

  constructor(
    private http: HttpClient
  ) { }

  async getProcessLock(query: IQueryProcessLock): Promise<any>{
    let queryParams: string = ''
    let counter: number = 0;
    const keysQuery: any = query;
      for await(let q of Object.keys(keysQuery)){
        if(keysQuery[q] && keysQuery[q] != ''){
          if(counter == 0){
            queryParams += `?${q}=${keysQuery[q]}`
          } else {
            queryParams += `&${q}=${keysQuery[q]}`
          }
          counter++;
        }
      }
    return this.http.get(`${this.apiUrl}${this.url1}${queryParams}`).toPromise()
  }

  saveProcessLock(request: IRequestSaveProcessLock){
    return this.http.post(`${this.apiUrl}${this.url3}`, request).toPromise()
  }

  updateProcessLock(request: IRequestUpdateProcessLock){
    return this.http.put(`${this.apiUrl}${this.url4}`, request).toPromise()
  }

  deleteProcessLock(id: number){
    return this.http.delete(`${this.apiUrl}${this.url5}/${id}`).toPromise()
  }
}
