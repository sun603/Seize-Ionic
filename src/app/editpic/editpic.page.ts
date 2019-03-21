import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-editpic',
  templateUrl: './editpic.page.html',
  styleUrls: ['./editpic.page.scss'],
})
export class EditpicPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router,public prof: ProfileService, public auth:AuthenticationService, private _location: Location) { }
  profileImgUrl:any;
  ngOnInit() {
    this.prof.getLocalAvatar().then((data) =>{
      // console.log("tab3: avatar",data);
      this.profileImgUrl = "data:image/jpg;base64,"+data;
    });
  }
}
