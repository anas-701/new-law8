import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  refreshData:WritableSignal<boolean> = signal<boolean>(false);

  refreshData$=new BehaviorSubject(false)
 
  setRefreshData(value:boolean){
    this.refreshData.set(value)
  }

  getRefreshData(){
    return this.refreshData()
  }

  updateRefreshData(value:boolean){
    this.refreshData.update(() => value);
  }
}
