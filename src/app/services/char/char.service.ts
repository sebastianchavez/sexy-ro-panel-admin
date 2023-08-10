import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryGetChars } from '../../models/char/query-get-chars.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { IChar } from 'src/app/models/char/char.interface';

@Injectable({
  providedIn: 'root'
})
export class CharService {
  private apiUrl: string = environment.api
  private url1: string = '/api/admins/get-chars'

  constructor(
    private http: HttpClient
  ) { }

  getChars(query: IQueryGetChars): Promise<any>{
    let count = 0;
    let queryParams = '';
    const params = Object.assign(query)
    for(let q in query){
      if(q && params[q]){
          queryParams += count == 0 ? '?' : '&';
          queryParams += q + '=' + params[q];
        }
        count++ 
  }
    return this.http.get(`${this.apiUrl}${this.url1}${queryParams}`).pipe(map((x: any) => {
      x.data.chars.forEach((c: IChar, i: number) => {
        // x.data.chars[i].start_date_ban = c.start_date_ban ? c.start_date_ban.toDateString() : new Date().toDateString()
        // x.data.chars[i].start_date_bg_lock = c.start_date_bg_lock ? c.start_date_bg_lock.toDateString() : new Date().toDateString()
        // x.data.chars[i].start_date_woe_lock = c.start_date_woe_lock ? c.start_date_woe_lock.toDateString() : new Date().toDateString()
        // x.data.chars[i].end_date_ban = c.end_date_ban ? c.end_date_ban.toDateString() : new Date().toDateString()
        // x.data.chars[i].end_date_bg_lock = c.end_date_bg_lock ? c.end_date_bg_lock.toDateString() : new Date().toDateString()
        // x.data.chars[i].end_date_woe_lock = c.end_date_woe_lock ? c.end_date_woe_lock.toDateString() : new Date().toDateString()
      })
      return x
    })).toPromise()
  }
}
