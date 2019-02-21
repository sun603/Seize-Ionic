import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email:any;
  private password:any;
  TOKEN_KEY = '';
  constructor(private router: Router, private auth: AuthenticationService, public alertController: AlertController, private storage: Storage) {
    this.TOKEN_KEY = environment.TOKEN_KEY;
  }

  ngOnInit() {
  }
  
  skip = function() {
    console.log("skip");
    console.log(this.auth.backdoor());
    this.router.navigate(['/tabs/tab2']);
  }

  signIn(){
    let data ={
      email: this.email,
      password: this.password,
    };

    console.log(this.email+this.password);
    if(this.email == ""){
      this.presentAlert("Plase enter your email");
    }else if(this.password == ""){
      this.presentAlert("Plase enter your password");
    }else{
      this.auth.login(data).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
            if(val["status"]== 200){
              this.storage.set(this.TOKEN_KEY,val["auth"]).then(() => {
                this.auth.authenticationState.next(true);
              });
            }else{
              this.faillogin();
              console.log("no pass for login");
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

  signUp(){
    console.log("singup");
    this.router.navigate(['/signup']);
  }

  forget(){
    console.log("singup");
    this.router.navigate(['/forgetpassword']);
  }
  faillogin(){
    this.password = "";
    this.presentAlert("Your email/password is incorrect");
    console.log("faillogin");
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Login',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}