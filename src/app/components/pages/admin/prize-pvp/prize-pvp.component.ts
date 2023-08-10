import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IItem } from 'src/app/models/item/item.interface';
import { IPrizePvp } from 'src/app/models/prize-pvp/prize-pvp.interface';
import { IRequestSavePrizePvp } from 'src/app/models/prize-pvp/request-save-prize-pvp.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ItemService } from 'src/app/services/item/item.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { PrizeService } from 'src/app/services/prize/prize.service';

@Component({
  selector: 'app-prize-pvp',
  templateUrl: './prize-pvp.component.html',
  styleUrls: ['./prize-pvp.component.scss']
})
export class PrizePvpComponent implements OnInit {

  idLog: string = 'PrizeComponent'
  modalRef?: BsModalRef;
  items: IItem[] = []
  selectedItem: {
    itemId: string;
    lessthan: number;
    morethan: number;
    quantity: number;
  } = {
    itemId: '',
    lessthan: 0,
    morethan: 0,
    quantity: 0
  }
  prizes: IPrizePvp[] = []
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
    this.menuService.setTitlePage('Premios x Ranking PVP')
    this.getPrizes()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

  async openModal(template: TemplateRef<any>) {
    // this.selectedItem.day = day;
    // this.selectedItem.quantity = 0;
    // delete this.selectedItem.itemId;
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
      const response = await this.prizeService.getPrizePvp()
      this.prizes = response
      // this.days.forEach(x => {
      //   const prize: any = response.filter((r:any) => r.day == x)
      //   // this.prizes.push({
      //   //   day: x,
      //   //   prize
      //   // })
      // })
      this.logger.log(this.idLog, this.getPrizes.name, {info: 'Success', response})  
    } catch (error) {
      this.logger.error(this.idLog, this.getPrizes.name, {info: 'Error', error})  
    }
  }

  selectItem(ev: any){
    // this.selectedItem.itemId = ev
  }

  async savePrize(){
    const { itemId, quantity, morethan, lessthan } = this.selectedItem
    if(this.selectedItem.itemId && Number(this.selectedItem.itemId) > 0 && this.selectedItem.quantity > 0){
      try {
        const request: IRequestSavePrizePvp = {
          item_id: Number(itemId), 
          quantity, 
          morethan, 
          lessthan
        }
        const response = await this.prizeService.savePrizePvp(request)
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

  async deletePrize(p: IPrizePvp){
    const confirm = await this.alerService.confirm('Desea eliminar este item?')
    if(confirm.value){
        try {
          const response = await this.prizeService.deletePrizePvp(p.prizepvp_id!)
          this.getPrizes()
          this.logger.log(this.idLog, this.deletePrize.name, {info: 'Success', response})
        } catch (error) {
          this.logger.error(this.idLog, this.deletePrize.name, {info: 'Error', error})
        }
    }
  }

}
