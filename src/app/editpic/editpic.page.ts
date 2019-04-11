import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-editpic',
  templateUrl: './editpic.page.html',
  styleUrls: ['./editpic.page.scss'],
})
export class EditpicPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router,public prof: ProfileService, public auth:AuthenticationService, private _location: Location, public camera: Camera) { }
  profileImgUrl:any;
  newpic:any;
  subscriptions = new Subscription();
  
  ngOnInit() {
    // this.prof.getLocalAvatar().then((data) =>{
    //   // console.log("tab3: avatar",data);
    //   this.profileImgUrl = "data:image/jpg;base64,"+data;
    // });
    this.subscriptions.add(this.prof.picSubject.subscribe(
      (val) => {
        console.log("tab3 pic",val);
        this.profileImgUrl = val;
      }
    ));
  }
  ngOnDestroy(){
    console.log("destroy editpic");
    this.subscriptions.unsubscribe();
  }
  changpic(event: { target: { files: any; }; }){
    console.log(event.target.files);
    let newpicfile = event.target.files[0];
    this.reading(newpicfile);
  }
  reading(input){
  let myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      let tmp:string = myReader.result as string;
      this.newpic = tmp.replace(/.*\,/,"");
      console.log("base64 file" ,this.newpic);
    }
    myReader.readAsDataURL(input);
  }
  updatepic(){
    if(this.newpic ==  null || this.newpic == undefined){
      console.log("no pic SOTP!");
      return;
    }
    let data = {
      "pic":this.newpic,
    };
    this.prof.updatepic(data).then(res =>{
      console.log(res);
      if(res["status"] == 200){
        this._location.back();
      }
    }).catch(err =>{
      console.log(err);
    });
  }

  // upload()
  // {
  //    let options = {
  //        quality: 100
  //         };

  //   this.camera.getPicture(options).then((imageData) => {
  //     console.log(imageData);
  //   });
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:

  //  const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options1: FileUploadOptions = {
  //      fileKey: 'file',
  //      fileName: 'name.jpg',
  //      headers: {}
    
  //   }

  //   fileTransfer.upload(imageData, 'https://localhost/ionic/upload.php', options1)
  //   .then((data) => {
  //     // success
  //     alert("success");
  //   }, (err) => {
  //     // error
  //     alert("error"+JSON.stringify(err));
  //   });


  //     });
// }
}
