import { AgentStatus } from '../enums/agent-status-enum';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  openConversations: number;
  businessId: string;
}
