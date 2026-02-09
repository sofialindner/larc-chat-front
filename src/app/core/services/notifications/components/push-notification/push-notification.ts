import { Component, contentChild, ElementRef, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-push-notification',
  imports: [MatIcon],
  templateUrl: './push-notification.html',
  styleUrl: './push-notification.scss',
})
export class PushNotification {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly icon = input<string | null>(null);
  readonly appName = input<string | null>(null);
}
