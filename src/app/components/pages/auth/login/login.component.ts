import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../../../../services/logger/logger.service';
import { UserService } from '../../../../services/user/user.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { IRequestLoginAdmin } from 'src/app/models/admin/admin.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  idLog: string = 'LoginComponent'
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  btnLoad: Boolean = false;

  constructor(
    private router: Router,
    private logger: LoggerService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.clearForm()
  }

  async login(values: any) {
    const { email, password } = values
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {

      const request:IRequestLoginAdmin = {
        email,
        password
      }
      const response = await this.adminService.login(request)
      this.alertService.toast('Usuario autenticado')
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      this.router.navigateByUrl('/')
      this.logger.log(this.idLog, 'login', { info: 'Success', response })
    } catch (error: any) {
      const msg = error.message ? error.message : 'Problemas en autenticación, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'login', { info: 'Error', error })
    }
    this.btnLoad = false
  }

  clearForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
