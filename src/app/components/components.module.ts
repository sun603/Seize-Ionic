import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ],
  exports: [
    FeedComponent,
    MessageComponent,
    FriendlistComponent,
  ]
})
export class ComponentsModule { }
