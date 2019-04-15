import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { apisettings } from '../settings/api.settings';
import { map, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
import { FriendModel } from '../models/friend.model';
import { from, Observable } from 'rxjs';
import { localstoragesettings } from '../settings/localstorage.setting';

@Injectable({
  providedIn: 'root'
})
export class FriendlistService {
  constructor(public http: HttpClient, public storage: Storage, public auth: AuthenticationService, private db: AngularFireDatabase) {
  }
  fireFriends(): any  {
    //https://stackoverflow.com/questions/41585514/how-to-return-observable-after-some-promise-get-resolved-in-ionic-2-angular-2
    return from(this.getIndex()).pipe(mergeMap( 
      (index) => {
        // let list:AngularFireList<FriendModel>;
        // let list: Observable<FriendModel[]>;
        // list = this.db.list('friend_list/' +index).valueChanges();
        let list = this.db.list('friend_list/' +index).snapshotChanges();
        console.log(list);
        return list;
      }
    ));
    // if(this.index == null || this.index == undefined){
    //   this.getWebFriendListIndex().then( res => {
    //     let list: AngularFireList<FriendModel[]>;
    //     list = this.db.list('friend_list/' +this.index);
    //     console.log(list);
    //     return list; 
    //   });
    // }else{
    //   let list: AngularFireList<FriendModel[]>;
    //   list = this.db.list('friend_list/' +this.index);
    //   console.log(list);
    //   return list;
    // }
  }
  // fireFriends2():any{
  //   let list;
  //   return this.getIndex().then(
  //     (index) =>{
  //       return this.db.list('friend_list/' +index);
  //     }
  //   );
  // }
  // getwebFriendProfile2(){
  //   this.getWebFriendListIndex().then( (val) => {
  //     // this.fireFriends().subscribe((list) =>{
  //     this.fireFriends2().then(
  //       (list) =>{
  //         list.snapshotChanges().subscribe((list) =>{
  //         console.log(list);
  //         let indexlist = [];
  //         for (let friend of list){
  //           indexlist.push(friend["key"]);
  //         }
  //         console.log(indexlist); 
  //         this.getFriendProfile(null).subscribe(
  //           (val) =>{
  //             console.log(val);
  //           });
  //       });
  //     });
  //   });
  // }
  getwebFriendProfile(){
    this.getWebFriendListIndex().then( (val) => {
      this.fireFriends().subscribe((list) =>{
        let data = {}
        data['index'] = [];
        for (let friend of list){
          data['index'].push(friend["key"]);
        }
        console.log(data);
        this.getFriendProfile(data).subscribe(
          (data) =>{
            console.log(data);
            this.storage.set(localstoragesettings.firendprof,data["info"]);
          });
        });
    });
  }
  getList(){
    return new Promise((resolve,reject) => {
      this.storage.get(localstoragesettings.firendprof).then(
        (val) =>{
          if(val== null || val== undefined){
            console.log("no prof");
            this.getwebFriendProfile();
            reject(null);
          }
          resolve(val);
        },
        (err)=>{
          this.getwebFriendProfile();
          reject(err);
      });
    });
  }
  getlocalFriendListIndex(): Promise<any> {
    return new Promise((resolve,reject) => {
      this.storage.get(localstoragesettings.index).then(
        (val) =>{
          if(val == null){

          }else{

          }
        }
      )}
    );
  }
  getWebFriendListIndex(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.auth.getauth().then( res => {
        let data = {"auth_token":res};
        this.getFriendList(data).subscribe(
          (val) =>{
            console.log("get http FriendList success",val);
            if(val["status"]== 200){
              if(val["index"]){
                this.storage.set("index",val["index"]);
                resolve(val["index"]);
              }else{
                console.log("backend bug FriendList",val);
                reject();
              }
            }else if(val["status"] == 201){
              console.log("not sccuess in get http FriendList, 200 logout", val);
              this.auth.logout();
              reject();
            }else{
              console.log("not sccuess in get http FriendList, but server on", val);
              reject();
            }
          },
          err => {
            console.log("a connection err in get http FriendList", err);
            reject();
          }
        );
      });
    });
  }
  getFriendList(data){
    return this.http.post(environment.apiUrl+apisettings.friendlist, data).pipe(map(res => res));
  }
  getFriendProfile(data){
    return from(this.auth.getauth()).pipe(mergeMap( 
      (authcode) => {
        data['auth_token'] = authcode;
        return this.http.post(environment.apiUrl+apisettings.friendprofile, data).pipe(map(res => res));
      }));
  }
  getIndex(): Promise<any>{
    return this.storage.get("index");
  }

}
