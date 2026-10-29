import { Component, OnInit, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { AGENT_STATUS_LABELS } from '@features/agents/constants/agent-status-label';
import { Avatar } from '@shared/components/avatar/avatar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { AgentsService } from '../../services/agents-service';

@Component({
  selector: 'app-agent-details-page',
  imports: [PageHeader, Avatar],
  templateUrl: './agent-details-page.html',
  styleUrl: './agent-details-page.scss',
})
export class AgentDetailsPage implements OnInit {
  private readonly router = inject(Router);
  protected readonly agentsService = inject(AgentsService);

  readonly id = input.required<string>(); // from the :id in the URL

  protected readonly agent = computed(() =>
    this.agentsService.agents().find((agent) => agent.id === this.id()),
  );

  protected readonly statusLabel = computed(() => {
    const agent = this.agent();
    return agent ? AGENT_STATUS_LABELS[agent.status] : '';
  });

  ngOnInit() {
    this.agentsService.load(); // needed when the URL is opened directly
  }

  protected goBack() {
    this.router.navigate(['/', APP_ROUTES.agents]);
  }
}
