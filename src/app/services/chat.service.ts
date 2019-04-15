import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) {}

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
}
  
