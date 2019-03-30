import { Component } from '@angular/core';
import { LibraryModel } from '../models/library.model'
import { AuthenticationService } from '../services/authentication.service';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  library:any;
  libs:any;
  location:string;
  seattype:string;
  sound:{
   upper:number,
   lower:number
  }
  constructor(public auth: AuthenticationService, public matchService: MatchService,private router: Router,public alertController: AlertController){
    this.library = new LibraryModel();
  }
  ngOnInit() { 
    this.libs = this.library.getlibs();
  }

  find(){
    console.log(this.location,this.seattype,this.sound);
    if(this.location == "" || this.location == undefined ){
      this.presentAlert("Please choose library");
    }else if(this.seattype == "" || this.seattype == undefined){
      this.presentAlert("Please choose seattype");
    }else if(this.sound.upper == 1){
      this.presentAlert("Please choose soundlevel");
    }else{
      this.auth.getauth()
      .then(res => {
        return {
          "auth_token": res,
          "library": this.location,
          "seat_type": this.seattype,
          "noise_level1": this.sound.lower,
          "noise_level2": this.sound.upper,
        };
      }).then( data => {
        console.log("find seat",data);
        this.matchService.find(data).then(data =>{
          console.log("find seat done",data);
          this.presentAlert("match with "+ data["name"]);
        }).catch( error => {
          console.log(error,error.name);
          this.presentAlert("Sorry, no one is sharing seat now try later");
        });
      }).catch((error) => {
        console.log(error);
      });
    }

    

  }

  clear(){
    this.location=null;
    this.seattype=null;
    this.sound=null;
  }
  
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Find',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
