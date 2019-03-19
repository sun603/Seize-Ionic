import { AuthenticationService } from '../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';
import { config } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  me:any;
  profileImgUrl:any;
  constructor(private router: Router,private prof: ProfileService, private auth:AuthenticationService){
    this.me = new ProfileModel();
  }
  ngOnInit() {
    this.prof.getLocalProfile().then(data => {
      console.log("tab3: data",data);
      if(data){
        this.me.name = data.name;
      }else{
        console.log("tab3 data about name do not exist???");
        this.prof.getLocalProfile().then(data => {
          this.me.name = data.name;
        });
      }
    });
    this.prof.getLocalAvatar().then((data) =>{
      // console.log("tab3: avatar",data);
      this.profileImgUrl = "data:image/jpg;base64,"+data;
    });
  }

  update(data){
    this.me.name = data.name;
  }
  logOut(){
    this.auth.logout();
  }

  editprofile(){
    this.router.navigate(['/editprofile']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }
}
