import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ChooselibraryComponent } from './chooselibrary.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ChooselibraryComponent],
  declarations:[ChooselibraryComponent]
})
export class chooselibraryComponentModule {}