import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindlocPageRoutingModule } from './findloc-routing.module';

import { FindlocPage } from './findloc.page';
// import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindlocPageRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw', 
    //   libraries: ['places']
    // })
  ],
  declarations: [FindlocPage]
})
export class FindlocPageModule {}
