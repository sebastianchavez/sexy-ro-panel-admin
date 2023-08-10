import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenu } from '../../../../models/admin/menu.interface';

@Component({
  selector: 'app-responsive-sidemenu',
  templateUrl: './responsive-sidemenu.component.html',
  styleUrls: ['./responsive-sidemenu.component.scss']
})
export class ResponsiveSidemenuComponent implements OnInit {

  @Output() changeState: EventEmitter<any> = new EventEmitter();
  @Input() selectedMenu: string = '';
  @Input() state: boolean = false;
  @Input() menu: IMenu[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeStateSidemenu() {
    this.changeState.emit(!this.state)
  }
}
