import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service'
import { environment } from '../../environments/environment'
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  message:string;
  label:string;
  input:any;
  steps:number;
  TOKEN_KEY;
  email:string;
  constructor(private auth: AuthenticationService, public alertController: AlertController, private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.message = "Enter the email address associated with your Seize account.";
    this.label = "Email";
    this.steps = 0;
    this.input = "";
    this.TOKEN_KEY = environment.TOKEN_KEY;
  }

  sumbit(){
    if(this.steps == 0){
      this.sendemail();
    }else if(this.steps == 1){
      this.sendcode();
    }
  }
  sendemail(){
    console.log("sendmail");
    let data = {
      email: this.input,
    }
    this.email = this.input;
    if(this.input == "" || this.input == undefined){
      this.presentAlert("Plase enter your email");
    }else{
      this.auth.forget(data,"/forget").subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
            if(val["status"]== 200){
              this.input = "";
              this.nextstep();
            // }else if (val["status"]== 404){
            //   this.presentAlert("server in maintain, try again later");
            }else{
              this.presentAlert("email not exist, try sign up frist");
            }
        },
        response => {
            console.log("POST call in error", response);
            this.presentAlert("connect err; check network");
        },
        () => {
        });
    }
  }
  sendcode(){
    let data = {
      email: this.email,
      code: this.input,
    }
    if(this.email == "" || this.email == undefined){
      console.log("DEBUG: error email empty in forgetpassword");
    }
    if(this.input == "" || this.input == undefined){
      this.presentAlert("Plase enter your email");
    }else{
      this.auth.forget(data,"/forgetcode").subscribe(
        (val) => {
            // console.log("POST call successful value returned in body", val);
            if(val["status"]== 200){
              this.input = "";
              this.nextstep();
            // }else if (val["status"]== 404){
            //   this.presentAlert("server in maintain, try again later");
            }else{
              this.presentAlert("incorrect verifcation code");
            }
        },
        response => {
            this.presentAlert("connect err; check network");
        },
        () => {
        });
    }
  }
  sendnewpass(){
    let data = {
      email: this.email,
      password: this.input,
    }
    if(this.email == "" || this.email == undefined){
      console.log("DEBUG: error email empty in forgetpassword");
    }
    if(this.input == "" || this.input == undefined){
      this.presentAlert("Plase enter your password");
    }else{
      this.auth.forget(data,"/forgetpass").subscribe(
        (val) => {
            // console.log("POST call successful value returned in body", val);
            if(val["status"]== 200){
              this.presentAlert("Please login");
              this.router.navigate(['/login']);
            // }else if (val["status"]== 404){
            //   this.presentAlert("server in maintain, try again later");
            }else{
              this.presentAlert("use a valid password");
            }
        },
        response => {
            this.presentAlert("connect err; check network");
        },
        () => {
        });
    }
  }
  nextstep(){
    this.steps++;
    if(this.steps == 1){
      this.message = "Check email for verifcation code";
      this.label = "Verficaiation Code";
    }else if(this.steps == 2){
      this.message = "Enter new password. \nUse at least one upper-case, one lower-case letter and one number with length between 6 to 30";
      this.label = "New Password";
    }
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Forget Password',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
