import { AuthenticationService } from '../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { ProfileModel } from '../models/profile.model';
import { config, Subscription } from 'rxjs';
import { FriendlistService } from '../services/friendlist.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  me:any;
  profileImgUrl:any;
  subscriptions = new Subscription();
  firendlist:any;
  constructor(private router: Router,private prof: ProfileService, private auth:AuthenticationService, private firends: FriendlistService){
    this.me = new ProfileModel();
  }
  ngOnInit() {

    // this.prof.getLocalAvatar().then((data) =>{
    //   // console.log("tab3: avatar",data);
    //   this.profileImgUrl = "data:image/jpg;base64,"+data;
    // });
    console.log("init tab3");
    this.subscriptions.add(this.prof.picSubject.subscribe(
      (val) => {
        // console.log("tab3 pic",val);
        this.profileImgUrl = val;
      }
    ));
    this.subscriptions.add(this.prof.meSubject.subscribe(
      (val) => {
        console.log("tab3 me",val);
        this.me = val;
      }
    ));
    // this.subscriptions.add(this.firends.fireFriends().subscribe(
    //   (val) =>{
    //     console.log
    //   }
    // ))
    console.log(this.firends.fireFriends());
  }

  ngOnDestroy(){
    console.log("destroy tab3");
    this.subscriptions.unsubscribe();
  }

  updatename(data){
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
