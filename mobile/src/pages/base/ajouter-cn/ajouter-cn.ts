import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {ChatbotProvider} from "../../../providers/chatbot/chatbot";
import {Chatbot} from "../../../classes/chatbot";
import {Connaissance} from "../../../classes/connaissance";
import {BaseProvider} from "../../../providers/base/base";
import {Utilisateur} from "../../../classes/utilisateur";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the AjouterCnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-cn',
  templateUrl: 'ajouter-cn.html',
})
export class AjouterCnPage implements OnInit{

  bots : Chatbot[] = null ;
  cn = new Connaissance ;
  user : Utilisateur ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private loadingCtrl :LoadingController ,
              private viewCtrl : ViewController, private botprovider : ChatbotProvider ,private storage : Storage,
              private toastCtrl : ToastController , private cnprovider : BaseProvider) {
  }

  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: " Loading . . . . "
    });
    loading.present();

    this.storage.get('user').then(
      (resp) => {
        this.user = resp ;
      }) ;


    this.botprovider.getChatbots().subscribe(
      (res) =>{
        this.bots = res ;
        loading.dismiss()
      },
      (err) => {
        let toast = this.toastCtrl.create({message: 'On ne peut pas atteindre le serveur',
          duration: 3000,
          position: 'bottom',
          cssClass : "fail" }) ;
        toast.present() ;
        loading.dismiss()
      });
  }

  Add(form){
    const loading = this.loadingCtrl.create({
      content:" Loading . . . . "
    });
    loading.present() ;

    this.cn.question = form.value.question ;
    this.cn.reponse =form.value.reponse ;
    this.cn.isActive = form.value.active ;
    this.cn.admin = this.user.username ;
    this.cn.chatBots.push(form.value.chatbot) ;

    this.cnprovider.postConnaissance(this.cn).subscribe(
      (res) => {
        let toast = this.toastCtrl.create({message: 'Connaissance ajouté avec succès',
          duration: 3000,
          position: 'bottom',
          cssClass : "succes" }) ;
        toast.present() ;
        loading.dismiss() ;
        form.reset();
        this.viewCtrl.dismiss({AddedCn: res});
      },

      (err) => {
        let toast = this.toastCtrl.create({message: 'Erreur lors de l\'ajout',
          duration: 3000,
          position: 'bottom',
          cssClass : "fail" }) ;
        toast.present() ;
        loading.dismiss() ;
        this.cn = new Connaissance()  ;
      }
    ) ;
  }

  dismiss() {
    this.viewCtrl.dismiss({AddedCn: this.cn});
  }

}
