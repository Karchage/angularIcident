import { Pipe, PipeTransform } from '@angular/core';
import {IncidentInterface} from '../interfaces/incident.interface';

@Pipe({
  name: 'searchIncident'
})
export class SearchIncidentPipe implements PipeTransform {

  transform(incidents: IncidentInterface[], search: string = ''): any {
    if (!search.trim()) {
      return incidents;
    }
    return incidents.filter( incident => {
      return incident.name.toLowerCase().includes(search.toLowerCase());
    });
  }

}
