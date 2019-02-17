import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private auth: AuthenticationService){}
  logOut(){
    this.auth.logout();
  }
}
