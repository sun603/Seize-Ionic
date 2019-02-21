import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private name:any;
  private email:any;
  private password:any;
  private univeristy:any;
  private class:any;
  private major:any;

  constructor(private auth: AuthenticationService, public alertController: AlertController) {
    // for (var i = 2000; i < 2100; i++) this.years.push(i);
   }

  ngOnInit() {
  }
  
  signUp(){
    let data ={
      name: this.name,
      email: this.email,
      password: this.password,
      univeristy: this.univeristy,
      class: this.class,
      major: this.major
    };

    console.log(data);

    if(data.email == "" || data.email == undefined){
      this.presentAlert("Plase enter your email");
    }else if(data.name == "" || data.name == undefined){
      this.presentAlert("Plase enter your name");
    }else if(data.password == "" || data.password == undefined){
      this.presentAlert("Plase enter your password");
    }else if(data.univeristy == "" || data.univeristy == undefined){
      this.presentAlert("Plase enter your univeristy");
    }else if(data.class == "" || data.class == undefined){
      this.presentAlert("Plase enter your class ");
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
