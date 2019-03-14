import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
        this.me.gender = data.gender;
        this.me.major = data.major;
        this.me.university = data.university;
        this.me.year = data.year;
      }else{
        // console.log("tab3 data about name do not exist???");
        this.prof.getLocalProfile().then(data => {
          this.me.name = data.name;
          this.me.gender = data.gender;
          this.me.major = data.major;
          this.me.university = data.university;
          this.me.year = data.year;
        });
      }
    });
    this.prof.getLocalAvatar().then((data) =>{
      // console.log("tab3: avatar",data);
      this.profileImgUrl = "data:image/jpg;base64,"+data;
    });
  }

  editprofile(){
    console.log("editprofile");
    this.router.navigate(['/editprofile']);
  }
}
