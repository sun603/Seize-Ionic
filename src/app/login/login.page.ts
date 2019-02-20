import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email:any;
  private password:any;

  constructor(private router: Router, private auth: AuthenticationService, public alertController: AlertController) {}

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
      console.log(this.auth.login(data));
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
