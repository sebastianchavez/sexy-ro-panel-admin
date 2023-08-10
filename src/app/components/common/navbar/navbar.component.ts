import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = 'Panel Admin';
  @Input() stateSidemenu: boolean = false;
  @Output() clickStateSidemenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private menuService: MenuService  
  ) { }

  ngOnInit(): void {
    this.menuService.getTitlePage()
      .subscribe(res => {
        this.title = res
      })
  }

  changeStateSidemenu() {
    this.clickStateSidemenu.emit(!this.stateSidemenu)
  }

}
