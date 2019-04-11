import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  me:any;
  profileImgUrl:any;
  subscriptions = new Subscription();
  
  constructor(private router: Router,private prof: ProfileService, private auth:AuthenticationService){
    this.me = new ProfileModel();
  }
  ngOnInit(){
    console.log("init profile");
    this.subscriptions.add(this.prof.picSubject.subscribe(
      (val) => {
        this.profileImgUrl = val;
      }
    ));
    this.subscriptions.add(this.prof.meSubject.subscribe(
      (val) => {
        this.me = val;
      }
    ));
  
    // this.prof.getLocalProfile().then(data => {
    //   console.log("tab3: data",data);
    //   if(data){
    //     this.me.name = data.name;
    //     this.me.gender = data.gender;
    //     this.me.major = data.major;
    //     this.me.university = data.university;
    //     this.me.class = data.class;
    //   }else{
    //     // console.log("tab3 data about name do not exist???");
    //     this.prof.getLocalProfile().then(data => {
    //       this.me.name = data.name;
    //       this.me.gender = data.gender;
    //       this.me.major = data.major;
    //       this.me.university = data.university;
    //       this.me.class = data.class;
    //     });
    //   }
    // });
    // this.prof.getLocalAvatar().then((data) =>{
    //   // console.log("tab3: avatar",data);
    //   this.profileImgUrl = "data:image/jpg;base64,"+data;
    // });
  }

  ngOnDestroy(){
    console.log("destroy profile");
    this.subscriptions.unsubscribe();
  }
  editprofile(){
    console.log("editprofile");
    this.router.navigate(['/editprofile']);
  }
  editpic(){
    this.router.navigate(['/editpic']);
  }

}
