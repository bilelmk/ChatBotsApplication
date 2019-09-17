import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Chatbot} from '../../classes/chatbot';
import {ChatbotsService} from '../../services/chatbots.service';
import {Groupe} from '../../classes/groupe';


declare var $: any;

@Component({
  selector: 'app-ajouteremp',
  templateUrl: './cnlist.component.html',
  styleUrls: ['./cnlist.component.scss']
})
export class CnlistComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CnlistComponent> , private chatbotservice : ChatbotsService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
