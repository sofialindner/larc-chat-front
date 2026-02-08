import { Component, input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-user-media',
  imports: [MatIconModule],
  templateUrl: './user-media.html',
  styleUrl: './user-media.scss',
})
export class UserMedia {
  readonly offline = input<boolean | undefined>(undefined);
}
