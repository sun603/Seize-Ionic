import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { map, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { apisettings } from '../settings/apisettings';
import { ProfileModel } from '../models/profile.model';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  authcode:any;
  constructor(public http: HttpClient, public storage: Storage, public auth: AuthenticationService) {}
  getLocalProfile(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.storage.get("me").then((res) => {
        if(res == null || res == undefined){
          this.storage.get(environment.TOKEN_KEY).then(
            res => {
              let data = {
                "auth_token": res,
              };
              this.getwebProfile(data, res =>{
                resolve(res);
              })
            },
            error =>{
              reject(error);
            }
          );
        }else{
          resolve(res);
        }
      },
      error => {
        reject(error);
      });
    });

  }
  getwebProfile(data,res?){
    this.getProfile(data).subscribe(
      (val) =>{
        // console.log("get http profile success",val);
        if(val["status"]== 200){
          this.storage.set("me",val);
          if(res){
            res(val);
          }
        }else if(val["status"]== 201){
          this.auth.logout();
        }else{
          console.log("not sccuess in get http profile, but server on"+val["status"]);
        }
      },
      err => {
        console.log("a connection err in get http profile");
      }
    );
  }
  getProfile(data){
      return this.http.post(environment.apiUrl+apisettings.getprofile, data).pipe(map(res => res));
  }
  getLocalAvatar(){
    return new Promise((resolve,reject) => {
      this.storage.get("myAvatar").then((res) => {
        if(res == null || res == undefined){
          this.storage.get(environment.TOKEN_KEY).then(
            res => {
              let data = {
                "auth_token": res,
              };
              this.getwebAvatar(data, res =>{
                console.log("from web pic",res);
                resolve(res);
              })
            },
            error =>{
              reject(error);
            }
          );
        }else{
          // console.log("from local pic",res);
          resolve(res);
        }
      },
      error => {
        reject(error);
      });
    });
  }
  getwebAvatar(data,res?){
    this.getAvatar(data).subscribe(
      (val) =>{
        console.log("get http myAvatar success",val);
        if(val["status"]== 200){
          if(val["pic"]){
            this.storage.set("myAvatar",val["pic"]);
          }else{
            console.log("json pic err",val);
          }
          if(res){
            res(val["pic"]);
          }
        }else if(val["status"] == 201){
          console.log("not sccuess in get http avatar, 200 logout", val);
          this.auth.logout();
        }else{
          console.log("not sccuess in get http avatar, but server on", val);
        }
      },
      err => {
        console.log("a connection err in get http avatar", err);
      }
    );
  }
  getAvatar(data){
    return this.http.post(environment.apiUrl+apisettings.getavatar, data).pipe(map(res => res));
  }
  updateprofile(data): Promise<any>{
    return new Promise((resolve,reject) => {
      this.auth.getauth().then(res =>{
        data["auth_token"]=res;
        this.httpupdateprofile(data).subscribe(
          (val) =>{
            resolve(val);
            let pdata = {
              "auth_token": res,
            };
            this.getwebProfile(pdata);
          },
          (err) => {
            reject(err);
          }
        );
      },err =>{
        reject(err);
      });
    });
  }
  httpupdateprofile(data){
    return this.http.post(environment.apiUrl+apisettings.updateprofile, data).pipe(map(res => res));
  }
}
