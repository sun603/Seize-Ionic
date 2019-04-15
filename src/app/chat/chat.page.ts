import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  roomid:number;
  private sub: any;
  messsub:any;
  messages:any;
  inputmessage:string;
  constructor(private route:ActivatedRoute,private chatService:ChatService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.roomid = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getMessages();
   });
    
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log("chat ",this.roomid," destroy");
  }
  getMessages(){
    this.messsub = this.chatService.getMessages(this.roomid).valueChanges();
    console.log(this.messsub);
  }

  sendMessage(){
    if( this.inputmessage != "" || this.inputmessage != undefined){
      if(this.chatService.sendMessage(this.inputmessage,59,this.roomid)){
        this.inputmessage = '';
      }
    }
  }
}
