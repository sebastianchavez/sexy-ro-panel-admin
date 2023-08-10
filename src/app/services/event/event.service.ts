import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestSaveEvent } from 'src/app/models/event/request-save-event.interface';
import { IRequestUpdateEvent } from 'src/app/models/event/request-update-event.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = environment.api
  url1: string = '/api/events/get-events'
  url2: string = '/api/events/save-event'
  url3: string = '/api/events/update-event'
  url4: string = '/api/events/delete-event'

  constructor(
    private http: HttpClient
  ) { }

  getEvents(query: string): Promise<any> {
    return this.http.get(`${this.apiUrl}${this.url1}${query}`).toPromise()
  }

  saveEvent(request: IRequestSaveEvent): Promise<any> {
    return this.http.post(`${this.apiUrl}${this.url2}`, request).toPromise()
  }

  updateEvent(request: IRequestUpdateEvent): Promise<any> {
    return this.http.put(`${this.apiUrl}${this.url3}`, request).toPromise()
  }

  deleteEvent(id: number): Promise<any> {
    return this.http.delete(`${this.apiUrl}${this.url1}/${id}`).toPromise()
  }
}
