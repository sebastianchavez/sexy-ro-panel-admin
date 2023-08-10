import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl: string = environment.api
  private url1: string = '/api/items/get-items'
  
  constructor(
    private http: HttpClient
  ) { }

  getItems(query: string): Promise<any>{
    return this.http.get(`${this.apiUrl}${this.url1}${query}`).toPromise()
  }
}
