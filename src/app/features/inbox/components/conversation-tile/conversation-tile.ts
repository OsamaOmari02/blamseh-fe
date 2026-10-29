import { Component, input, output } from '@angular/core';
import { Avatar } from '@shared/components/avatar/avatar';
import { TimeAgoPipe } from '@shared/pipes/time-ago-pipe';
import { Conversation } from '../../../../shared/models/conversation-model';

@Component({
  selector: 'app-conversation-tile',
  imports: [Avatar, TimeAgoPipe],
  templateUrl: './conversation-tile.html',
  styleUrl: './conversation-tile.scss',
})
export class ConversationTile {
  conversation = input.required<Conversation>();
  selected = output<string>(); // emits the conversation id
  readonly active = input(false);
}
