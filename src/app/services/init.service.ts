import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { FriendlistService } from './friendlist.service';
import { AuthenticationService } from './authentication.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private profile:ProfileService, private friendlistService:FriendlistService, private auth:AuthenticationService,private plt: Platform) {
    this.plt.ready().then(() => {
      this.auth.checkToken().then(()=>{
        this.onstartup();
      }).catch((err)=>{
        console.log("err on start up",err);
      });
    });
   }

  onlogin():Promise<any>{
    // this.profile.getwebProfile(data);
  return new Promise((resolve,reject) => {
    this.profile.updateView();
    this.friendlistService.onlogin();
    resolve(null);
    });
  }
 
  onstartup(){
      if(this.auth.isAuthenticated()){
        console.log("authed, update friend, updateview");
        this.friendlistService.onlogin();
        this.profile.updateView();
      }else{
        console.log("init not start for no login");
      }
  }
}
