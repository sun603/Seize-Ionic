import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email:any;
  private password:any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
  }
  
  skip = function() {
    console.log("skip");
    this.router.navigate(['/tabs/tab2']);
  }

  signIn(){
    let data ={
      email: this.email,
      password: this.password,
    }

    console.log(this.email+this.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin' : '*',
      })
    };
    if(this.email == ""){
      alert("Plase enter your username");
    }else if(this.password == ""){
      alert("Plase enter your password");
    }else{
      this.http.post('http://ec2-3-17-151-69.us-east-2.compute.amazonaws.com:3000/email_login', data).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });

    }
  }

  signUp(){
    console.log("singup");
    this.router.navigate(['/signup']);
  }
}
