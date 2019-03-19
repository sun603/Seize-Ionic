import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {


  private name:any;
  // private username:any;
  private gender:any;
  //private email:any;
  private university:any;
  // private uid:any;
  private major:any;
  private class:any;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  update(){
    let data ={
      name: this.name,
      gender: this.gender,
      //email: this.email,
      university: this.university,
      // uid: this.uid,
      major: this.major,
      class: this.class
    }

    console.log(data);
    if(this.name == "" || this.name == undefined ){
      this.presentAlert("Please enter your nam");
    }else if(this.gender == "" || this.gender == undefined){
      this.presentAlert("Please enter your gender");
    }else if(this.university == "" || this.university == undefined){
      this.presentAlert("Please enter your university");
    }else if(this.major == "" || this.major == undefined){
      this.presentAlert("Please enter your major");
    }else if(this.class == "" || this.class == undefined){
      this.presentAlert("Please enter your class");
    }

  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Share',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
