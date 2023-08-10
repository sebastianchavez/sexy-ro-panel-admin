import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../../models/admin/menu.interface';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  selectedMenu: string = '';
  @Input() state: boolean = false;
  @Input() menu: IMenu[] = []
  
  allMenu: IMenu[] = [
    {
      text: 'Jugadores',
      route: '/user',
      icon: 'fa fa-user'
    },
    {
      text: 'Noticias',
      icon: 'fa fa-newspaper-o',
      route: '/news'
    },
    {
      text: 'Eventos',
      icon: 'fa fa-calendar',
      route: '/events'
    },
    {
      text: 'Encuestas',
      icon: 'fa fa-thumbs-up',
      route: '/vote'
    },
    {
      text: 'Cliente',
      hasSubmenu:  true,
      icon: 'fa fa-unlock',
      submenu: [
        {
          text: 'Actualización Cliente',
          route: '/client'
        },
        {
          text: 'Bloqueo Procesos',
          route:'/process-lock'
        },
        {
          text: 'Dispositivos',
          route: '/devices',
        },
      ],
    },
    {
      text: 'Premios',
      hasSubmenu: true,
      icon: 'fa fa-trophy',
      submenu: [
        {
          text: 'Por conexión',
          route: '/prizes'
        },
        {
          text: 'Ranking Pvp',
          route: '/prizes-pvp'
        }
      ]
    }
  ];
  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuService.getStateSidemenu().subscribe((res: boolean) => {
      this.state = res
    })
    this.getUrl()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
    this.setMenu()
  }

  setMenu(){
     this.allMenu.forEach((x: IMenu) => {
      if(this.user.role == 2){
        if(x.text != 'Cliente'){
          this.menu.push(x)
        }
      } else {
        this.menu.push(x)
      }
     })
  }

  changeStateSidemenu(ev: boolean) {
    this.menuService.changeStateSidemenu(ev)
  }

  getUrl(){
    this.router.events.subscribe((res:any) => {
      if(res.urlAfterRedirects && res.urlAfterRedirects != '' && !res.state){
        this.selectedMenu = res.urlAfterRedirects
      }
    })
  }

}
