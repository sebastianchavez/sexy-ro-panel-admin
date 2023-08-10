import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  stateSidemenu: BehaviorSubject<any> = new BehaviorSubject(true);
  titlePage: BehaviorSubject<string> = new BehaviorSubject('Panel Administración')

  constructor() { }

  changeStateSidemenu(state: boolean) {
    this.stateSidemenu.next(state)
  }

  getStateSidemenu() {
    return this.stateSidemenu.asObservable()
  }

  setTitlePage(title: string){
    this.titlePage.next(title)
  }

  getTitlePage(){
    return this.titlePage.asObservable() 
  }
}
