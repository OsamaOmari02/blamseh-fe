import { Component, ElementRef, effect, inject, input, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { ChatHeader } from '../../components/chat-header/chat-header';
import { ChatInputBar } from '../../components/chat-input-bar/chat-input-bar';
import { MessageBubble } from '../../components/message-bubble/message-bubble';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-page',
  imports: [ChatHeader, MessageBubble, ChatInputBar],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {
  private readonly router = inject(Router);
  protected readonly service = inject(ChatService);

  readonly id = input.required<string>(); // comes from the :id in the URL
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  constructor() {
    effect(() => this.service.open(this.id()));

    effect(() => {
      this.service.thread(); // re-run whenever messages change
      setTimeout(() => this.scrollToBottom()); // wait for the new bubble to render
    });
  }

  protected goBack() {
    this.router.navigate(['/', APP_ROUTES.inbox]);
  }

  protected sendMessage(text: string) {
    this.service.send(text);
  }

  private scrollToBottom() {
    const element = this.scroller()?.nativeElement;
    element?.scrollTo({ top: element.scrollHeight });
  }
}
