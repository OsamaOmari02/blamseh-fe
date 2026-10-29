import { computed, inject, Service, signal } from '@angular/core';
import { CurrentBusinessService } from '@core/services/current-business-service';
import { AgentStatus } from '../enums/agent-status-enum';
import { Agent } from '../models/agent-model';

const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Rana Saleh',
    role: 'Sales',
    status: AgentStatus.Online,
    openConversations: 6,
    businessId: 'b1',
  },
  {
    id: '2',
    name: 'Khaled Obeidat',
    role: 'Support',
    status: AgentStatus.Online,
    openConversations: 4,
    businessId: 'b1',
  },
  {
    id: '3',
    name: 'Dana Qasem',
    role: 'Support',
    status: AgentStatus.Away,
    openConversations: 2,
    businessId: 'b1',
  },
  {
    id: '4',
    name: 'Fadi Barakat',
    role: 'Sales',
    status: AgentStatus.Offline,
    openConversations: 0,
    businessId: 'b2',
  },
  {
    id: '5',
    name: 'Noor Hijazi',
    role: 'Account manager',
    status: AgentStatus.Online,
    openConversations: 3,
    businessId: 'b2',
  },
];

@Service()
export class AgentsService {
  private readonly agentsState = signal<Agent[]>([]);
  private readonly loadingState = signal(false);
  private loaded = false;

  private readonly currentBusinessService = inject(CurrentBusinessService);

  readonly agents = computed(() =>
    this.agentsState().filter((a) => a.businessId === this.currentBusinessService.selectedId()),
  );
  readonly loading = this.loadingState.asReadonly();

  load() {
    if (this.loaded || this.loadingState()) return;

    this.loadingState.set(true);
    setTimeout(() => {
      this.agentsState.set(MOCK_AGENTS);
      this.loaded = true;
      this.loadingState.set(false);
    }, 600);
  }
}
