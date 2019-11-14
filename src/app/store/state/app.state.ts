import {IncidentState} from '../reducers/incident.reducer';
import {ProcessState} from '../reducers/process.reducer';
import {UserState} from '../reducers/user.reducer';

export interface AppState {
  users: UserState;
  incidents: IncidentState;
  processes: ProcessState;
}
