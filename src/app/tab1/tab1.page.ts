import { Component } from '@angular/core';
import { LibraryModel } from '../models/library.model'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  library:any;
  libs:any;
  constructor(){
    // library = new LibraryModel();
  }
  ngOnInit() {
    this.libs = LibraryModel.libs;
  }
  ngAfterContentInit(){
    console.log(libs);
  }
}
