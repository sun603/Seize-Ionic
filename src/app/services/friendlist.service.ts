import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { apisettings } from '../settings/api.settings';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
import { FriendModel } from '../models/friend.model';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FriendlistService {
  index:number;
  constructor(public http: HttpClient, public storage: Storage, public auth: AuthenticationService, private db: AngularFireDatabase) {
    this.getWebFriendListIndex();
   }

  fireFriends(): AngularFireList<FriendModel[]>  {
    //https://stackoverflow.com/questions/41585514/how-to-return-observable-after-some-promise-get-resolved-in-ionic-2-angular-2
    console.log("index is " ,this.index);
    if(this.index == null || this.index == undefined){
      this.getWebFriendListIndex().then( res => {
        let list: AngularFireList<FriendModel[]>;
        list = this.db.list('friend_list/' +this.index);
        console.log(list);
        return list; 
      });
    }else{
      let list: AngularFireList<FriendModel[]>;
      list = this.db.list('friend_list/' +this.index);
      console.log(list);
      return list;
    }
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
                this.index = val["index"];
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
}
