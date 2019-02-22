// https://devdactic.com/ionic-4-login-angular/ use as reference
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token',
      // 'Access-Control-Allow-Origin' : '*',
    })
  };
  apiUrl = ''; 
  TOKEN_KEY = '';
  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.apiUrl = environment.apiUrl;
    this.TOKEN_KEY = environment.TOKEN_KEY;
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  
  checkToken() {
    this.storage.get(this.TOKEN_KEY).then(res => {
      if(res){
        console.log("checkToken: ",res);
        this.authenticationState.next(true);
      }
    });
  }

  login(data){
    return this.http.post(this.apiUrl+'/email_login', data).pipe(map(res => res));
  }

  signup(data){
    return this.http.post(this.apiUrl+'/signup', data).pipe(map(res => res));
  }

  logout() {
    return this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  forget(data,api) {
    return this.http.post(this.apiUrl+api, data).pipe(map(res => res));
  }
  
  isAuthenticated() {
    return this.authenticationState.value;
  }
  
  // this is for dev only
  backdoor(){
    this.storage.set(this.TOKEN_KEY,1).then(() => {
      this.authenticationState.next(true);
    });
  }
}


class newProfile{
  name:any;
  email:any;
  password:any;
  university:any;
  class:any;
  major:any;
}