import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestSaveNews } from 'src/app/models/news/request-save-news.interfarce';
import { IRequestUpdateNewsImage } from 'src/app/models/news/request-update-news-image.interface';
import { IRequestUpdateNews } from 'src/app/models/news/request-update-news.interdace';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl: string = environment.api
  url1: string = '/api/news/update-image'
  url2: string = '/api/news/get-news'
  url3: string = '/api/news/save-news'
  url4: string = '/api/news/update-news'
  url5: string = '/api/news/delete-news'

  constructor(
    private http: HttpClient
  ) { }

  updateImage(request: IRequestUpdateNewsImage): Promise<any>{
    return this.http.put(`${this.apiUrl}${this.url1}`, request).toPromise()
  }

  getNews(query: string): Promise<any>{
    return this.http.get(`${this.apiUrl}${this.url2}${query}`).toPromise()

  }

  saveNews(request: IRequestSaveNews): Promise<any>{
    return this.http.post(`${this.apiUrl}${this.url3}`, request).toPromise()
  }

  updateNews(request: IRequestUpdateNews): Promise<any>{
    return this.http.put(`${this.apiUrl}${this.url4}`, request).toPromise()
  }

  deleteNews(id: number): Promise<any>{
    return this.http.delete(`${this.apiUrl}${this.url5}/${id}`).toPromise()
  }
}
