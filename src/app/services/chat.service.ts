import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase,private camera: Camera, private storage: Storage) {}

  getMessages(roomid:number): AngularFireList<MessageModel> {
    // query to create our message feed binding
    return this.db.list('room-message/'+roomid as string, ref =>
        ref.orderByKey().limitToLast(25)
    );
    
  }
  // .valueChanges()
  sendMessage(msg: string,myid: number,roomid: number) {
    const timestamp = this.getTimeStamp();
    let chatMessages = this.getMessages(roomid);
    chatMessages.push({
      message: msg,
      timestamp: this.getTimeStamp(),
      id: myid,
      type:"message"
    });
    return true;
  }
  sendPicture(picdata:string,myid: number,roomid: number){
    const timestamp = this.getTimeStamp();
    let chatMessages = this.getMessages(roomid);
    chatMessages.push({
      pic:picdata,
      timestamp: this.getTimeStamp(),
      id: myid,
      type: "pic"
    });
    return true;
  }
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
  takePicture(myid: number,roomid: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
        let data = 'data:image/jpeg;base64,' + imageData;

      // Save all photos for later viewing
      this.sendPicture(data,myid,roomid);
    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });

  }
}
  
