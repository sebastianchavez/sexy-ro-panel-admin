import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProcessLock } from 'src/app/models/process-lock/process-lock.interface';
import { IQueryProcessLock } from 'src/app/models/process-lock/query-process-lock.interface';
import { IRequestSaveProcessLock } from 'src/app/models/process-lock/request-save-process-lock.interface';
import { IRequestUpdateProcessLock } from 'src/app/models/process-lock/request-update-process-lock.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ProcessLockService } from 'src/app/services/process-lock/process-lock.service';

@Component({
  selector: 'app-process-lock',
  templateUrl: './process-lock.component.html',
  styleUrls: ['./process-lock.component.scss']
})
export class ProcessLockComponent implements OnInit {

  // 'name', 'size', 'type'
  typesValidations: {
    text: string;
    value: string;
  }[] = [
    {
      text: 'Nombre',
      value: 'name'
    },{
      text: 'Tamaño',
      value: 'size'
    },{
      text: 'Tipo',
      value: 'type'
    }
  ]
  idLog: string = 'ProcessLockComponent'
  selectedProcessLock?: IProcessLock;
  newProcessLock: {
    typeValidation: string;
    value: string;
    range: number;
  } = {
    typeValidation: '',
    value: '',
    range: 0
  }
  modalRef?: BsModalRef;
  limit: number[] = [10, 25, 50, 100, 0]
  filter = {
    typeValidation: '',
    value: '',
    limit: 10,
    page: 1
  }
  processLocks: IProcessLock[] = []
  itemPerPage: number = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  submitted: boolean = false;
  btnLoad: boolean = false;

  constructor(
    private modalService: BsModalService,
    private logger: LoggerService,
    private processLockService: ProcessLockService,
    private alertService: AlertService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Bloqueo de Procesos - Anticheat')
    this.getProcessLocks()
  }

  clearForm(){
    this.newProcessLock = {
      typeValidation: '',
      value: '',
      range: 0
    }
    this.submitted = false;
  }

  chageLimit(){
    this.getProcessLocks()
  }

  search(){
    this.getProcessLocks()
  }

  async getProcessLocks(){
    try {
      const query: IQueryProcessLock = {
        ...this.filter 
      }
      const response = await this.processLockService.getProcessLock(query)
      this.processLocks = response.processLocks;
      this.bigTotalItems = response.totalRegister
      this.itemPerPage = Number(this.filter.limit)
      this.logger.log(this.idLog, this.getProcessLocks.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getProcessLocks.name, {info: 'Error', error})
    }
  }

  async openModal(template: TemplateRef<any>, data?: IProcessLock) {
    this.selectedProcessLock = Object.assign({},data); 
    if(data){
      this.selectedProcessLock.typeValidation = data.typeValidation.toString().split(',')
    }
    this.modalRef = this.modalService.show(template);
    this.clearForm();
  }

  async deleteProcess(process: IProcessLock){
    try {
      const confirm = await this.alertService.confirm('Desea eliminar proceso?')
      if(confirm.value){
        await this.processLockService.deleteProcessLock(process.idProcesslock)
        this.alertService.toast('Proceso eliminado')
        this.getProcessLocks()
      } 
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al eliminar proceso, por favor intente más tarde' 
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.deleteProcess.name, {info: 'Error', error})
    }
  }

  pageChanged(event: any) {
    this.filter.page = event.page
    this.getProcessLocks()
  }

  async updateProcessLock(){
    try {
      const request: IRequestUpdateProcessLock = {
        typeValidation: this.selectedProcessLock!.typeValidation.toString(),
        value: this.selectedProcessLock!.value,
        idProcesslock: this.selectedProcessLock!.idProcesslock,
        range: this.selectedProcessLock!.range
      }
      const response = await this.processLockService.updateProcessLock(request)
      this.alertService.toast('Proceso actualizado')
      this.modalRef?.hide()
      this.logger.log(this.idLog, this.updateProcessLock.name, {info: 'Success', response})
      this.getProcessLocks()
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al actualizar proceso, por favor intente más tarde' 
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.updateProcessLock.name, {info: 'Error', error})
    }
  }

  async saveProcessLock(){
    try {
      const request: IRequestSaveProcessLock = {
        typeValidation: this.newProcessLock.typeValidation.toString(),
        value: this.newProcessLock.value,
        range: this.newProcessLock.range
      }
      const response = await this.processLockService.saveProcessLock(request)
      this.alertService.toast('Proceso guardado')
      this.modalRef?.hide()
      this.getProcessLocks()
      this.logger.log(this.idLog, this.saveProcessLock.name, {info: 'Success', response})
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al guardar proceso, por favor intente más tarde' 
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.saveProcessLock.name, {info: 'Error', error})
    }
  }
}
