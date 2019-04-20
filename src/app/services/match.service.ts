import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { apisettings } from '../settings/api.settings';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FriendlistService } from './friendlist.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  waitflag:boolean;
  timerId:any;
  constructor(public http: HttpClient,public auth: AuthenticationService, public router: Router, private friendlist:FriendlistService, private alertController:AlertController) { 
    this.waitflag = false;
  }

  post(data): Promise<any>{
    return new Promise((resolve,reject) => {
      this.httppost(data).subscribe(
        (val) =>{
          if(val["status"]== 200){
            this.waitflag = true;
            let re = this.wait();
            console.log(re);
            resolve(val);
          }else if(val["status"]== 201){
            console.log("Logout at find for 201"+val+data);
            this.auth.logout();
            reject(val);
          }else{
            console.log("not sccuess in post seat, but server on"+val["status"]);
            reject(val);
          }
        },
        err =>{
          console.log("a connection err in post seat"+err);
          reject(err);
        }
      );
    });
  }
  httppost(data){
    return this.http.post(environment.apiUrl+apisettings.post, data).pipe(map(res => res));
  }

  find(data): Promise<any>{
    return new Promise((resolve,reject) => {
      this.httpfind(data).subscribe(
        (val) =>{
          if(val["status"]== 200){
            //mactch TODO
            console.log(val);
            this.matched(val['uid']);
            resolve(val);
          }else if(val["status"]== 201){
            console.log("Logout at find for 201",val);
            this.auth.logout();
            reject(val);
          }else{
            console.log("not sccuess in find seat, but server on",val,val["status"]);
            reject(val);
          }
        },
        err =>{
          console.log("a connection err in find seat",err);
          reject(err);
        }
      );
    });
  }
  httpfind(data){
    return this.http.post(environment.apiUrl+apisettings.search, data).pipe(map(res => res));
  }

  cencel(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.auth.getauth().then(res => {
        let data = {
          "auth_token": res,
        };
        this.httpcencel(data).subscribe(
          (val) =>{
            if(val["status"]== 200){
              if(this.waitflag == true){
                this.waitflag = false;
                clearInterval(this.timerId);
                console.log("cancel",this.waitflag);
              }else{
                console.log("cancel err",this.waitflag);
              }
              resolve(val);
            }else if(val["status"]== 201){
              console.log("Logout at find for 201",val,data);
              this.auth.logout();
              reject(val);
            }else{
              console.log("not sccuess in post seat, but server on",val["status"]);
              reject(val);
            }
          },
          err =>{
            console.log("a connection err in post seat",err);
            reject(err);
          }
        );
      }).catch(err =>{
        reject(err);
      });
    });

  }
  httpcencel(data){
    return this.http.post(environment.apiUrl+apisettings.cencel, data).pipe(map(res => res));
  }
  // towait(): boolean{
  //   if(this.waitflag == true){
  //     return false;
  //   }else{
  //     this.waitflag = true;
  //     this.wait();
  //     return true;
  //   }
  // }
  wait(){
    let oneSecond = 1000 * 1; // one second = 1000 x 1 ms
    if(this.waitflag == true){
      this.timerId = setInterval( () =>{
        // console.log("interval", this.timerId,this.auth);
        this.auth.getauth().then(res => {
          let data = {
            "auth_token": res,
          };
          this.httpcheck(data).subscribe(res =>{
            if(res["status"] && res["status"] == 200){
              console.log("match",res);
              // this.presentAlert("match with "+res["name"]);
              this.router.navigate(['/tabs']);
              clearInterval(this.timerId);
              // TODO match 
              this.matched(res['uid']);
            }else if(res["status"] && res["status"] == 201){
              console.log("check 201",res);
              clearInterval(this.timerId);
              this.auth.logout();
            }else if(res["status"] == 202){
              console.log("cont to wait",res);
            }
          }, err =>{
            console.log(err);
          }); 
        }).catch( err =>{
          console.log(err);
        });
      }, oneSecond*2);
    }else{
      if(this.timerId){
        clearInterval(this.timerId);
      }
    }
  }
  // check() {
  //   console.log("interval", this.timerId,this.auth);
  //   this.auth.getauth().then(res => {
  //     let data = {
  //       "auth_token": res,
  //     };
  //     this.httpcheck(data).subscribe(res =>{
  //       if(res["status"] && res["status"] == 200){
  //         console.log("match",res);
  //       }else if(res["status"] && res["status"] == 201){
  //         console.log("check 201",res);
  //         this.auth.logout();
  //       }else if(res["status"] == 202){
  //         console.log("cont to wait",res);
  //       }
  //     }, err =>{
  //       console.log(err);
  //     }); 
  //   }).catch( err =>{
  //     console.log(err);
  //   });
  // }
  httpcheck(data){
    return this.http.post(environment.apiUrl+apisettings.check, data).pipe(map(res => res));
  }
  matched(id){
    this.friendlist.isinlist(id).then( (val) =>{
      console.log("matched",val);
      if(val){
        this.friendlist.firendtoroom(id).then((rid) =>{
          this.router.navigate(['/chat',rid]);
        });
      }else{
        this.friendlist.onMactch().then(()=>{
          this.friendlist.firendtoroom(id).then((rid) =>{
            this.router.navigate(['/chat',rid]);
          });
        })
      }
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      // header: 'Alert',
      subHeader: 'Find',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
