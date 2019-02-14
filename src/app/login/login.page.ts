import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username:any;
  private password:any;

  constructor(private router: Router) {}

  ngOnInit() {
  }
  
  skip = function() {
    console.log("skip");
    this.router.navigate(['/tabs/tab2']);
  }

  signIn(){
    console.log(this.username+this.password);
    if(this.username == ""){
      alert("Plase enter your username");
    }else if(this.password == ""){
      alert("Plase enter your password");
    }
  }

  signUp(){
    console.log("singup");
    this.router.navigate(['/signup']);
  }
}
