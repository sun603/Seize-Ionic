import { Component, OnInit } from '@angular/core';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(public fcm:FcmService) { }

  ngOnInit() {
    console.log(this.fcm.items);
    console.log(this.fcm.ex);
  }

}
