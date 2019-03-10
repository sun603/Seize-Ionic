import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ChooseseatComponent } from './chooseseat.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ChooseseatComponent],
  declarations:[ChooseseatComponent]
})
export class chooseseatComponentModule {}