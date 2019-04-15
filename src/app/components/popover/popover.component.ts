import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(private auth: AuthenticationService,private popoverController:PopoverController) { }

  ngOnInit() {
  }
  
  logOut(){
    this.auth.logout();
    this.popoverController.getTop().then((pop) =>{
      pop.dismiss();
    });
  }
}
