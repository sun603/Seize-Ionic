import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  constructor(public matchService: MatchService, private router:Router) { }

  ngOnInit() {
  }

  cencel(){
    this.matchService.cencel().then(data =>{
      console.log("cencel",data);
      if(data["status"] == 200){
        this.router.navigate(['/tabs']);
      }
    });
  }
}
