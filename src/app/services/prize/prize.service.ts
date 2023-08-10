import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestSavePrize } from 'src/app/models/prize-connection/request-save-prize.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IRequestSavePrizePvp } from 'src/app/models/prize-pvp/request-save-prize-pvp.interface';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private apiUrl: string = environment.api
  private url1: string = '/api/prizes/save-prize'
  private url2: string = '/api/prizes/get-prizes'
  private url3: string = '/api/prizes/delete-prize'
  private url4: string = '/api/prizes-pvp/save-prize-pvp'
  private url5: string = '/api/prizes-pvp/get-prizes-pvp'
  private url6: string = '/api/prizes-pvp/delete-prize-pvp'
  
  constructor(
    private http: HttpClient
  ) { }

  savePrize(request: IRequestSavePrize): Promise<any>{
    return this.http.post(`${this.apiUrl}${this.url1}`, request).toPromise()
  }

  getPrizesConnection(): Promise<any>{
    return this.http.get(`${this.apiUrl}${this.url2}`).toPromise()
  }

  deletePrize(id: number): Promise<any> {
    return this.http.delete(`${this.apiUrl}${this.url3}/${id}`).toPromise()
  }

  savePrizePvp(request: IRequestSavePrizePvp): Promise<any> {
    return this.http.post(`${this.apiUrl}${this.url4}`, request).toPromise()
  }

  getPrizePvp(): Promise<any>{
    return this.http.get(`${this.apiUrl}${this.url5}`).toPromise()
  }

  deletePrizePvp(id: number): Promise<any>{
    return this.http.delete(`${this.apiUrl}${this.url6}/${id}`).toPromise()
  }
}
