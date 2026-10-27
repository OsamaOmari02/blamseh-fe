import { Component, input, output } from '@angular/core';
import { Avatar } from '@shared/components/avatar/avatar';

@Component({
  selector: 'app-chat-header',
  imports: [Avatar],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeader {
  readonly name = input.required<string>();
  readonly back = output<void>();
}
