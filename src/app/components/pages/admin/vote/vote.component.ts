import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IAlternative } from 'src/app/models/vote/alternative.interface';
import { IQueryGetQuestions } from 'src/app/models/vote/query-get-questions.interface';
import { IQuestion } from 'src/app/models/vote/question.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  idLog: string = 'VoteComponent'
  questions: IQuestion[] = []
  question: IQuestion = {
    endDate: new Date(),
    startDate: new Date(),
    question: '',
    idServer: 1,
    alternatives: []
  }
  limit: number[] = [10, 25, 50, 100, 0]
  filter: IQueryGetQuestions = {
    limit: 10,
    page: 1,
  }  
  modalRef?: BsModalRef;
  itemPerPage: number = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  submitted: boolean = false;
  btnLoad: boolean = false;
  servers: {
    value: number;
    text: string;
  }[] = [
    {
     value: 1,
     text: 'Server Ro Mid Rates' 
    }
  ]
  alternative: IAlternative = {
    alternative: '',
    value: ''
  }

  user: {
    email: string;
    role: number;
  } = {
    email: '',
    role: 0
  }

  constructor(
    private voteService: VoteService,
    private alertService: AlertService,
    private modalService: BsModalService,
    private logger: LoggerService,
    private menuService: MenuService,
    private fb: FormBuilder,
    ){}

    ngOnInit(): void {
      this.menuService.setTitlePage('Encuestas')
      this.getQuestions()
      this.user = JSON.parse(localStorage.getItem('currentUser')!).admin
  }

    chageLimit(){
      this.getQuestions()
    }

    async getQuestions(){
      try {
        const response = await this.voteService.getQuestions()
        this.questions = response
        this.logger.log(this.idLog, this.getQuestions.name, {info: 'Success', response})
      } catch (error) {
        this.logger.error(this.idLog, this.getQuestions.name, {info: 'Error', error})
      }
    }

    clearForm(){
      this.submitted = false;
      this.question = {
        endDate: new Date(),
        startDate: new Date(),
        question: '',
        idServer: 1,
        alternatives: []
      }
    }

    async openModal(template: TemplateRef<any>, question?: IQuestion) {
      this.clearForm();
      this.modalRef = this.modalService.show(template);
      if(question){
        this.question =  Object.assign({},question);
        this.question.idServer = question.idServer && question.idServer.idServer ? Object.assign({},question.idServer.idServer) : Object.assign({},question.idServer)
      }
    }

    async deleteQuestio(question: IQuestion, index: number){
      try {
        const confirm = await this.alertService.confirm('Desea eliminar esta encuesta?', 'question', 'Si', 'No')
        if(confirm.value){
          const response = this.voteService.deleteQuestion(question.idQuestion!)
          this.alertService.toast('Encuesta eliminada')
          this.questions.splice(index, 1)
          this.logger.log(this.idLog, this.deleteQuestio.name, {info:'Success', response})
        }
      } catch (error) {
        this.logger.error(this.idLog, this.deleteQuestio.name, {info:'Error', error})
      }
    }

    async saveQuestion(){
      try {
        if(this.question.idQuestion){
          const response = await this.voteService.updateQuestion(this.question)
          this.logger.log(this.idLog, this.saveQuestion.name, {info: 'Update Success', response})
        } else {
          const response = await this.voteService.saveQuestion(this.question)
          this.logger.log(this.idLog, this.saveQuestion.name, {info: 'Save Success', response})
        }
        this.getQuestions()
        this.modalRef?.hide()
        this.alertService.toast('Encuesta guardada con éxito')
      } catch (error) {
        this.logger.error(this.idLog, this.saveQuestion.name, {info: 'Error', error})
      }
    }

    addAlternative(){
      this.question.alternatives.push({
        alternative: this.alternative.alternative,
        value: this.alternative.value,
      })

      this.alternative = {
        alternative: '',
        value: ''
      }
    }
}
