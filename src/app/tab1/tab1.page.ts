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
    this.library = new LibraryModel();
  }
  ngOnInit() {
    this.libs = this.library.getlibs();
  }
  ngAfterContentInit(){
  }
}
