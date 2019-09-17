import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Chatbot} from '../../classes/chatbot';
import {ChatbotsService} from '../../services/chatbots.service';
import {ConnaissanceService} from '../../services/connaissance.service';


declare var $: any;

@Component({
  selector: 'app-ajouteremp',
  templateUrl: './chatbotlearn.component.html',
  styleUrls: ['./chatbotlearn.component.scss']
})
export class ChatbotlearnComponent implements OnInit {

  cnToAdd : number = null ;
  cns = [] ;
  constructor(public dialogRef: MatDialogRef<ChatbotlearnComponent> ,
              @Inject(MAT_DIALOG_DATA) public data: Chatbot,
              private chatbotservice : ChatbotsService , private cnservice : ConnaissanceService) { }

  ngOnInit() {
    this.cnservice.getConnaissances().subscribe(
        (res) => {
          for (let cn of res){
            if(!(this.data.knowledgeBases.find(
                us => {
                  return us.id == cn.id
                }
            ))){
              this.cns.push(cn)
            }
          }
          console.log(this.cns)
        }
    )
  }


  supprimer(connaissance , bot){
    let cn = this.data.knowledgeBases.find(
        (res) => {
          return res.id == connaissance ;
        }
    );

    console.log(cn)

    this.cnservice.DeleteCnFromBot(connaissance,bot).subscribe(
        (res) => {
          this.cns.push(cn)
          this.data.knowledgeBases.splice(
              this.data.knowledgeBases.findIndex(
                  (res) => {
                    return res.id == connaissance ;
                  }
              ),1
          )
        },
    )
  }


  add(){
    let cn = this.cns.find(
        (res) => {
          return res.id == this.cnToAdd ;
        }
    );
    this.cnservice.AddCnToBot(this.cnToAdd, this.data.id).subscribe(
        (res) => {
          this.data.knowledgeBases.push(cn);
          this.cns = [] ;
          this.cnservice.getConnaissances().subscribe(
              (res) => {
                for (let cn of res){
                  if(!(this.data.knowledgeBases.find(
                      us => {
                        return us.id == cn.id
                      }
                  ))){
                    this.cns.push(cn)
                  }
                }
                console.log(this.cns)
              }
          )

        }
    )

  }


  showNotification(color,msg,icon){
    $.notify({
      icon: icon,
      message: msg

    },{
      type: color,
      timer: 4000,
      placement: {
        from: 'bottom',
        align:'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"><i class="material-chatbot">close</i></button>' +
          '<i class="material-chatbot" data-notify="icon">'+icon+'</i>' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
    });
  }
}
