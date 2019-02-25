import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { map, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment'
import { ProfileModel } from '../models/profile.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  authcode:any;
  constructor(private http: HttpClient, private storage: Storage) { 
    this.storage.get(environment.TOKEN_KEY).then(res => { this.authcode = res;});
  }

// getname(){
  //   return "Max";
  // }
  // getpic(){
  //   return this.http.get("../../assets/default-user-image.png",{ responseType: 'blob' });
  //   // return this.http.get("http://deafhhcenter.org/wp-content/uploads/2017/12/profile-default.jpg",{ responseType: 'blob'})
  // }
  // // this.storage.get('name').then((data)=>{this.var=data;});
  getLocalProfile(): Promise<any>{
    let me:object;
    return this.storage.get("me")
    .then(data => {me = data; return me;})
    .then( (me) => {
      console.log("get local profile",me);
      if(me){
        return me;
      }else{
        this.getProfile().subscribe(
          (val) =>{
            console.log("get http profile success",val);
            if(val["status"]== 200){
              this.storage.set("me",val);
              me = val;
              return me;
            }else{
              console.log("not sccuess in get http profile, but server on");
            }
          },
          err => {
            console.log("a connection err in get http profile");
          }
        )
      }
    });
    
  }
  getProfile(){
    let data ={
      auth_token: this.authcode,
    }
    return this.http.post(environment.apiUrl+"/profile", data).pipe(map(res => res));
  }
}

// class Profile{
//   status:any;
//   name:any;
//   university:any;
//   class:any;
//   major:any;
// }
