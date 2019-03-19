import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { apisettings } from '../settings/apisettings';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(public http: HttpClient,public auth: AuthenticationService) { }

  post(data): Promise<any>{
    return new Promise((resolve,reject) => {
      this.httppost(data).subscribe(
        (val) =>{
          if(val["status"]== 200){
            resolve(val);
          }else if(val["status"]== 201){
            console.log("Logout at find for 201"+val+data);
            this.auth.logout();
            reject(val);
          }else{
            console.log("not sccuess in get http profile, but server on"+val["status"]);
            reject(val);
          }
        },
        err =>{
          console.log("a connection err in get http find"+err);
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
            resolve(val);
          }else if(val["status"]== 201){
            console.log("Logout at find for 201"+val);
            this.auth.logout();
            reject(val);
          }else{
            console.log("not sccuess in get http profile, but server on"+val["status"]);
            reject(val);
          }
        },
        err =>{
          console.log("a connection err in get http find"+err);
          reject(err);
        }
      );
    });
  }
  httpfind(data){
    return this.http.post(environment.apiUrl+apisettings.search, data).pipe(map(res => res));
  }
}
