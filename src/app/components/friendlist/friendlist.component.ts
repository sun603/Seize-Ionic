import { Component, OnInit } from '@angular/core';
import { FriendlistService } from 'src/app/services/friendlist.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  friendList:any;
  subscriptions = new Subscription();
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
    // this.friendList = this.firends.getList();
    this.firends.getList();
    this.subscriptions.add(this.firends.firendProfile.subscribe(
      (val) =>{
        console.log("firend view ",val);
        this.friendList = val;
      }
    ));
  }

  openchat(firend:any){
    console.log("open chat",firend,firend['index']);
    this.firends.firendtoroom(firend['index']).then((id) =>{
      this.router.navigate(['/chat',id]);
    });
    
  }


}
