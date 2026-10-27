import { Component, input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  title = input('Blamseh');
}
