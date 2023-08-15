import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryGetChars } from '../../models/char/query-get-chars.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { IChar } from 'src/app/models/char/char.interface';
import { lastValueFrom } from 'rxjs';

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
    const { limit, page, email, ip, name } = query
    let queryParams = `?limit=${limit}&page=${page}&email=${email || ''}&name=${name || ''}&ip=${ip || ''}`;
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url1}${queryParams}`))
  }
}
