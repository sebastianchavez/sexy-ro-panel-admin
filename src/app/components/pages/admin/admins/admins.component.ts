import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IAdmin, IRequestRegisterAdmin } from 'src/app/models/admin/admin.interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  idLog: string = 'AdminsComponent'
  modalRef?: BsModalRef;
  admins: IAdmin[] = []
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  btnLoad: Boolean = false;

  constructor(
    private modalService: BsModalService,
    private alertService: AlertService,
    private logger: LoggerService,
    private menuService: MenuService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ){
    this.getAdmins()
  }

  get f() { return this.registerForm.controls; }
  
  clearForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async openModal(template: TemplateRef<any>) {
    this.clearForm()
    this.modalRef = this.modalService.show(template);
  }

  async register(values: any){
    const { email, password } = values
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      const request: IRequestRegisterAdmin = {
        email,
        password 
      }
      const response = await this.adminService.register(request)
      this.modalRef?.hide()
      this.getAdmins()
      this.alertService.toast('Admin registrado')
      this.logger.log(this.idLog, this.register.name, { info: 'Success', response })
    } catch (error: any) {
      const msg = error.error.message ? error.error.message : 'Problemas al registrar admin, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.register.name, { info: 'Error', error })
    } finally {
      this.btnLoad = false
    }
  }

  async getAdmins(){
    try {
      const response = await this.adminService.getAdmins()
      this.admins = response.admins
      this.logger.log(this.idLog, this.getAdmins.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getAdmins.name, {info: 'Error', error})
    }
  }
}
