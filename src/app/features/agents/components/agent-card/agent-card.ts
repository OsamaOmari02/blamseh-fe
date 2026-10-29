import { Component, computed, input, output } from '@angular/core';
import { AGENT_STATUS_LABELS } from '@features/agents/constants/agent-status-label';
import { Avatar } from '@shared/components/avatar/avatar';
import { Agent } from '../../models/agent-model';

@Component({
  selector: 'app-agent-card',
  imports: [Avatar],
  templateUrl: './agent-card.html',
  styleUrl: './agent-card.scss',
})
export class AgentCard {
  readonly agent = input.required<Agent>();
  readonly selected = output<string>();

  protected readonly statusLabel = computed(() => AGENT_STATUS_LABELS[this.agent().status]);
}
