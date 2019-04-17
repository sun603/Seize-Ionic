// https://devdactic.com/ionic-4-login-angular/ use as reference
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


import { environment } from '../../environments/environment'
import { apisettings } from '../settings/api.settings'
import { localstoragesettings } from '../settings/localstorage.setting';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(localstoragesettings.TOKEN_KEY).then(res => {
      if(res){
        console.log("checkToken: ",res);
        this.authenticationState.next(true);
      }
    },
    (reason) => {
      console.log("checkToken: no checkToken",reason);
    });
  }

  login(data){
    return this.http.post(environment.apiUrl+apisettings.login, data).pipe(map(res => res));
  }

  signup(data){
    return this.http.post(environment.apiUrl+apisettings.signup, data).pipe(map(res => res));
  }

  logout() {
    // return this.storage.remove(localstoragesettings.TOKEN_KEY).then(() => {
    //   this.authenticationState.next(false);
    // });
    return this.storage.clear().then(() => {
      this.authenticationState.next(false);
    });
  }

  forget(data,api) {
    return this.http.post(environment.apiUrl+api, data).pipe(map(res => res));
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  // this is for dev only
  backdoor(){
    this.storage.set(localstoragesettings.TOKEN_KEY,1).then(() => {
      this.authenticationState.next(true);
    });
  }

  getauth(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.storage.get(localstoragesettings.TOKEN_KEY).then(
        res => {
          resolve(res);
        },
        error => {
          console.log("err in get auth", error);
          reject(error);
        }
      );
    });
  }
}


// class newProfile{
//   name:any;
//   email:any;
//   password:any;
//   university:any;
//   class:any;
//   major:any;
// }
