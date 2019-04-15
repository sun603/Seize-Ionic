import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { FriendlistComponent } from './friendlist/friendlist.component';

@NgModule({
  declarations: [
    FeedComponent,
    MessageComponent,
    FriendlistComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeedComponent,
    MessageComponent,
    FriendlistComponent,
  ]
})
export class ComponentsModule { }
