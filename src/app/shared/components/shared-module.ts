import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotification } from './push-notification/push-notification';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PushNotification
  ],
  exports: [
    PushNotification
  ]
})
export class SharedModule { }
