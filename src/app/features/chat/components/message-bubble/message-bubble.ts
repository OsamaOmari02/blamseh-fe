import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MessageStatus } from '../../enums/message-status-enum';
import { Message } from '../../models/message-model';

@Component({
  selector: 'app-message-bubble',
  imports: [DatePipe],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.scss',
})
export class MessageBubble {
  readonly message = input.required<Message>();

  protected readonly ticks = computed(() =>
    this.message().status === MessageStatus.Sent ? '✓' : '✓✓',
  );
  protected readonly isRead = computed(() => this.message().status === MessageStatus.Read);
}
