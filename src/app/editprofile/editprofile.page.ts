import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {


  private name:any;
  // private username:any;
  private gender:any;
  private email:any;
  private university:any;
  // private uid:any;
  private major:any;
  private class:any;

  constructor() { }

  ngOnInit() {
  }

  update(){
    let data ={
      name: this.name,
      gender: this.gender,
      email: this.email,
      university: this.university,
      // uid: this.uid,
      major: this.major,
      class: this.class
    }
  }

}
