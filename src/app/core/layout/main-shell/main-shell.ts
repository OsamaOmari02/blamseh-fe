import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from '../bottom-nav/bottom-nav';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-main-shell',
  imports: [RouterOutlet, TopBar, BottomNav],
  templateUrl: './main-shell.html',
  styleUrl: './main-shell.scss',
})
export class MainShell {}
