import { Component } from '@angular/core';
import { LibraryModel } from '../models/library.model'
import { AuthenticationService } from '../services/authentication.service';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  library:any;
  libs:any;
  location:string;
  seattype:string;
  sound:number;
  constructor(public auth: AuthenticationService, public matchService: MatchService,private router: Router){
    this.library = new LibraryModel();
  }
  ngOnInit() { 
    this.libs = this.library.getlibs();
  }

  find(){
    this.auth.getauth().then(res => {
      let data = {
        "auth_token": res,
        "library": location,
        "seat_type": this.seattype,
        "noise_level": this.sound,
      };
      this.matchService.find(data).then(data =>{
        this.router.navigate(['/waiting']);
      });
      
    })

  }
}
