export interface IncidentInterface {
  id?: string;
  name: string;
  assignee: string;
  area: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  priority: string;
  icon: string;
  status: string;
}
