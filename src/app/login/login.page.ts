import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from '../services/authentication.service'
import { ProfileService } from '../services/profile.service';
import { environment } from '../../environments/environment'
import { localstoragesettings } from '../settings/localstorage.setting';
import { FriendlistService } from '../services/friendlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email:any;
  private password:any;

  constructor(private router: Router, private auth: AuthenticationService, public alertController: AlertController, private storage: Storage, public profile: ProfileService, private friendlistService:FriendlistService) {
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
              this.storage.set(localstoragesettings.TOKEN_KEY,val["auth"]).then(() => {
                let data = {
                  "auth_token": val["auth"],
                };
                // this.profile.getwebProfile(data);
                this.profile.updateView();
                this.friendlistService.getWebFriendListIndex();
                this.auth.authenticationState.next(true);
              });
            }else if (val["status"]== 404){
              this.presentAlert("server in maintain, try again later");
            }else{
              this.faillogin();
              console.log("no pass for login");
            }
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
