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
  sound:number;
  constructor(public auth: AuthenticationService, public matchService: MatchService,private router: Router,public alertController: AlertController){
    this.library = new LibraryModel();
  }
  ngOnInit() { 
    this.libs = this.library.getlibs();
  }

  find(){
    this.auth.getauth().then(res => {
      let data = {
        "auth_token": res,
        "library": location,
        "seat_type": this.seattype,
        "noise_level": this.sound,
      };




      this.matchService.find(data).then(data =>{
        this.router.navigate(['/waiting']);
      });
      
    })

  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'find',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
