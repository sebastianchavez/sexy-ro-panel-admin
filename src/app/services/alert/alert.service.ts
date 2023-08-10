import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false
  });

  constructor() { }


  toast(title: string, icon: SweetAlertIcon = 'success') {
    this.Toast.fire({
      icon,
      title
    })
  }

  confirm(title: string, icon: SweetAlertIcon = 'question', confirmButtonText: string = 'Ok', cancelButtonText: string = 'Cancelar', showCancelButton: boolean = true): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      confirmButtonText,
      showCancelButton,
      cancelButtonText,
      icon,
      title,
    })
  }

  alert(title: string, icon: SweetAlertIcon = 'warning') {
    Swal.fire(title, '', icon)
  }
}
