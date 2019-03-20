import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  me:any;
  profileImgUrl:any;
  constructor(public alertController: AlertController,public router: Router,public prof: ProfileService, public auth:AuthenticationService, private _location: Location) { 
    this.me = new ProfileModel();
  }

  ngOnInit() {
    this.prof.getLocalProfile().then(data => {
      console.log("tab3: data",data);
      if(data){
        this.me.name = data.name;
        this.me.gender = data.gender;
        this.me.major = data.major;
        this.me.university = data.university;
        this.me.class = data.class;
      }else{
        // console.log("tab3 data about name do not exist???");
        this.prof.getLocalProfile().then(data => {
          this.me.name = data.name;
          this.me.gender = data.gender;
          this.me.major = data.major;
          this.me.university = data.university;
          this.me.class = data.class;
        });
      }
    });
  }
  // ngAfterContentInit(){}
  update(){
    console.log("update",this.me);
    if(this.me.name == "" || this.me.name == undefined ){
      this.presentAlert("Please enter your name");
    }else if(this.me.gender == "" || this.me.gender == undefined){
      this.presentAlert("Please enter your gender");
    }else if(this.me.university == "" || this.me.university == undefined){
      this.presentAlert("Please enter your university");
    }else if(this.me.major == "" || this.me.major == undefined){
      this.presentAlert("Please enter your major");
    }else if(this.me.class == "" || this.me.class == undefined){
      this.presentAlert("Please enter your class");
    }else{
      let data ={
        name: this.me.name,
        gender: this.me.gender,
        university: this.me.university,
        major: this.me.major,
        class: this.me.class
      }
      this.prof.updateprofile(data).then(
        res =>{
          console.log("update profile",res);
          if(res["status"] == 200){
            this._location.back();
          }
        },
        err =>{
          console.log("update profile fail",err);
        }
      );
    }
    

  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'edit profile',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
