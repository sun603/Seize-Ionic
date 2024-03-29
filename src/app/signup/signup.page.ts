import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service'
import { environment } from '../../environments/environment'

import { MajorModel } from '../models/major.model';
@Component({
  selector: 'app-signup',
templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private name:any;
  private email:any;
  private password:any;
  private university:any;
  private class:any;
  private major:any;
  majors;
  majorModel;

  constructor(private auth: AuthenticationService, public alertController: AlertController, private storage: Storage, private router: Router) {
    // for (var i = 2000; i < 2100; i++) this.years.push(i);

    this.majorModel = new MajorModel();
   }

  ngOnInit() {
    this.majors = this.majorModel.getmajors();
  }
  
  signUp(){
    let data ={
      name: this.name,
      email: this.email,
      password: this.password,
      university: this.university,
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
    }else if(data.university == "" || data.university == undefined){
      this.presentAlert("Plase enter your university");
    }else if(data.class == "" || data.class == undefined){
      this.presentAlert("Plase enter your class ");
    }if(data.major == "" || data.major == undefined){
      this.presentAlert("Plase enter major");
    }else{
      this.auth.signup(data).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
            if(val["status"] == 200){
              // this.storage.set(this.TOKEN_KEY,val["auth"]).then(() => {
              //   console.log("the auth token in storage"+this.storage.get(this.TOKEN_KEY));
              //   this.auth.authenticationState.next(true);
              // });
              this.presentAlert("Please login");
              this.router.navigate(['/login']);
          }else if(val["status"] == 201){
            this.presentAlert("invalid password");
            console.log("invalid password");
          }else if(val["status"] == 202){
            this.presentAlert("email exist, please login");
            console.log("invalid password");
          }else{
            this.presentAlert("Please check your input");
          }
          console.log("not success");
        },
        response => {
            this.presentAlert("connect err; check network");
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
