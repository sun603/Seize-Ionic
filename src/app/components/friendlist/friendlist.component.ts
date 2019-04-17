import { Component, OnInit } from '@angular/core';
import { FriendlistService } from 'src/app/services/friendlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  friendList:any;

  constructor(private firends: FriendlistService, private router:Router) { }

  ngOnInit() {
    // this.friendList = this.firends.fireFriends().subscribe( (val) =>{
    //   console.log(val);
    //   this.friendList = val;
    // });
    // this.firends.getList().then(
    //   (firendlist) =>{
    //     console.log(firendlist);
    //     this.friendList = firendlist;
    //   }
    // ).catch( 
    //   (err) =>{
    //     this.firends.getList().then(
    //       (firendlist) =>{
    //         console.log(firendlist);
    //       },
    //       (err) =>{
    //         console.log(err);
    //       }
    //     )},
    // );
    this.friendList = this.firends.getList();
  }

  openchat(firend:any){
    console.log(firend);
    this.router.navigate(['/chat',2]);
  }


}
