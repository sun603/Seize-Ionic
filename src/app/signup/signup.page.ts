import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private years:any = [];

  private email:any;
  private password:any;
  private univeristy:any;
  private year:any;
  private major:any;

  constructor(private auth: AuthenticationService, public alertController: AlertController) {
    for (var i = 2000; i < 2100; i++) this.years.push(i);
   }

  ngOnInit() {
  }
  
  signUp(){
    let data ={
      email: this.email,
      password: this.password,
      univeristy: this.univeristy,
      year: this.year,
      major: this.major
    };

    console.log(data);
    if(data.email == "" || data.email == undefined){
      this.presentAlert("Plase enter your email");
    }else if(data.password == "" || data.password == undefined){
      this.presentAlert("Plase enter your password");
    }else if(data.univeristy == "" || data.univeristy == undefined){
      this.presentAlert("Plase enter your univeristy");
    }else if(data.year == "" || data.year == undefined){
      this.presentAlert("Plase enter your class year");
    }if(data.major == "" || data.major == undefined){
      this.presentAlert("Plase enter major");
    }else{
      console.log(" signup ",this.auth.signup(data));
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'signup',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
