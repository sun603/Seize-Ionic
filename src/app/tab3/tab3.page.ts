import { AuthenticationService } from '../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  me:any;
  constructor(private router: Router,private prof: ProfileService, private auth:AuthenticationService){
    this.me = new ProfileModel();
  }
  ngOnInit() {
    this.prof.getLocalProfile().then(data => {
      console.log("tab3: data",data);
      this.me.name = data.name;});
  }
  logOut(){
    this.auth.logout();
  }

  editprofile(){
    console.log("editprofile");
    this.router.navigate(['/editprofile']);
  }

  profile(){
    console.log("profile");
    this.router.navigate(['/profile']);
  }
}
