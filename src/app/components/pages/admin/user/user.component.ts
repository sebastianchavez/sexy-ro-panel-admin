import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IChar } from 'src/app/models/char/char.interface';
import { IQueryGetChars } from '../../../../models/char/query-get-chars.interface';
import { IRequestLockUser } from 'src/app/models/user/request-lock-user.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CharService } from 'src/app/services/char/char.service';
import { LockService } from 'src/app/services/lock/lock.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import * as moment from 'moment'
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  idLog: string = 'UserComponent'
  limit: number[] = [10, 25, 50, 100, 0]
  modalRef?: BsModalRef;
  filter: IQueryGetChars = {
    limit: 10,
    page: 1,
  }
  itemPerPage: number = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  submitted: boolean = false;
  chars: IChar[] = []
  btnLoad: boolean = false;

  selectedChar: IChar = {
    account_id: 0,
    base_level: 0,
    char_id: 0,
    email: '',
    job_level: 0,
    last_ip: '',
    last_map: '',
    last_x: 0,
    last_y: 0,
    name: '',
    end_date_ban: new Date(),
    end_date_bg_lock: new Date(),
    end_date_woe_lock: new Date(),
    is_ban: false,
    is_bg_lock: false,
    is_woe_lock: false,
    start_date_ban: new Date(),
    start_date_bg_lock: new Date(),
    start_date_woe_lock: new Date(),
  }

  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }

  lockUpd: {
    allDaysBan: boolean;
    allDaysBg: boolean;
    allDaysWoe: boolean;
    daysBan: number;
    daysBg: number;
    daysWoe: number;
  } = {
      allDaysBan: false,
      allDaysBg: false,
      allDaysWoe: false,
      daysBan: 0,
      daysBg: 0,
      daysWoe: 0
    }
  constructor(
    private modalService: BsModalService,
    private charService: CharService,
    private lockService: LockService,
    private logger: LoggerService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Jugadores')
    this.getChars()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

  async openModal(template: TemplateRef<any>, data: IChar) {
    this.selectedChar = data;
    this.calculateLockUpd()
    this.modalRef = this.modalService.show(template);
  }

  async getChars() {
    try {
      const response = await this.charService.getChars(this.filter)
      this.chars = response.data.chars
      this.bigTotalItems = response.data.totalRegister
      this.itemPerPage = Number(this.filter.limit)
      this.logger.log(this.idLog, 'getChars', { info: 'Success', response, bigTotalItems: this.bigTotalItems })
      this.changeDetectorRef.detectChanges()
    } catch (error) {
      this.logger.error(this.idLog, 'getChars', { info: 'Error', error })
    }
  }

  search() {
    this.getChars()
  }

  chageLimit() {
    this.getChars()
  }

  pageChanged(event: any) {
    this.filter.page = event.page
    this.getChars()
  }

  calculateLockUpd(){
    if(this.selectedChar.start_date_ban && this.selectedChar.end_date_ban){
      const startDataBan = moment(this.selectedChar.start_date_ban)
      const endDataBan = moment(this.selectedChar.end_date_ban)
      this.lockUpd.daysBan = endDataBan.diff(startDataBan, 'days')
    } else {
      this.lockUpd.daysBan = 0
    }
    if(this.selectedChar.start_date_bg_lock && this.selectedChar.end_date_bg_lock){
      const startDataBg = moment(this.selectedChar.start_date_bg_lock)
      const endDataBg = moment(this.selectedChar.end_date_bg_lock)
      this.lockUpd.daysBg = endDataBg.diff(startDataBg, 'days')
    } else {
      this.lockUpd.daysBg = 0
    }
    if(this.selectedChar.start_date_woe_lock && this.selectedChar.end_date_woe_lock){
      const startDataWoe = moment(this.selectedChar.start_date_woe_lock)
      const endDataWoe = moment(this.selectedChar.end_date_woe_lock)
      this.lockUpd.daysWoe = endDataWoe.diff(startDataWoe, 'days')
    } else {
      this.lockUpd.daysWoe = 0
    }
  }

  calculateDates() {
    return new Promise(async (resolve, reject) => {
      const { allDaysBan, allDaysBg, allDaysWoe, daysBan, daysBg, daysWoe } = this.lockUpd
      if (allDaysBan) {
        this.selectedChar.start_date_ban = null;
        this.selectedChar.end_date_ban = null;
      } else {
        this.selectedChar.start_date_ban = new Date()
        this.selectedChar.end_date_ban = new Date()
        this.selectedChar.end_date_ban.setDate(this.selectedChar.end_date_ban.getDate() + daysBan)
      }
      if (allDaysBg) {
        this.selectedChar.start_date_bg_lock = null;
        this.selectedChar.end_date_bg_lock = null;
      } else {
        this.selectedChar.start_date_bg_lock = new Date();
        this.selectedChar.end_date_bg_lock = new Date();
        this.selectedChar.end_date_bg_lock.setDate(this.selectedChar.end_date_bg_lock.getDate() + daysBg);
      }
      if (allDaysWoe) {
        this.selectedChar.start_date_woe_lock = null;
        this.selectedChar.end_date_woe_lock = null;
      } else {
        this.selectedChar.start_date_woe_lock = new Date();
        this.selectedChar.end_date_woe_lock = new Date();
        this.selectedChar.end_date_woe_lock.setDate(this.selectedChar.end_date_woe_lock.getDate() + daysWoe);
      }
      resolve(true)
    })
  }

   setRequestLockUseR(): IRequestLockUser {
    const { account_id, end_date_ban, end_date_bg_lock, end_date_woe_lock, is_ban, is_bg_lock, is_woe_lock, start_date_ban, start_date_bg_lock, start_date_woe_lock } = this.selectedChar
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!)
    const request: IRequestLockUser = {
      account_id,
      admin: currentUser.admin.email,
      end_date_ban: end_date_ban,
      end_date_bg_lock: end_date_bg_lock,
      end_date_woe_lock: end_date_woe_lock,
      is_ban: is_ban ? is_ban : false,
      is_bg_lock: is_bg_lock ? is_bg_lock : false,
      is_woe_lock: is_woe_lock ? is_woe_lock : false,
      start_date_ban: start_date_ban,
      start_date_bg_lock: start_date_bg_lock,
      start_date_woe_lock: start_date_woe_lock,
    }
    return request
  }

  async updateLock() {
    this.submitted = true
    if(!this.lockUpd.allDaysBan && this.lockUpd.daysBan <= 0 && this.selectedChar.is_ban){
      return
    }
    if(!this.lockUpd.allDaysBg && this.lockUpd.daysBg <= 0 && this.selectedChar.is_bg_lock){
      return
    }
    if(!this.lockUpd.allDaysWoe && this.lockUpd.daysWoe <= 0 && this.selectedChar.is_woe_lock){
      return
    }
    if (this.selectedChar) {
      await this.calculateDates()
      const request: IRequestLockUser = this.setRequestLockUseR()
      try {
        const response = await this.lockService.lockUser(request)
        this.logger.log(this.idLog, 'updateLock', { info: 'Success', response })
        this.alertService.toast('Usuario actualizado')
        this.modalRef?.hide()
      } catch (error: any) {
        const msg = error && error.error && error.error.message ? error.error.message : 'Problemas al actualizar jugador, por favor intente más tarde'
        this.alertService.alert(msg, 'error')
        this.logger.error(this.idLog, 'updateLock', { info: 'Error', error })
      }
    }
  }
}
