import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { INews } from 'src/app/models/news/news.interface';
import { IRequestSaveNews } from 'src/app/models/news/request-save-news.interfarce';
import { IRequestUpdateNews } from 'src/app/models/news/request-update-news.interdace';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  idLog: string = 'NewsComponent'
  selectedNews?: INews;
  news: INews = {
    description: '',
    endDate: '',
    image: '',
    inClient: false,
    inSlide: false,
    inWeb: false,
    link: '',
    startDate: '',
    title: ''
  };
  modalRef?: BsModalRef;
  startDate: string = '';
  endDate: string = '';
  newsList: INews[] = []
  newsIn: {
    text: string;
    value: string;
  }[] = [
    { text: 'En Web', value: 'inWeb' },
    { text: 'En Cliente', value: 'inClient' },
    { text: 'En Slide', value: 'inSlide' }
  ]
  filter = {
    title: '',
    in: '',
    startDate: '',
    endDate: '',
    limit: 10,
    page: 1
  }
  limit: number[] = [10, 25, 50, 100, 0]
  itemPerPage: number = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  submitted: boolean = false;
  btnLoad: boolean = false;
  noImage = 'assets/images/sinimagen.png'
  loadImage = 'assets/images/loading.gif'
  load: boolean = false
  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }

  constructor(
    private modalService: BsModalService,
    private newsService: NewsService,
    private logger: LoggerService,
    private alertService: AlertService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.setTitlePage('Noticias')
    this.getNews()
    this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

  search(){
    this.getNews()
  }

  async openModal(template: TemplateRef<any>, data?: INews) {
    this.clearForm();
    if(data){
      this.news = Object.assign({},{...data}); 
    }
    this.modalRef = this.modalService.show(template);
  }

  clearForm(){
    this.news = {
      title: '',
      description: '',
      image: '',
      link: '',
      startDate : '',
      endDate: '',
      inClient: false,
      inSlide: false,
      inWeb: false
    }
    this.submitted = false;
  }

  async deleteNews(news: INews){
    try {
      const confirm = await this.alertService.confirm('Desea eliminar noticia?', 'question', 'Si', 'No')
      if(confirm.value){
        const response = await this.newsService.deleteNews(news.idNews!)
        this.getNews()
        this.logger.log(this.idLog, this.deleteNews.name, {info: 'Success', response})
      }
    } catch (error) {
      this.logger.error(this.idLog, this.deleteNews.name, {info: 'Error', error})
    }
  }

  pageChanged(event: any) {
    this.filter.page = event.page
    this.getNews()
  }

  chageLimit(){
    this.getNews()
  }

  async getNews(){
      try {
        let query = '';
        let count = 0;
        const filter: any = this.filter;
        for await (let obj of  Object.keys(this.filter)) {
          if(filter[obj] && filter[obj] != ''){
            if(count == 0){
              query += `?${obj}=${filter[obj]}`
            } else {
              query += `&${obj}=${filter[obj]}`
            }
            count++
          }
        }
        const response = await this.newsService.getNews(query)
        this.bigTotalItems = response.totalRegister
        this.itemPerPage = this.filter.limit
        this.newsList = response.news
        this.logger.log(this.idLog, this.getNews.name, {info: 'Success', response})
      } catch (error) {
        this.logger.error(this.idLog, this.getNews.name, {info: 'Error', error})
      }
  }

  onSelectImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.load = true
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async (e: any) => {
        try {
          const fileName = Date.now() + '.' + event.target.files[0].name.split('.')[1]
          const response = await this.newsService.updateImage({
            image: e.target.result.split(',')[1],
            nameImage: fileName
          })
          this.logger.log(this.idLog, this.onSelectImage.name, {info: 'Success', response})
          this.news!.image =  response.url
          this.load = false
        } catch (error) {
          this.logger.error(this.idLog, this.onSelectImage.name, {info: 'Error', error})
          this.load = false
        }
      };
    }
  }

  async saveNews(){
    const { image, title, description, startDate, endDate, link, inClient, inSlide, inWeb, idNews } = this.news!
    try {
    if(idNews){
      const request: IRequestUpdateNews = {
        idNews,
        title,
        description,
        inClient,
        image,
        link,
        inSlide,
        inWeb,
      }
      const response = await this.newsService.updateNews(request)
      this.logger.log(this.idLog, this.saveNews.name, {info: 'Success', response})
      this.alertService.toast('Noticia actualizada')
    } else {
      const request: IRequestSaveNews = {
        title,
        description,
        inClient,
        image,
        link,
        inSlide,
        inWeb,
        startDate: startDate && startDate != '' ? new Date(startDate) : null,
        endDate: endDate && endDate != '' ? new Date(endDate) : null
      }
      const response = await this.newsService.saveNews(request)
      this.logger.log(this.idLog, this.saveNews.name, {info: 'Success', response})
      this.alertService.toast('Noticia agregada')
    }
      this.modalRef?.hide()
      this.getNews()
    } catch (error: any) {
      let msg: string  = 'Problemas al guardar noticia'
      if(error.error && error.error.message){
        if(typeof error.error.message == 'object'){
          error.error.message.forEach((x: string) => {
            msg = x
          })
        } else {
          msg = error.error.message
        }
      }
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.saveNews.name, {info: 'Error', error})
    }
  }
}
