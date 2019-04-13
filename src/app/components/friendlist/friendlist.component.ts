import { Component, OnInit } from '@angular/core';
import { FriendlistService } from 'src/app/services/friendlist.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  friendList:any;

  constructor(private firends: FriendlistService) { }

  ngOnInit() {
    this.friendList = this.firends.fireFriends().valueChanges().subscribe( (val) =>{
      console.log(val);
    });
  }


}
