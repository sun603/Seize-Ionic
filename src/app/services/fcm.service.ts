import { Injectable } from '@angular/core';

import { Firebase } from "@ionic-native/firebase/ngx";
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FcmService {
  items: Observable<any[]>;
  ex: any;
  constructor(db: AngularFirestore) { 
    this.items = db.collection('item').valueChanges();
    this.ex = db.collection('item').get();
  }
  
}
