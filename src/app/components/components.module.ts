import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FeedComponent } from '../feed/feed.component';
import { MessageComponent } from './message/message.component';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    FeedComponent,
    MessageComponent,
    FriendlistComponent,
    PopoverComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FeedComponent,
    MessageComponent,
    FriendlistComponent,
  ],
  entryComponents: [
    PopoverComponent
  ],
})
export class ComponentsModule { }
