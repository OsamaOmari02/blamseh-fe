import { Component, input, output } from '@angular/core';
import { Avatar } from '@shared/components/avatar/avatar';
import { TimeAgoPipe } from '@shared/pipes/time-ago-pipe';
import { Conversation } from '../../../../shared/models/conversation-model';

export const CONVERSATION_TILE_HEIGHT = 72;

@Component({
  selector: 'app-conversation-tile',
  imports: [Avatar, TimeAgoPipe],
  templateUrl: './conversation-tile.html',
  styleUrl: './conversation-tile.scss',
  host: { '[style.height.px]': 'height' },
})
export class ConversationTile {
  conversation = input.required<Conversation>();
  selected = output<string>(); // emits the conversation id
  protected readonly height = CONVERSATION_TILE_HEIGHT;
  readonly active = input(false);
}
