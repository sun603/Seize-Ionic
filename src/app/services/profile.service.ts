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
  constructor(private http: HttpClient, private storage: Storage) {}
  getLocalProfile(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.storage.get("myAvatar").then((res) => {
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
        }else{
          console.log("not sccuess in get http profile, but server on");
        }
      },
      err => {
        console.log("a connection err in get http profile");
      }
    );
  }
  getProfile(data){
      return this.http.post(environment.apiUrl+"/getprofile", data).pipe(map(res => res));
  }
  getLocalAvatar(){
    return new Promise((resolve,reject) => {
      this.storage.get("me").then((res) => {
        if(res == null || res == undefined){
          this.storage.get(environment.TOKEN_KEY).then(
            res => {
              let data = {
                "auth_token": res,
              };
              this.getwebAvatar(data, res =>{
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
            res(val);
          }
        }else{
          console.log("not sccuess in get http avatar, but server on");
        }
      },
      err => {
        console.log("a connection err in get http avatar");
      }
    );
  }
  getAvatar(data){
    return this.http.post(environment.apiUrl+"/get_pic", data).pipe(map(res => res));
  }
}
