import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../../../../models/admin/menu.interface';

@Component({
  selector: 'app-normal-sidemenu',
  templateUrl: './normal-sidemenu.component.html',
  styleUrls: ['./normal-sidemenu.component.scss']
})
export class NormalSidemenuComponent implements OnInit {

  @Input() selectedMenu: string = '';
  @Input() state: boolean = true;
  @Input() menu: IMenu[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
