// https://devdactic.com/ionic-4-login-angular/ use as reference
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment'

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token',
      // 'Access-Control-Allow-Origin' : '*',
    })
  };
  apiUrl = ''; 

  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.apiUrl = environment.apiUrl;
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        console.log("checkToken: ",res);
        this.authenticationState.next(true);
      }
    });
  }

  login(data){
      return this.http.post(this.apiUrl+'/email_login', data).pipe(map(res => res)).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
            if(val[status] == 200){
              this.storage.set(TOKEN_KEY,val["uid"]).then(() => {
                this.authenticationState.next(true);
              });
            }
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }

  signup(data){
    return this.http.post(this.apiUrl+'/sign-up', data).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
          if(val[status] == 200){
            this.storage.set(TOKEN_KEY,val["uid"]).then(() => {
              this.authenticationState.next(true);
            });
        }else{
          console.log("not success");
        }
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}
