import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IRequestFile } from 'src/app/models/client/request-file.interface';
import { IRequestNewClient } from '../../../../models/client/request-new-client.interface';
import { IRequestUpdateClient } from 'src/app/models/client/request-update-client.interface';
import { IUpdate } from 'src/app/models/client/update.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ClientService } from 'src/app/services/client/client.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  idLog: string = 'ClientComponent'
  modalRef?: BsModalRef;
  files: {
    idFile?: number;
    name: string;
    url: string;
    version: number;
  }[] = [];
  newClientForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  btnLoad: boolean = false;
  filter: {
    page: number;
    limit: number;
  } = {
      page: 1,
      limit: 0
    }
  clients: any[] = []

  updates: IUpdate[] = []

  constructor(
    private modalService: BsModalService,
    private logger: LoggerService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private menuService: MenuService
    ) { }

  get f() {
    return this.newClientForm.controls;
  }

  async openModal(template: TemplateRef<any>) {
    const confirm = await this.alertService.confirm('Clonar ultima versión?', 'question', 'Si', 'No')
    this.clearForm()
    if (confirm.value) {
      const { version, description, clientFiles } = this.clients[0]
      this.files = clientFiles.map((x: any) => x.idFile)
      console.log('FILES:', this.files);
      this.newClientForm.controls['version'].setValue(version)
      this.newClientForm.controls['description'].setValue(description)
      this.newClientForm.controls['files'].setValue(this.files)
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.menuService.setTitlePage('Actualización de cliente')
    this.clearForm()
    this.filterClients()
  }

  async filterClients() {
    try {
      const response = await this.clientService.getClients(this.filter)
      this.clients = response.clients
      this.logger.log(this.idLog, 'filterClients', { info: 'Success', response })
    } catch (error) {
      this.logger.error(this.idLog, 'filterClients', { info: 'Error', error })
    }
  }


  clearForm() {
    this.submitted = false;
    this.files = []
    this.newClientForm = this.fb.group({
      version: ['', Validators.required],
      description: ['', Validators.required],
      files: [[], Validators.required]
    })
  }

  updateFile() {
    this.submitted = true
    const { version } = this.newClientForm.value
    if (version.trim() == '') {
      return
    }
    document.getElementById('file')?.click()
  }

  onSelectFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      const { version } = this.newClientForm?.value
      const reader = new FileReader();
      const name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async (e: any) => {
        this.logger.log(this.idLog, 'onSelectFile', { info: 'onload Ok', event: e })
        const file = e.target.result.split(',')[1].toString();
        try {
          const requestFile: IRequestFile = {
            name,
            file,
            version
          }
          this.logger.log(this.idLog, 'onSelectFile', { info: 'into update', requestFile })
          const response = await this.clientService.updateFile(requestFile)
          const versionfile = Number((<HTMLInputElement>document.getElementById('versionFile')).value)
          this.files.push({ name, url: response.url, version: versionfile })
          this.newClientForm.controls['files'].setValue(this.files)
          this.logger.log(this.idLog, 'onSelectFile', { info: 'Success', response, files: this.files })
        } catch (error) {
          this.logger.error(this.idLog, 'onSelectFile', { info: 'Error', error })
        }
      };
    }
  }

  async saveClient(values: any) {
    const { version, files, description } = values

    this.submitted = true
    if (!this.newClientForm.valid) {
      return
    }

    this.btnLoad = true
    try {

      const request: IRequestNewClient = {
        version,
        files,
        description,
        updates: this.updates
      }
      const response = await this.clientService.newVersion(request)
      this.modalRef?.hide()
      this.logger.log(this.idLog, 'saveClient', { info: 'Success', response, request })
    } catch (error) {
      this.logger.error(this.idLog, 'saveClient', { info: 'Error', error })
    }
    this.btnLoad = false
  }

  async deleteFile(index: number) {
    const confirm = await this.alertService.confirm('Desea eliminar este archivo?', 'question', 'Si', 'No')
    if (confirm.value) {
      this.files.splice(index, 1)
      this.newClientForm.controls['files'].setValue(this.files)
    }
  }

  async changeForceUpdate(c: any) {
    try {
      const { description, forceUpdate, idRoClient, updates } = c

      const request: IRequestUpdateClient = {
        description,
        forceUpdate,
        idRoClient,
      }

      const response = await this.clientService.changeForceUpdate(request)
      this.logger.log(this.idLog, 'changeForceUpdate', { info: 'Success', response })
    } catch (error: any) {
      const msg = error.error && error.error.messaga ? error.error.messaga : 'Problemas al actualizar, por favor intente más tarde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'changeForceUpdate', { info: 'Error', error })
    }
  }

  addUpdate() {
    try {
      let update = (<HTMLInputElement>document.getElementById('txtUpdate')).value;
      this.updates.push({ description: update });
      (<HTMLInputElement>document.getElementById('txtUpdate')).value = '';
      this.logger.log(this.idLog, 'addUpdate', { info: 'Success', updates: this.updates })
    } catch (error) {
      this.logger.error(this.idLog, 'addUpdate', { info: 'Error', error })
    }
  }

  changeUpdate(index: number) {
    let value = (<HTMLInputElement>document.getElementById(`txtUpdate_${index}`)).value
    this.updates[index].description = value
  }
}
