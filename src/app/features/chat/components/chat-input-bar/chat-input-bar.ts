import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-input-bar',
  templateUrl: './chat-input-bar.html',
  styleUrl: './chat-input-bar.scss',
})
export class ChatInputBar {
  readonly sent = output<string>();

  protected readonly draft = signal('');

  protected updateDraft(event: Event) {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected submit() {
    const text = this.draft().trim();
    if (!text) return;
    this.sent.emit(text);
    this.draft.set('');
  }
}
