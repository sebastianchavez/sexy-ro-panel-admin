import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IEvent } from '../../../../models/event/event.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { EventService } from 'src/app/services/event/event.service';
import { IRequestSaveEvent } from 'src/app/models/event/request-save-event.interface';
import { IRequestUpdateEvent } from 'src/app/models/event/request-update-event.interface';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  idLog: string = 'EventsComponent'
  types: {
    value: string;
    text: string;
  }[] =  [
    {
      value: 'automatic',
      text: 'Automatico'
    }
  ]
  modalRef?: BsModalRef;
  startDate: string = '';
  endDate: string = '';
  limit: number[] = [10, 25, 50, 100, 0]
  selectedEvent?: IEvent
  filter = {
    title: '',
    limit: 10,
    page: 1,
    type: ''
  }
  event: IEvent = {
    days: 1234567,
    description: '',
    endHour: 2300,
    startHour: 2100,
    title: '',
    type: 'automatic'
  };
  events: IEvent[] = []
  itemPerPage: number = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  submitted: boolean = false;
  btnLoad: boolean = false;
  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }

  constructor(
    private modalService: BsModalService,
    private logger: LoggerService,
    private alertService: AlertService,
    private eventService: EventService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Eventos')
    this.getEvents()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

  search(){
    this.getEvents()
  }

  clearForm(){
    this.submitted = false;
    this.event = {
      title: '',
      description: '',
      type: 'automatic',
      days: 1234567,
      startHour: 2100,
      endHour: 2200,
    }
  }

  async openModal(template: TemplateRef<any>, data?: IEvent) {
    this.clearForm();
    this.event = Object.assign({},data); 
    this.modalRef = this.modalService.show(template);
  }

  async getEvents(){
    try {
      let query = '';
      let count = 0;
      const filter: any = this.filter;
      for await (let obj of  Object.keys(this.filter)) {
        if(filter[obj] && filter[obj] != ''){
          if(count == 0){
            query += `?${obj}=${filter[obj]}`
          } else {
            query += `&${obj}=${filter[obj]}`
          }
          count++
        }
      }
      const response = await this.eventService.getEvents(query)
      this.bigTotalItems = response.totalRegister
      this.itemPerPage = this.filter.limit
      this.events = response.events
      this.logger.log(this.idLog, this.getEvents.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getEvents.name, {info: 'Error', error})
    }
  }

  chageLimit(){
    this.getEvents()
  }

  async deleteEvent(event: IEvent){
    try {
      const confirm = await this.alertService.confirm('Desea eliminar este evento?', 'question', 'Si', 'No')
      if(confirm.value){
        const response = await this.eventService.deleteEvent(event.idEvent!)
        this.logger.log(this.idLog, this.deleteEvent.name, {info: 'Error', response})
      }
    } catch (error) {
      this.logger.error(this.idLog, this.deleteEvent.name, {info: 'Error', error})
    }
  }

  pageChanged(event: any) {
    this.filter.page = event.page
    this.getEvents()
  }

  async saveEvent(){
    try {
      const { title, description, type, days, startHour, endHour, idEvent } = this.event!
      if(idEvent){
        const request: IRequestUpdateEvent = {
          title, 
          description, 
          type, 
          days, 
          startHour, 
          endHour, 
          idEvent
        }
        const response = await this.eventService.updateEvent(request)
        this.logger.log(this.idLog, this.saveEvent.name, {info: 'Success', response})
        this.alertService.toast('Evento actualizado', 'success')
      } else {
        const request: IRequestSaveEvent = {
          title,
          description,
          type,
          days,
          endHour,
          startHour
        }
        const response = await this.eventService.saveEvent(request)
        this.logger.log(this.idLog, this.saveEvent.name, {info: 'Success', response})
        this.alertService.toast('Evento agregado', 'success')
      }
      this.modalRef?.hide()
      this.getEvents()
    } catch (error: any) {
      let msg: string  = 'Problemas al guardar evento'
      if(error.error && error.error.message){
        if(typeof error.error.message == 'object'){
          error.error.message.forEach((x: string) => {
            msg = x
          })
        } else {
          msg = error.error.message
        }
      }
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.saveEvent.name, {info: 'Error', error})
    }
  }
}
