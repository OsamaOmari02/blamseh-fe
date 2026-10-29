import { AgentStatus } from '../enums/agent-status-enum';

export const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
  [AgentStatus.Online]: 'Online',
  [AgentStatus.Away]: 'Away',
  [AgentStatus.Offline]: 'Offline',
};
