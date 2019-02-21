import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service'
import { environment } from '../../environments/environment'
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
  TOKEN_KEY = '';
  constructor(private auth: AuthenticationService, public alertController: AlertController, private storage: Storage) {
    // for (var i = 2000; i < 2100; i++) this.years.push(i);
    this.TOKEN_KEY = environment.TOKEN_KEY;
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
      this.auth.signup(data).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
            if(val["status"] == 200){
              this.storage.set(this.TOKEN_KEY,val["auth"]).then(() => {
                console.log("the auth token in storage"+this.storage.get(this.TOKEN_KEY));
                this.auth.authenticationState.next(true);
              });
          }else{
            this.presentAlert("Please check your input");
            console.log("not success");
          }
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
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
