import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  
  skip = function() {
    console.log("skip");
    this.router.navigate(['/tabs/tab2']);
  }

  signIn(){
    console.log("signin");
  }

  signUp(){
    console.log("singup");
  }
}
