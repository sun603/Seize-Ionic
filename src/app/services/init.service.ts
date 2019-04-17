import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { FriendlistService } from './friendlist.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private profile:ProfileService, private friendlistService:FriendlistService) { }

  onlogin():Promise<any>{
    // this.profile.getwebProfile(data);
  return new Promise((resolve,reject) => {
    this.profile.updateView();
    this.friendlistService.onlogin();
    resolve(null);
    });
  }

  onstartup(){

  }
}
