import { AuthenticationService } from '../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private router: Router,private auth: AuthenticationService){}
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
