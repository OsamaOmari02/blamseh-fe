import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants/app-routes';
import { SearchBar } from '@shared/components/search-bar/search-bar';
import { AgentCard } from '../../components/agent-card/agent-card';
import { AgentStatus } from '../../enums/agent-status-enum';
import { AgentsService } from '../../services/agents-service';

@Component({
  selector: 'app-agents-page',
  imports: [SearchBar, AgentCard],
  templateUrl: './agents-page.html',
  styleUrl: './agents-page.scss',
})
export class AgentsPage implements OnInit {
  protected readonly agentsService = inject(AgentsService);
  protected readonly searchQuery = signal('');

  private readonly router = inject(Router);

  protected readonly visibleAgents = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    return this.agentsService
      .agents()
      .filter(
        (agent) =>
          !query ||
          agent.name.toLowerCase().includes(query) ||
          agent.role.toLowerCase().includes(query),
      );
  });

  protected readonly onlineCount = computed(
    () => this.agentsService.agents().filter((a) => a.status === AgentStatus.Online).length,
  );

  ngOnInit() {
    this.agentsService.load();
  }

  protected openAgent(id: string) {
    this.router.navigate(['/', APP_ROUTES.agents, id]);
  }
}
