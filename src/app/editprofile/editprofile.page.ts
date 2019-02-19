import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {


  private firstname:any;
  private lastname:any;
  private username:any;
  private gender:any;
  private email:any;
  private university:any;
  private uid:any;
  private major:any;
  private class:any;

  constructor() { }

  ngOnInit() {
  }

  update(){
    let data ={
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      gender: this.gender,
      email: this.email,
      university: this.university,
      uid: this.uid,
      major: this.major,
      class: this.class
    }
  }

}
