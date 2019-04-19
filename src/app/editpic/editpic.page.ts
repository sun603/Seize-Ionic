import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subscription } from 'rxjs';

import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { take } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
declare let window: any;

@Component({
  selector: 'app-editpic',
  templateUrl: './editpic.page.html',
  styleUrls: ['./editpic.page.scss'],
})
export class EditpicPage implements OnInit {

  constructor(public alertController: AlertController,
              public router: Router,
              public prof: ProfileService,
              public auth: AuthenticationService,
              private _location: Location,
              public camera: Camera,
              private imagePicker: ImagePicker,
              private crop: Crop,
              private transfer: FileTransfer,
              private plt:Platform
  ) { }
  profileImgUrl: any;
  newpic: any;
  subscriptions = new Subscription();
  fileUrl: any = null;
  respData: any;

  cropUpload() {
    this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.crop.crop(results[i], { quality: 100 })
            .then(
                newImage => {
                  
                  console.log('new image path is: ' , (typeof newImage), newImage);
                  this.readFile(newImage, this.updatepic);
                },
                error => {console.log(error); console.error('Error cropping image', error); }
            );
      }
    }, (err) => { console.log(err); });
  }
  cropUpload2() {
    this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
      if(results[0]){
        console.log("pic uri",results[0]);
        this.updatepic('data:image/jpeg;base64,'+results[0]);
      }
    }).then( ()=>{
      this._location.back();
    }).catch((err?)=>{
        this._location.back();
      }
    );
  }
  tmpfunc(pic){
    console.log('pic = ', pic);
    // this.newpic = pic;
    // console.log('newpic = ', this.newpic);
    this.updatepic(pic);
  }
  readFile( pathToFile , callback) {
    // console.log(pathToFile);
    pathToFile = pathToFile.substring(0, pathToFile.indexOf('?'));
    console.log(pathToFile);
    window.resolveLocalFileSystemURL( pathToFile , function (fileEntry) {
      fileEntry.file(function (file) {
        console.log('file: ', file);
        const reader: FileReader = new FileReader();
        reader.onloadend = (e) => {
          console.log(e);
          let tmp: string = reader.result as string;
          // tmp = tmp.replace(/.*\,/,"");
          console.log('tmp: ', tmp);
          // this.newpic = tmp;
          callback(tmp);
          // return event.target.result;
        };
        reader.readAsDataURL(file);
      });
    });
  }

  ngOnInit() {
    // this.prof.getLocalAvatar().then((data) =>{
    //   // console.log("tab3: avatar",data);
    //   this.profileImgUrl = "data:image/jpg;base64,"+data;
    // });
    this.subscriptions.add(this.prof.picSubject.pipe(take(1)).subscribe(
      (val) => {
        console.log('tab3 pic', val);
        this.profileImgUrl = val;
      }
    ));
    if(this.plt.is('ios') || this.plt.is('android')){
      this.cropUpload2();
    }
  }
  ngOnDestroy(){
    console.log("destroy editpic");
    this.subscriptions.unsubscribe();
  }
  changpic(event: { target: { files: any; }; }){
    console.log(event.target.files);
    let newpicfile = event.target.files[0];
    console.log("type of newpic: ", (typeof newpicfile), newpicfile);
    this.reading(newpicfile);
  }
  reading(input){
  let myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      let tmp:string = myReader.result as string;
      // this.newpic = tmp.replace(/.*\,/,"");
      this.newpic = tmp;
      console.log("base64 file" ,this.newpic);
    }
    myReader.readAsDataURL(input);
  }
  updatepic(pic?){
    let data = {};
    if(pic){
      data["pic"] = pic;
    }else if(this.newpic ==  null || this.newpic == undefined){
      console.log("no pic SOTP!");
      return;
    }else{
      data["pic"] =this.newpic;
    }
    this.prof.updatepic(data).then(res =>{
      console.log(res);
      if(res["status"] == 200){
        this._location.back();
      }else{
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
