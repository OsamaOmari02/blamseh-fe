import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { ConversationTile } from '../../components/conversation-tile/conversation-tile';
import { Inbox } from '../../services/inbox';

@Component({
  selector: 'app-inbox-page',
  imports: [ConversationTile],
  templateUrl: './inbox.html',
  styleUrl: './inbox.scss',
})
export class InboxPage implements OnInit {
  private router = inject(Router);
  service = inject(Inbox);

  ngOnInit() {
    this.service.load();
  }

  openChat(id: string) {
    this.router.navigate([APP_ROUTES.chat, id]);
  }
}
