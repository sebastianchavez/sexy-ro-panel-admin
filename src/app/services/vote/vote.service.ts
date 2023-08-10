import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private apiUrl: string = environment.api
  private url1: string = '/api/vote/save-question'
  private url2: string = '/api/vote/update-question'
  private url3: string = '/api/vote/delete-question/:id'
  private url4: string = '/api/vote/get-questions'
  private url5: string = '/api/vote/get-questions-availables'
  private url6: string = '/api/vote/save-alternative'
  private url7: string = '/api/vote/update-alternative'
  private url8: string = '/api/vote/delete-alternative/:id'
  private url9: string = '/api/vote/get-alternatives'
  private url10: string = '/api/vote/get-alternatives-by-question'
  private url11: string = '/api/vote/save-vote'
  private url12: string = '/api/vote/get-votes'

  constructor(
    private http: HttpClient
  ) { }

  saveQuestion(request: any): Promise<any>{
    console.log(`${this.apiUrl}${this.url1}`, request);
    
    return lastValueFrom(this.http.post(`${this.apiUrl}${this.url1}`, request))
  }

  updateQuestion(request: any): Promise<any>{
    return lastValueFrom(this.http.put(`${this.apiUrl}${this.url2}`, request))
  }

  deleteQuestion(id: number): Promise<any>{
    return lastValueFrom(this.http.delete(`${this.apiUrl}${this.url3.replace(':id', id.toString())}`))
  }

  getQuestions(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url4}`))
  }

  getQuestionsAvailables(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url5}`))
  }

  updateAlternative(request: any): Promise<any>{
    return lastValueFrom(this.http.put(`${this.apiUrl}${this.url6}`, request))
  }

  deleteAlternative(id: number): Promise<any>{
    return lastValueFrom(this.http.delete(`${this.apiUrl}${this.url7.replace(':id', id.toString())}`))
  }

  getAlternatives(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url8}`))
  }

  getAlternativesByQuestion(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url9}`))

  }

  saveVote(request: any): Promise<any>{
    return lastValueFrom(this.http.post(`${this.apiUrl}${this.url10}`, request))
  }

  getVotes(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url11}`))

  }
}
