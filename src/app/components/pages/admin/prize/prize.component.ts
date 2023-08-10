import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IItem } from 'src/app/models/item/item.interface';
import { IPrizeConnection } from 'src/app/models/prize-connection/prize-connection.interface';
import { IRequestSavePrize } from 'src/app/models/prize-connection/request-save-prize.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ItemService } from 'src/app/services/item/item.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { PrizeService } from 'src/app/services/prize/prize.service';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.scss']
})
export class PrizeComponent implements OnInit {
  idLog: string = 'PrizeComponent'
  days: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  modalRef?: BsModalRef ;
  items: IItem[] = []
  selectedItem: IRequestSavePrize = {
    day: 0,
    quantity: 0
  }
  prizes: IPrizeConnection[] = []
  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }
  constructor(
    private modalService: BsModalService,
    private itemService: ItemService,
    private prizeService: PrizeService,
    private alerService: AlertService,
    private logger: LoggerService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Premios x Conexión')
    this.getPrizes()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

  async openModal(template: TemplateRef<any>, day: number) {
    this.selectedItem.day = day;
    this.selectedItem.quantity = 0;
    delete this.selectedItem.itemId;
    this.modalRef = this.modalService.show(template);
  }

  async searchItems(ev: any){
    const value = ev.target.value
    if(value.length > 2){
      try {
        const response = await this.itemService.getItems(`?name=${value}&page=1&limit=10`)
        this.items = response
        this.logger.log(this.idLog, this.searchItems.name, {info: 'Success', response})
      } catch (error) {
        this.logger.error(this.idLog, this.searchItems.name, {info: 'Error', error})
      }
    } else {
      this.items = []
    }
  }

  async getPrizes(){
    try {
      this.prizes = []
      const response = await this.prizeService.getPrizesConnection()
      this.days.forEach(x => {
        const prize: any = response.filter((r:any) => r.day == x)
        this.prizes.push({
          day: x,
          prize
        })
      })
      this.logger.log(this.idLog, this.getPrizes.name, {info: 'Success', response})  
    } catch (error) {
      this.logger.error(this.idLog, this.getPrizes.name, {info: 'Error', error})  
    }
  }

  selectItem(ev: any){
    this.selectedItem.itemId = ev
  }

  async savePrize(){
    
    if(this.selectedItem.itemId && this.selectedItem.itemId > 0 && this.selectedItem.quantity > 0){
      try {
        const response = await this.prizeService.savePrize(this.selectedItem)
        this.modalRef?.hide()
        this.alerService.toast('Premio agregado', 'success')
        this.logger.log(this.idLog, this.savePrize.name, {info: 'Success', response})
        this.getPrizes()
      } catch (error: any) {
        const msg = error.error && error.error.message ? error.error.message : 'Problemas al agregar premio, por favor intente más tarde'
        this.alerService.alert(msg,'error')
        this.logger.error(this.idLog, this.savePrize.name, {info: 'Error', error})
      }
    } else {
      this.alerService.alert('Debe seleccionar un item con cantidad mayor a 0', 'warning')
    }
  }

  async deletePrize(day: number, index: number){
    const confirm = await this.alerService.confirm('Desea eliminar este item?')
    if(confirm.value){
      this.prizes.forEach(async(x, i) => {
        if(x.day==day){
          try {
            const response = await this.prizeService.deletePrize(this.prizes[i].prize[index].prizeconnection_id)
            this.prizes[i].prize.splice(index,1)
            this.logger.log(this.idLog, this.deletePrize.name, {info: 'Success', response})
          } catch (error) {
            this.logger.error(this.idLog, this.deletePrize.name, {info: 'Error', error})
          }
        }
      })
    }
  }
}
